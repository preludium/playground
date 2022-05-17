import fs from 'fs';
import { web as googleOauth } from '../../google-oauth.json';
import 'dotenv/config';

import { Config } from './types';
const accessPrivateKey = fs.readFileSync('access.key', 'utf8').trim();
const accessPublicKey = fs.readFileSync('access.key.pub', 'utf8').trim();

const refreshPrivateKey = fs.readFileSync('refresh.key', 'utf8').trim();
const refreshPublicKey = fs.readFileSync('refresh.key.pub', 'utf8').trim();

const config: Config = {
    PORT: 5000,
    DB_URI: 'mongodb://mongo:mongo@localhost:27017/todo?authSource=admin',
    SALT_PASSWORD_ROUNDS: 10,
    ACCESS_TOKEN_VALIDITY: '15m',
    REFRESH_TOKEN_VALIDITY: '7d',
    ACCESS_TOKEN_PUBLIC_KEY: accessPublicKey,
    ACCESS_TOKEN_PRIVATE_KEY: accessPrivateKey,
    REFRESH_TOKEN_PUBLIC_KEY: refreshPublicKey,
    REFRESH_TOKEN_PRIVATE_KEY: refreshPrivateKey,
    oauth: {
        google: {
            CLIENT_ID: googleOauth.client_id,
            CLIENT_SECRET: googleOauth.client_secret,
            REDIRECT_URL: googleOauth.redirect_uris[0],
        }
    }
};

export default config;
