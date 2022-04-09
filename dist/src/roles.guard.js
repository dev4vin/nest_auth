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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GqlRoleGuard = exports.CurrentUser = exports.RoleGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const graphql_1 = require("@nestjs/graphql");
const authenticator_1 = require("./authenticator");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
/**
 *
 * @param roles
 * @returns
 */
const RoleGuard = (...roles) => {
    let RoleGuardMixin = class RoleGuardMixin extends jwt_auth_guard_1.JwtAuthGuard {
        constructor(reflector, authService) {
            super(reflector);
            this.authService = authService;
        }
        canActivate(context) {
            const _super = Object.create(null, {
                canActivate: { get: () => super.canActivate }
            });
            return __awaiter(this, void 0, void 0, function* () {
                yield _super.canActivate.call(this, context);
                const request = context.switchToHttp().getRequest();
                const user = request.user;
                const possible = yield this.authService.validateRoles(user, ...roles);
                if (!possible) {
                    throw new common_1.ForbiddenException('Insufficient user scope');
                }
                return true;
            });
        }
    };
    RoleGuardMixin = __decorate([
        (0, common_1.Injectable)(),
        __param(1, (0, common_1.Inject)(authenticator_1.AUTHENTICATOR)),
        __metadata("design:paramtypes", [core_1.Reflector,
            authenticator_1.Authenticator])
    ], RoleGuardMixin);
    return (0, common_1.mixin)(RoleGuardMixin);
};
exports.RoleGuard = RoleGuard;
/**
 *
 */
exports.CurrentUser = (0, common_1.createParamDecorator)((_, context) => {
    const ctx = graphql_1.GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
});
/**
 *
 * @param roles
 * @returns
 */
const GqlRoleGuard = (...roles) => {
    let RoleGuardMixin = class RoleGuardMixin extends jwt_auth_guard_1.GqlJwtAuthGuard {
        constructor(reflector, authService) {
            super(reflector);
            this.authService = authService;
        }
        canActivate(context) {
            const _super = Object.create(null, {
                canActivate: { get: () => super.canActivate }
            });
            return __awaiter(this, void 0, void 0, function* () {
                yield _super.canActivate.call(this, context);
                const ctx = graphql_1.GqlExecutionContext.create(context);
                const request = ctx.getContext().req;
                const user = request.user;
                const possible = yield this.authService.validateRoles(user, ...roles);
                if (!possible) {
                    throw new common_1.ForbiddenException('Insufficient user scope');
                }
                return true;
            });
        }
    };
    RoleGuardMixin = __decorate([
        (0, common_1.Injectable)(),
        __param(1, (0, common_1.Inject)(authenticator_1.AUTHENTICATOR)),
        __metadata("design:paramtypes", [core_1.Reflector,
            authenticator_1.Authenticator])
    ], RoleGuardMixin);
    return (0, common_1.mixin)(RoleGuardMixin);
};
exports.GqlRoleGuard = GqlRoleGuard;
//# sourceMappingURL=roles.guard.js.map