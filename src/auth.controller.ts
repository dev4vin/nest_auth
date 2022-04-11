import {
    Get,
    Post,
    Req,
    UseGuards
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { Authenticated, Public } from "./auth.guard";
import { Authenticator } from "./authenticator";
import { IUser } from './IUser';
import { LocalAuthGuard } from "./local.guard";
import { LoginDTO } from "./login.dto";

export interface AuthView {
    login(req: any): Promise<{ token: any, refreshToken: string }>;
    currentUser(req: any): Promise<IUser>
    logout(req: any): Promise<void>
}

export type AuthRoutes = {
    loginRoute?: string,
    profileRoute?: string,
    logoutRoute?: string,
}

export function AuthController<T extends Authenticator>(
    {
        loginRoute,
        profileRoute,
        logoutRoute }: AuthRoutes = {
            loginRoute: 'login',
            profileRoute: 'profile',
            logoutRoute: 'logout'
        }): { new(authService: T): { new(): AuthView } } {
    class AuthControllerHost implements AuthView {
        constructor(
            public readonly authService: T,
        ) { }

        @Post(loginRoute)
        @UseGuards(LocalAuthGuard)
        @Public()
        @ApiOkResponse()
        @ApiBody({ type: LoginDTO })
        login(@Req() req: any): Promise<{ token: any; refreshToken: any; }> {
            return this.authService.signToken(req.user);
        }


        /**
         *
         *
         * @param {*} req
         * @return {*}  {Promise<Users>}
         * @memberof AuthController
         */
        @Authenticated()
        @ApiOperation({ summary: 'Get logged in user' })
        @Get(profileRoute)
        async currentUser(@Req() req: any): Promise<IUser> {
            return await this.authService.getFullProfile(req.user);
        }

        /**
         *
         *
         * @param {*} req
         * @return {*}
         * @memberof AuthController
         */
        @Authenticated()
        @ApiOperation({ summary: 'log out user' })
        @Post(logoutRoute)
        async logout(@Req() req: any) {
            return this.authService.logout(req);
        }
    }
    // @ts-ignore
    return AuthControllerHost;
}
