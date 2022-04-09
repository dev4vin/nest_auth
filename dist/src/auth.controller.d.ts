import { Type } from '@dev4vin/commons';
import { Authenticator } from "./authenticator";
export interface AuthView {
    login(req: any): Promise<{
        token: any;
        refreshToken: string;
    }>;
}
export declare function AuthController<T extends Authenticator>(loginRoute?: string): {
    new (authService: T): Type;
};
