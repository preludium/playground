import {
    loginUserSchema,
    registerUserSchema,
    responseMessage as loginErrorMessage
} from '@entities/user';
import AuthService from '@service/auth/auth.service';
import TokenService from '@service/token/token.service';
import HttpException from '@utils/exceptions/http.exception';
import Logger from '@utils/logger';
import { validateRequestMiddleware } from '@utils/middlewares';
import { ApiResponse, Controller, Request, Response } from '@utils/types/controller';
import { TokenBundle } from '@utils/types/token';
import dayjs from 'dayjs';
import { NextFunction, Router } from 'express';
import StatusCodes from 'http-status-codes';
import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import config from '@config';

import { LoginUserRequest, OauthUserRequestBody, RegisterUserRequest } from './types';
import UserService from '@service/user';

class AuthController implements Controller {
    public readonly path = '/auth';
    public readonly router = Router();
    private logger = Logger.create(AuthController.name);
    private authService = new AuthService();
    private tokenService = new TokenService();
    private userService = new UserService();

    constructor() {
        this.initializeRoutes();
    }

    private async initializeRoutes() {
        this.router.post(
            `${this.path}/login`,
            validateRequestMiddleware(loginUserSchema),
            this.login.bind(this)
        );

        this.router.post(
            `${this.path}/register`,
            validateRequestMiddleware(registerUserSchema),
            this.register.bind(this)
        );

        this.router.delete(
            `${this.path}/logout`,
            this.logout.bind(this)
        );

        this.router.get(
            `${this.path}/refresh-token`,
            this.refreshToken.bind(this)
        );

        this.router.get(
            `${this.path}/google`,
            passport.authenticate('google', { session: false, scope: ['profile', 'email'] }),
        );

        this.router.get(
            `${this.path}/google/redirect`,
            passport.authenticate('google', { session: false, failureRedirect: '/login' }),
            (req, res) => {
                res.redirect('/');
            }
        );

        passport.use(new Strategy({
            clientID: config.oauth.google.CLIENT_ID,
            clientSecret: config.oauth.google.CLIENT_SECRET,
            callbackURL: config.oauth.google.REDIRECT_URL,
        }, async (accessToken, refreshToken, params, profile, done) => {
            const requester: OauthUserRequestBody = {
                providerUserId: profile.id,
                provider: profile.provider,
                email: profile.emails[0].value,
            };
            const user = await this.userService.loginOauthUser(requester);
            debugger;
            done(null, profile);
        }));

        passport.serializeUser((user, done) => {
            done(null, user);
        });

        passport.deserializeUser((user: any, done) => {
            done(null, user);
        });
    }

    public authenticate(req: Request, res: Response, next: NextFunction) {
        this.logger.info('Trying to authenticate user with access-token');

        const token = req.cookies.access_token;
        if (!token) {
            this.logger.error('<== Failure: access-token does not exist');
            return res.status(StatusCodes.UNAUTHORIZED).end();
        }

        return new AuthService().handleAuthenticate(token)
            .then(requester => {
                res.locals.user = requester;
                this.logger.info(`User ${requester.email} successfully authenticated`);
                next();
            })
            .catch((error) => {
                this.logger.error(`Failure: ${error.message}`);
                res.status(StatusCodes.FORBIDDEN).end();
            });
    }

    private login(req: LoginUserRequest, res: Response, next: NextFunction) {
        this.logger.info(`==> User ${req.body.email} is trying to log in`);
        this.authService.processLogin(req.body)
            .then(tokens => {
                this.logger.info(`<== Success: user ${req.body.email} logged in`);
                return this.assignCookies(res, tokens);
            })
            .catch((error) => {
                this.logger.error(error.message);
                next(new HttpException(StatusCodes.BAD_REQUEST, loginErrorMessage));
            });
    }

    private register(req: RegisterUserRequest, res: Response, next: NextFunction) {
        const user = req.body;
        this.logger.info(`==> Creating user with email: ${user.email}`);

        this.authService.processRegister(user)
            .then(newUser => {
                this.logger.info(`<== Success: user ${newUser.email} users`);
                res.status(StatusCodes.CREATED).json(newUser);
            })
            .catch(error => {
                next(new HttpException(StatusCodes.BAD_REQUEST, error.message));
            });
    }

    private async logout(req: Request, res: ApiResponse) {
        const user = await this.authenticateUserForLogout(req);

        if (user) {
            this.logger.info(`==> Trying to log out user ${user.email}`);
            await this.tokenService.deleteRefreshTokenByUser(user);
        } else {
            this.logger.info('==> Trying to log out anonymous user');
        }

        res.clearCookie('access_token')
            .clearCookie('refresh_token')
            .status(StatusCodes.OK)
            .send();

        this.logger.info('<== Success: User logged out');
    }

    private authenticateUserForLogout(req: Request) {
        const token = req.cookies.access_token;
        if (!token) {
            this.logger.error('User does not possess access-token cookie');
            return null;
        }

        return this.authService.handleAuthenticate(token)
            .then(requester => {
                this.logger.info(`User ${requester.email} successfully authenticated`);
                return requester;
            });
    }

    private async refreshToken(req: Request, res: Response) {
        this.logger.info('Trying to refresh tokens');
        const requestRefreshToken = req.cookies.refresh_token;

        if (!requestRefreshToken) {
            this.logger.error('Token is empty');
            return res.status(StatusCodes.FORBIDDEN).end();
        }

        if (!await this.tokenService.doesTokenExist(requestRefreshToken)) {
            this.logger.error('Token does not exist');
            return res.status(StatusCodes.FORBIDDEN).end();
        }

        return this.tokenService.processRefreshToken(requestRefreshToken)
            .then(tokens => {
                return this.assignCookies(res, tokens);
            })
            .catch(error => {
                this.logger.error(error.message);
                return res.status(StatusCodes.FORBIDDEN).end();
            });
    }

    private assignCookies(res: Response, { refreshToken, accessToken }: TokenBundle) {
        return res
            .cookie('access_token', accessToken, {
                httpOnly: true,
                expires: dayjs()
                    .add(15, 'm')
                    .toDate()
            })
            .cookie('refresh_token', refreshToken, {
                httpOnly: true,
                expires: dayjs()
                    .add(7, 'd')
                    .toDate()
            })
            .end();
    }
}

export default AuthController;
