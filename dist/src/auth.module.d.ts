import { Type } from '@dev4vin/commons';
import { DynamicModule } from '@nestjs/common';
import { Authenticator } from './authenticator';
export declare type IAuthOptions = {
    sessionKey: string;
    sessionExpiry: string;
    globalGuard?: boolean;
    saltRounds?: number;
};
export declare class AuthModule {
    static register<T extends Authenticator>({ controllerRef, serviceRef }: {
        serviceRef: {
            new (...args: any[]): T;
        };
        controllerRef: {
            new (authenticator: T, ...args: any[]): Type;
        };
    }, options: IAuthOptions, { imports, providers }: {
        imports: any[];
        providers: any[];
    }): DynamicModule;
}
