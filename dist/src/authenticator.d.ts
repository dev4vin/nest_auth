import { JwtService } from "@nestjs/jwt";
import { IUser } from "./IUser";
import { LoginEntity } from "./login.entity";
import { PasswordHash } from "./password";
export declare const PASSWORDHASHER = "PASSWORDHASHER";
/** */
export declare const AUTHENTICATOR = "nest_api_utils_authenticator";
/**
 *
 *
 * @export
 * @abstract
 * @class Authenticator
 */
export declare abstract class Authenticator {
    /**
     *
     *
     * @type {JwtService}
     * @memberof Authenticator
     */
    protected jwtService?: JwtService;
    /**
     *
     *
     * @type {PasswordHash}
     * @memberof Authenticator
     */
    hasher?: PasswordHash;
    /**
     *
     *
     * @param {number} [rounds=12]
     * @return {*}  {PasswordHash}
     * @memberof Authenticator
     */
    getHasher(): PasswordHash;
    /**
     *
     *
     * @abstract
     * @param {*} payload
     * @return {*}  {Promise<{ scope: string }>}
     * @memberof Authenticator
     */
    abstract validateJwtPayload({ token }: {
        token: any;
    }): Promise<IUser>;
    /**
     * checks if the scope of the user is in the roles requested by the function guard
     *
     * @param {*} { scope } user scope examples USER | ADMIN
     * @param {...string[]} roles function requested roles
     * @return {*}  {Promise<boolean>} true if scope is in roles otherwise not
     * @memberof Authenticator
     */
    validateRoles({ scopes }: {
        scopes: string[];
    }, ...roles: string[]): Promise<boolean>;
    /**
     *
     *
     * @abstract
     * @param {string} username
     * @return {*}  {Promise<IUser>}
     * @memberof Authenticator
     */
    abstract findByUserName(username: string): Promise<IUser>;
    /**
     *
     *
     * @abstract
     * @param {IUser} user
     * @memberof Authenticator
     */
    abstract verifyUserLogin(user: IUser): void;
    /**
     *
     *
     * @abstract
     * @param {IUser} user
     * @return {*}  {Promise<{ token: any, refreshToken: string }>}
     * @memberof Authenticator
     */
    abstract makeToken(user: IUser): Promise<{
        token: any;
        refreshToken: string;
    }>;
    /**
     *
     *
     * @param {IUser} user
     * @return {*}  {Promise<LoginEntity>}
     * @memberof Authenticator
     */
    signToken(user: IUser): Promise<LoginEntity>;
    makePassword(password: string): Promise<string>;
    /**
     *
     *
     * @param {{ username: string, password: string, rounds: number }} { username, password, rounds = 12 }
     * @return {*}  {Promise<IUser>}
     * @memberof Authenticator
     */
    validate({ username, password }: {
        username: string;
        password: string;
    }): Promise<IUser>;
}
