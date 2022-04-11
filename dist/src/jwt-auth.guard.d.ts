import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
/**
 *
 *
 * @export
 * @class JwtAuthGuard
 * @extends {AuthGuard('jwt')}
 */
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    /**
     * Creates an instance of JwtAuthGuard.
     * @param {Reflector} reflector
     * @memberof JwtAuthGuard
     */
    reflector: Reflector;
    constructor();
    /**
     *
     *
     * @param {ExecutionContext} context
     * @return {*}
     * @memberof JwtAuthGuard
     */
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | import("rxjs").Observable<boolean>;
}
declare const GqlJwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
/**
 *
 *
 * @export
 * @class GqlJwtAuthGuard
 * @extends {AuthGuard('jwt')}
 */
export declare class GqlJwtAuthGuard extends GqlJwtAuthGuard_base {
    private reflector;
    /**
     * Creates an instance of GqlJwtAuthGuard.
     * @param {Reflector} reflector
     * @memberof GqlJwtAuthGuard
     */
    constructor(reflector: Reflector);
    /**
     *
     *
     * @param {ExecutionContext} ctx
     * @return {*}
     * @memberof GqlJwtAuthGuard
     */
    canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | import("rxjs").Observable<boolean>;
}
export {};
