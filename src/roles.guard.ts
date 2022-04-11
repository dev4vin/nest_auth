import { CanActivate, createParamDecorator, ExecutionContext, ForbiddenException, Inject, Injectable, mixin, Type } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AUTHENTICATOR, Authenticator } from './authenticator';
import { GqlJwtAuthGuard, JwtAuthGuard } from './jwt-auth.guard';

/**
 *
 * @param roles
 * @returns
 */
export const RoleGuard = (...roles: string[]): Type<CanActivate> => {
  @Injectable()
  class RoleGuardMixin extends JwtAuthGuard {
    constructor(
      @Inject(AUTHENTICATOR) private readonly authService: Authenticator) {
      super();
    }
    override async canActivate(context: ExecutionContext): Promise<boolean> {
      await super.canActivate(context);
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      const possible = await this.authService.validateRoles(user, ...roles);
      if (!possible) {
        throw new ForbiddenException('Insufficient user scope');
      }
      return true;
    }
  }

  return mixin(RoleGuardMixin);
};
/**
 *
 */
export const CurrentUser = createParamDecorator((_, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().req.user;
});
/**
 *
 * @param roles
 * @returns
 */
export const GqlRoleGuard = (...roles: string[]): Type<CanActivate> => {
  @Injectable()
  class RoleGuardMixin extends GqlJwtAuthGuard {
    constructor(reflector: Reflector,
      @Inject(AUTHENTICATOR) private readonly authService: Authenticator) {
      super(reflector);
    }

    override async canActivate(context: ExecutionContext): Promise<boolean> {
      await super.canActivate(context);
      const ctx = GqlExecutionContext.create(context);
      const request = ctx.getContext().req;
      const user = request.user;
      const possible = await this.authService.validateRoles(user, ...roles);
      if (!possible) {
        throw new ForbiddenException('Insufficient user scope');
      }
      return true;
    }
  }

  return mixin(RoleGuardMixin);
};
