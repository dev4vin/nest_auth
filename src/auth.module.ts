/*
 * Copyright (C) 2021 SwiftRide
 *  All rights reserved
 */

import { Type } from '@dev4vin/commons';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AUTHENTICATOR, Authenticator, PASSWORDHASHER } from './authenticator';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { PasswordHash, PasswordUtil } from './password';

export type IAuthOptions = {
    sessionKey: string,
    sessionExpiry: string,
    globalGuard?: boolean,
    saltRounds?: number
}

@Module({})
export class AuthModule {
    static register<T extends Authenticator>(
        { controllerRef, serviceRef }: {
            serviceRef: {
                new(...args: any[]): T
            }, controllerRef: {
                new(authenticator: T, ...args: any[]): Type
            }
        },
        options: IAuthOptions, { imports = [], providers = [] }: { imports: any[], providers: any[] }): DynamicModule {
        const providers1 = [
            serviceRef,
            {
                provide: PASSWORDHASHER,
                useValue: new PasswordUtil(options.saltRounds ?? 12)
            },
            {
                provide: AUTHENTICATOR,
                useFactory: (jwtService: JwtService,
                     authenticator: typeof serviceRef,
                     passwordHasher: PasswordHash) => {
                    // @ts-ignore
                    authenticator.jwtService = jwtService;
                    // @ts-ignore
                    authenticator.hasher = passwordHasher;
                    return authenticator;
                },
                inject: [JwtService, serviceRef, PASSWORDHASHER],
            },
            Reflector,
            {
                provide: 'session_options',
                useValue: options
            },
            JwtStrategy,
            JwtAuthGuard,
            LocalStrategy
        ];
        const exports = [];
        if (options.globalGuard) {
            exports.push(JwtAuthGuard)
        }
        return {
            module: AuthModule,
            imports: [
                ...imports,
                JwtModule.registerAsync({
                    imports: [ConfigModule],
                    useFactory: async (cfg: ConfigService) => ({
                        secret: cfg.get(options.sessionKey),
                        signOptions: { expiresIn: options.sessionExpiry },
                    }),
                    inject: [ConfigService],
                }),
                PassportModule
            ],
            controllers: [controllerRef],
            providers: [
                ...providers1,
                ...providers
            ],
            exports: [serviceRef, ...exports],
        };
    }
}

