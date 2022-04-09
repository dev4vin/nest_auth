import { Strategy } from 'passport-jwt';
import { IAuthOptions } from './auth.module';
import { Authenticator } from './authenticator';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
/**
 *
 *
 * @export
 * @class JwtStrategy
 * @extends {PassportStrategy(Strategy)}
 */
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authenticator;
    readonly key: IAuthOptions;
    /**
     * Creates an instance of JwtStrategy.
     * @param {ConfigService} cfg
     * @memberof JwtStrategy
     */
    constructor(authenticator: Authenticator, key: IAuthOptions);
    /**
     *
     *
     * @param {*} payload
     * @return {*}
     * @memberof JwtStrategy
     */
    validate(payload: any): Promise<import("./IUser").IUser>;
}
export {};
