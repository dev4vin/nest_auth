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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("./auth.guard");
const local_guard_1 = require("./local.guard");
const login_dto_1 = require("./login.dto");
function AuthController({ loginRoute, profileRoute, logoutRoute } = {
    loginRoute: 'login',
    profileRoute: 'profile',
    logoutRoute: 'logout'
}) {
    class AuthControllerHost {
        constructor(authService) {
            this.authService = authService;
        }
        login(req) {
            return this.authService.signToken(req.user);
        }
        /**
         *
         *
         * @param {*} req
         * @return {*}  {Promise<Users>}
         * @memberof AuthController
         */
        currentUser(req) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.authService.getFullProfile(req.user);
            });
        }
        /**
         *
         *
         * @param {*} req
         * @return {*}
         * @memberof AuthController
         */
        logout(req) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.authService.logout(req);
            });
        }
    }
    __decorate([
        (0, common_1.Post)(loginRoute),
        (0, common_1.UseGuards)(local_guard_1.LocalAuthGuard),
        (0, auth_guard_1.Public)(),
        (0, swagger_1.ApiOkResponse)(),
        (0, swagger_1.ApiBody)({ type: login_dto_1.LoginDTO }),
        __param(0, (0, common_1.Req)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthControllerHost.prototype, "login", null);
    __decorate([
        (0, auth_guard_1.Authenticated)(),
        (0, swagger_1.ApiOperation)({ summary: 'Get logged in user' }),
        (0, common_1.Get)(profileRoute),
        __param(0, (0, common_1.Req)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthControllerHost.prototype, "currentUser", null);
    __decorate([
        (0, auth_guard_1.Authenticated)(),
        (0, swagger_1.ApiOperation)({ summary: 'log out user' }),
        (0, common_1.Post)(logoutRoute),
        __param(0, (0, common_1.Req)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthControllerHost.prototype, "logout", null);
    // @ts-ignore
    return AuthControllerHost;
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map