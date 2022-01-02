import UserModel, { User, UserRequest } from '@entities/user';
import { wrongId } from '@utils/constants';

class UserService {
    public getAllUsers(): Promise<User[]> {
        return UserModel.find({}).exec();
    }

    public getUserById(userId: string): Promise<User> {
        return UserModel.findOne({ _id: userId })
            .then(user => {
                if (user === null) {
                    throw new Error(wrongId);
                }
                return user;
            });
    }

    public updateById(userId: string, user: UserRequest): Promise<User> {
        return UserModel.findOneAndUpdate({ _id: userId }, user, { new: true })
            .then(updatedUser => {
                if (!updatedUser) {
                    throw new Error(wrongId);
                }
                return updatedUser;
            })
            .catch(error => {
                if (error.codeName) {
                    throw new Error(error.codeName);
                }
                throw new Error(error.message);
            });
    }

    public deleteById(userId: string) {
        return UserModel.deleteOne({ _id: userId }).exec();
    }
}

export default UserService;
