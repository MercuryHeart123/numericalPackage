import { Config } from '../main';
import { userRepository, I_UserDocument } from "../repositories/user"
import * as crypto from 'crypto';
import jwt from 'jsonwebtoken';

export class authUseCase {
    private userRepository: userRepository;
    private cfg: Config;

    constructor(userRepo: userRepository, cfg: Config) {
        this.userRepository = userRepo;
        this.cfg = cfg;
    }
    public findOne(username: string): Promise<I_UserDocument | null> {
        return this.userRepository.findOne(username);
    }

    public async login(username: string, password: string) {
        try {
            const foundUser = await this.userRepository.findOne(username);
            if (!foundUser) {
                throw new Error(`User not found (${username})`)
            }
            let testPassword = crypto.pbkdf2Sync(password, foundUser.salt,
                1000, 64, `sha512`).toString(`hex`)

            if (testPassword === foundUser.password) {
                const token = jwt.sign({ username: foundUser.username, isAdmin: foundUser.isAdmin }, this.cfg.SECRET_KEY, {
                    expiresIn: '1 hours',
                });
                this.userRepository.loginStampByUsername(username);

                return { username: foundUser.username, isAdmin: foundUser.isAdmin, token: token };
            } else {
                throw new Error(`Password is not correct ${username}`);
            }

        } catch (error) {
            throw error;
        }
    }
    public async verifyToken(token: string) {
        try {
            if (!token) {
                throw new Error('Please authenticate');
            }
            const decoded = jwt.verify(token, this.cfg.SECRET_KEY);

            return decoded;
        } catch (error) {
            throw error;
        }
    }


    public async register(username: string, password: string): Promise<void> {
        try {
            this.userRepository.create(username, password);
        } catch (error) {

            throw error;
        }
    }
}

