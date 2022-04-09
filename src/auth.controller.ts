import { Type } from '@dev4vin/commons';
import {
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import { ApiBody, ApiOkResponse } from "@nestjs/swagger";
import { Public } from "./auth.guard";
import { Authenticator } from "./authenticator";
import { LocalAuthGuard } from "./local.guard";
import { LoginDTO } from "./login.dto";

export interface AuthView {
    login(req: any): Promise<{ token: any, refreshToken: string }>;
}

export function AuthController<T extends Authenticator>(loginRoute: string = 'login'): { new(authService: T): Type } {
    class AuthControllerHost implements AuthView {
        constructor(
            public readonly authService: T,
        ) { }

        @Post(loginRoute)
        @UseGuards(LocalAuthGuard)
        @Public()
        @ApiOkResponse()
        @ApiBody({ type: LoginDTO })
        login(@Request() req: any): Promise<{ token: any; refreshToken: any; }> {
            return this.authService.signToken(req.user);
        }
    }
    return AuthControllerHost;
}
