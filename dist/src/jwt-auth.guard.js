"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GqlJwtAuthGuard = exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const execution_context_host_1 = require("@nestjs/core/helpers/execution-context-host");
const graphql_1 = require("@nestjs/graphql");
const passport_1 = require("@nestjs/passport");
const auth_guard_1 = require("./auth.guard");
/**
 *
 *
 * @export
 * @class JwtAuthGuard
 * @extends {AuthGuard('jwt')}
 */
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    /**
     * Creates an instance of JwtAuthGuard.
     * @param {Reflector} reflector
     * @memberof JwtAuthGuard
     */
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    /**
     *
     *
     * @param {ExecutionContext} context
     * @return {*}
     * @memberof JwtAuthGuard
     */
    canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(auth_guard_1.IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }
};
JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;
/**
 *
 *
 * @export
 * @class GqlJwtAuthGuard
 * @extends {AuthGuard('jwt')}
 */
let GqlJwtAuthGuard = class GqlJwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    /**
     * Creates an instance of GqlJwtAuthGuard.
     * @param {Reflector} reflector
     * @memberof GqlJwtAuthGuard
     */
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    /**
     *
     *
     * @param {ExecutionContext} ctx
     * @return {*}
     * @memberof GqlJwtAuthGuard
     */
    canActivate(ctx) {
        const context = graphql_1.GqlExecutionContext.create(ctx);
        const isPublic = this.reflector.getAllAndOverride(auth_guard_1.IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
        if (isPublic) {
            return true;
        }
        const { req } = context.getContext();
        return super.canActivate(new execution_context_host_1.ExecutionContextHost([req])); // NOTE
    }
};
GqlJwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], GqlJwtAuthGuard);
exports.GqlJwtAuthGuard = GqlJwtAuthGuard;
//# sourceMappingURL=jwt-auth.guard.js.map