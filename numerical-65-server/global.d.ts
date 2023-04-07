import { Secret } from 'jsonwebtoken';
namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        SECRET_KEY: string;
    }
}