import { Connection } from 'mongoose';
import mongoose from 'mongoose';
import * as crypto from 'crypto';

export interface UserRepository {
    findOne(username: string): Promise<I_UserDocument | null>;
    create(username: string, password: string): void;
    loginStampByUsername(username: string): void;
}

export interface I_UserDocument extends mongoose.Document {
    username: string;
    password: string;
    salt: string;
    registerDate: Date;
    lastLogin: Date;
    isAdmin: boolean;
}

export class userRepository implements UserRepository {
    private UserModel: mongoose.Model<I_UserDocument>;
    private client: Connection
    constructor(client: Connection) {
        this.client = client;
        const UserSchema: mongoose.Schema<I_UserDocument> = new mongoose.Schema({
            username: { type: String, index: true, unique: true },
            password: { type: String },
            salt: { type: String },
            registerDate: { type: Date, default: Date.now },
            lastLogin: { type: Date, default: Date.now },
            isAdmin: { type: Boolean, default: false }
        });
        UserSchema.pre('save', async function (next) {
            const user = this;
            if (user.isModified('password')) {
                let salt = crypto.randomBytes(16).toString('hex')
                let hashPassword = crypto.pbkdf2Sync(user.password, salt,
                    1000, 64, `sha512`).toString(`hex`);
                user.password = hashPassword;
                user.salt = salt;
            }
            next();
        });

        this.UserModel = this.client.model<I_UserDocument>('User', UserSchema);
    }

    async findOne(username: string): Promise<I_UserDocument | null> {
        return this.UserModel.findOne({ username: username });
    }

    create(username: string, password: string): void {
        this.UserModel.create(username, password);
    }

    loginStampByUsername(username: string): void {
        this.UserModel.updateOne({ username: username }, { $set: { lastLogin: new Date() } });
    }

}