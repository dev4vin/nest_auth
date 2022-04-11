import { SetMetadata } from '@nestjs/common';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiForbiddenResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RoleGuard } from './roles.guard';

export const IS_PUBLIC_KEY = 'isPublic';
/**
 * decorates function as can be accessed by guests
 * @returns metadata with public key
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const AuthOptions = {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    name: 'JWT',
    description: 'Enter token',
    in: 'header',
    docName: 'JWT-auth'
  };
  
  export const Authenticated = (guards: string[] = [], summary: string = '') => {
    const decorators = [];
    if (guards.length > 0) {
      decorators.push(UseGuards(RoleGuard(...guards)))
      decorators.push(ApiBearerAuth(AuthOptions.docName))
      decorators.push(ApiForbiddenResponse({ description: 'Forbidden.' }));
      decorators.push(
        ApiOperation({
          summary: `Guards ${guards.map((g) => g.toString()).join(', ')}, ${summary}`
        })
      );
    }
    else {
      decorators.push(UseGuards(JwtAuthGuard))
      decorators.push(ApiBearerAuth(AuthOptions.docName))
      decorators.push(
        ApiOperation({
          summary: `${summary}`
        })
      );
    }
    return applyDecorators(
      ...decorators
    );
  };
  
 
  