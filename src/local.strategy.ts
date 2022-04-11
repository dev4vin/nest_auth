/*
 * Copyright (C) 2021 SwiftRide
 *  All rights reserved
 */

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Authenticator, AUTHENTICATOR } from './authenticator';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AUTHENTICATOR) private readonly authService: Authenticator,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validate({
      username,
      password,
    });
    if (!user) {
      throw new UnauthorizedException('login credentials are not correct');
    }
    return user;
  }
}
