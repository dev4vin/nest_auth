import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IUser } from "./IUser";
import { LoginEntity } from "./login.entity";
import { PasswordHash, PasswordUtil } from "./password";
import _ from 'lodash';

export const PASSWORDHASHER = 'PASSWORDHASHER';
/** */
export const AUTHENTICATOR = "nest_api_utils_authenticator";
/**
 *
 *
 * @export
 * @abstract
 * @class Authenticator
 */
export abstract class Authenticator {
  /**
   *
   *
   * @type {JwtService}
   * @memberof Authenticator
   */
  protected jwtService?: JwtService
  /**
   *
   *
   * @type {PasswordHash}
   * @memberof Authenticator
   */
  public hasher?: PasswordHash;
  /**
   *
   *
   * @param {number} [rounds=12]
   * @return {*}  {PasswordHash}
   * @memberof Authenticator
   */
  public getHasher(): PasswordHash {
    return this.hasher ?? new PasswordUtil();
  }

  /**
   *
   *
   * @abstract
   * @param {*} payload
   * @return {*}  {Promise<{ scope: string }>}
   * @memberof Authenticator
   */
  public abstract validateJwtPayload({ token }: {token: any }): Promise<IUser>
  /**
   * checks if the scope of the user is in the roles requested by the function guard
   *
   * @param {*} { scope } user scope examples USER | ADMIN
   * @param {...string[]} roles function requested roles
   * @return {*}  {Promise<boolean>} true if scope is in roles otherwise not
   * @memberof Authenticator  
   */
  async validateRoles({ scopes }: { scopes: string[] }, ...roles: string[]): Promise<boolean> {
    return true;
    // return new Promise((resolve) => {
    //   resolve(roles.map((r) => r.toLowerCase()).includes(scope.toLowerCase()));
    // });
  }
  /**
   *
   *
   * @abstract
   * @param {string} username
   * @return {*}  {Promise<IUser>}
   * @memberof Authenticator
   */
  public abstract findByUserName(username: string): Promise<IUser>
  /**
   *
   *
   * @abstract
   * @param {IUser} user
   * @memberof Authenticator
   */
  public abstract verifyUserLogin(user: IUser): void;
  /**
   *
   *
   * @abstract
   * @param {IUser} user
   * @return {*}  {Promise<{ token: any, refreshToken: string }>}
   * @memberof Authenticator
   */
  public abstract makeToken(user: IUser): Promise<{ token: any, refreshToken: string }>;
  /**
   *
   *
   * @param {IUser} user
   * @return {*}  {Promise<LoginEntity>}
   * @memberof Authenticator
   */
  async signToken(user: IUser): Promise<LoginEntity> {
    // @ts-ignore
    const payload = await this.makeToken(user);
    if (this.jwtService === undefined) {
      throw new Error('app error');
    }
    const signed = (this.jwtService).sign({ token: payload.token});
    return {
      token: signed,
      refreshToken: payload.refreshToken,
    };
  }

  public makePassword(password: string): Promise<string> {
    return this.getHasher().hashPassword(password);
  }
  /**
   *
   *
   * @param {{ username: string, password: string, rounds: number }} { username, password, rounds = 12 }
   * @return {*}  {Promise<IUser>}
   * @memberof Authenticator
   */
  async validate({ username, password }: { username: string, password: string }): Promise<IUser> {
    const user = await this.findByUserName(username);
    if (user) {
      this.verifyUserLogin(user);
      if (await this.getHasher().checkPassword(password, user.password ?? ''))
        return user;
      else throw new UnauthorizedException('password mismatch');
    }
    throw new NotFoundException('user not found with that usernamr');
  }
}

