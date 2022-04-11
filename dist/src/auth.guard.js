"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticated = exports.AuthOptions = exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const roles_guard_1 = require("./roles.guard");
exports.IS_PUBLIC_KEY = 'isPublic';
/**
 * decorates function as can be accessed by guests
 * @returns metadata with public key
 */
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;
exports.AuthOptions = {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    name: 'JWT',
    description: 'Enter token',
    in: 'header',
    docName: 'JWT-auth'
};
const Authenticated = (guards = [], summary = '') => {
    const decorators = [];
    if (guards.length > 0) {
        decorators.push((0, common_2.UseGuards)((0, roles_guard_1.RoleGuard)(...guards)));
        decorators.push((0, swagger_1.ApiBearerAuth)(exports.AuthOptions.docName));
        decorators.push((0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden.' }));
        decorators.push((0, swagger_1.ApiOperation)({
            summary: `Guards ${guards.map((g) => g.toString()).join(', ')}, ${summary}`
        }));
    }
    else {
        decorators.push((0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard));
        decorators.push((0, swagger_1.ApiBearerAuth)(exports.AuthOptions.docName));
        decorators.push((0, swagger_1.ApiOperation)({
            summary: `${summary}`
        }));
    }
    return (0, common_2.applyDecorators)(...decorators);
};
exports.Authenticated = Authenticated;
//# sourceMappingURL=auth.guard.js.map