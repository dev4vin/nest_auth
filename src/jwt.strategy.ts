import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IAuthOptions } from './auth.module';
import { AUTHENTICATOR, Authenticator } from './authenticator';

/**
 *
 *
 * @export
 * @class JwtStrategy
 * @extends {PassportStrategy(Strategy)}
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * Creates an instance of JwtStrategy.
   * @param {ConfigService} cfg
   * @memberof JwtStrategy
   */
  constructor(@Inject(AUTHENTICATOR) private readonly authenticator: Authenticator,
    @Inject('session_options') readonly key: IAuthOptions) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: key.sessionKey
    });
  }

  /**
   *
   *
   * @param {*} payload
   * @return {*}
   * @memberof JwtStrategy
   */
  async validate(payload: any) {
    return await this.authenticator.validateJwtPayload(payload);
  }
}
