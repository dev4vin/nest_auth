import { Authenticator } from "./authenticator";
import { IUser } from './IUser';
export interface AuthView {
    login(req: any): Promise<{
        token: any;
        refreshToken: string;
    }>;
    currentUser(req: any): Promise<IUser>;
    logout(req: any): Promise<void>;
}
export declare type AuthRoutes = {
    loginRoute?: string;
    profileRoute?: string;
    logoutRoute?: string;
};
export declare function AuthController<T extends Authenticator>({ loginRoute, profileRoute, logoutRoute }?: AuthRoutes): {
    new (authService: T): {
        new (): AuthView;
    };
};
