import { JwtService } from "@nestjs/jwt";
import { IUser } from "./IUser";
import { LoginEntity } from "./login.entity";
import { PasswordHash } from "./password";
/**
 * Injector key for the password hasher implementation
 */
export declare const PASSWORDHASHER = "PASSWORDHASHER";
/**
 * injector key for the Authenticator implementation
 * @see Authenticator
*/
export declare const AUTHENTICATOR = "nest_api_utils_authenticator";
/**
 * Base class for Authentication methods.
 * Provides login implementation as weel as signing of tokens
 *
 * @export
 * @abstract
 * @class Authenticator
 */
export declare abstract class Authenticator {
    /**
     *
     * The service used to make the tokens
     * @type {JwtService}
     * @memberof Authenticator
     */
    protected jwtService?: JwtService;
    /**
     * The implementation for hashing and checking user passwords during login
     *
     * @type {PasswordHash}
     * @memberof Authenticator
     */
    passwordHasher?: PasswordHash;
    /**
     *
     *
     * @protected
     * @type {PasswordHash}
     * @memberof Authenticator
     */
    protected hasher?: PasswordHash;
    /**
     * Returns user passed hasher or the default hasher
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
    /**
     *
     *
     * @abstract
     * @param {IUser} user
     * @return {*}  {Promise<IUser>}
     * @memberof Authenticator
     */
    abstract getFullProfile(user: IUser): Promise<IUser>;
    /**
     *
     *
     * @abstract
     * @param {Request} req
     * @return {*}  {Promise<any>}
     * @memberof Authenticator
     */
    abstract logout(req: Request): Promise<any>;
}
