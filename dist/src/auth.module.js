"use strict";
/*
 * Copyright (C) 2021 SwiftRide
 *  All rights reserved
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var AuthModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const authenticator_1 = require("./authenticator");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const jwt_strategy_1 = require("./jwt.strategy");
const local_strategy_1 = require("./local.strategy");
const password_1 = require("./password");
let AuthModule = AuthModule_1 = class AuthModule {
    static register({ controllerRef, serviceRef }, options, { imports = [], providers = [] }) {
        var _a;
        const providers1 = [
            serviceRef,
            {
                provide: authenticator_1.PASSWORDHASHER,
                useValue: new password_1.PasswordUtil((_a = options.saltRounds) !== null && _a !== void 0 ? _a : 12)
            },
            {
                provide: authenticator_1.AUTHENTICATOR,
                useFactory: (jwtService, authenticator, passwordHasher) => {
                    // @ts-ignore
                    authenticator.jwtService = jwtService;
                    // @ts-ignore
                    authenticator.hasher = passwordHasher;
                    return authenticator;
                },
                inject: [jwt_1.JwtService, serviceRef, authenticator_1.PASSWORDHASHER],
            },
            core_1.Reflector,
            {
                provide: 'session_options',
                useValue: options
            },
            jwt_strategy_1.JwtStrategy,
            jwt_auth_guard_1.JwtAuthGuard,
            local_strategy_1.LocalStrategy
        ];
        const exports = [];
        if (options.globalGuard) {
            exports.push(jwt_auth_guard_1.JwtAuthGuard);
        }
        return {
            module: AuthModule_1,
            imports: [
                ...imports,
                jwt_1.JwtModule.registerAsync({
                    imports: [config_1.ConfigModule],
                    useFactory: (cfg) => __awaiter(this, void 0, void 0, function* () {
                        return ({
                            secret: cfg.get(options.sessionKey),
                            signOptions: { expiresIn: options.sessionExpiry },
                        });
                    }),
                    inject: [config_1.ConfigService],
                }),
                passport_1.PassportModule
            ],
            controllers: [controllerRef],
            providers: [
                ...providers1,
                ...providers
            ],
            exports: [serviceRef, ...exports],
        };
    }
};
AuthModule = AuthModule_1 = __decorate([
    (0, common_1.Module)({})
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map