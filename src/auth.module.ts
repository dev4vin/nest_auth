import { Type } from '@dev4vin/commons';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AUTHENTICATOR, Authenticator, PASSWORDHASHER } from './authenticator';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { PasswordHash, PasswordUtil } from './password';
/**
 * 
 */
export type IAuthOptions = {
    /**
     * The key in the .env file that has the actual session key used to sign tokens
     *
     * @type {string}
     */
    sessionKey: string,
    /**
     * The expiry time of the issued tokens
     * @example '3d', '1h', '30m'
     *
     * @type {string}
     */
    sessionExpiry: string,
    /**
     * Whether the module exports a global guard that you then provide to the app module as an APP_GUARD
     * @see JwtAuthGuard
     * @type {boolean}
     */
    globalGuard?: boolean,
    /**
     * The number of rounds used by bycrypt to hash user passwords
     * @example 12
     * @type {number}
     */
    saltRounds?: number
}

/**
 * The auth module bootstraps the internal Authenticator as well as the internal AuthController
 * @see AuthController, your own AuthController must extend from this.
 * @see Authenticator, your own AuthService must extend from this.
 * @module AuthModule, global module exposes @see AUTHENTICATOR for usage with 
 * @see Authenticated guard.
 * If globalGuard is passed as true, it exposes a global guard to the context of including module.
 * The exposed guard is @see JwtAuthGuard
 * @export
 * @class AuthModule
 */
@Module({})
export class AuthModule {
    /**
     * 
     *
     * @static
     * @template T the actual type extending from @see Authenticator
     * @param {{
     *             serviceRef: {
     *                 new(...args: any[]): T
     *             }, controllerRef: {
     *                 new(authenticator: T, ...args: any[]): Type
     *             }
     *         }} { controllerRef, serviceRef }
     * @param {IAuthOptions} options
     * @param {{ imports?: any[], providers?: any[] }} { imports = [], providers = [] }
     * @return {*}  {DynamicModule}
     * @memberof AuthModule
     */
    static register<T extends Authenticator>(
        { controllerRef, serviceRef }: {
            serviceRef: {
                new(...args: any[]): T
            }, controllerRef: {
                new(authenticator: T, ...args: any[]): Type
            }
        },
        options: IAuthOptions, { imports = [], providers = [] }: { imports?: any[], providers?: any[] }): DynamicModule {
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
            global: true,
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
            exports: [AUTHENTICATOR, ...exports],
        };
    }
}

