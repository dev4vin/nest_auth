import { CanActivate, Type } from '@nestjs/common';
/**
 *
 * @param roles
 * @returns
 */
export declare const RoleGuard: (...roles: string[]) => Type<CanActivate>;
/**
 *
 */
export declare const CurrentUser: (...dataOrPipes: any[]) => ParameterDecorator;
/**
 *
 * @param roles
 * @returns
 */
export declare const GqlRoleGuard: (...roles: string[]) => Type<CanActivate>;
