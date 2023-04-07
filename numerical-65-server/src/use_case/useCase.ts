import { Config } from '../main';
import { methodRepository } from '../repositories/method';
import { userRepository } from "../repositories/user"
import { apiUseCase } from './apiUseCase';
import { authUseCase } from "./authUseCase"


export class UseCase {
    public authUseCase: authUseCase
    public apiUseCase: apiUseCase
    private cfg: Config;

    constructor(userRepo: userRepository, methodRepo: methodRepository, cfg: Config) {
        this.authUseCase = new authUseCase(userRepo, cfg);
        this.apiUseCase = new apiUseCase(methodRepo);
        this.cfg = cfg;
    }



}

