import { Strategy } from 'passport-local';
import { Authenticator } from './authenticator';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly authService;
    constructor(authService: Authenticator);
    validate(username: string, password: string): Promise<any>;
}
export {};
