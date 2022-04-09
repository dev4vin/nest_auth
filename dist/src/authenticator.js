"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticator = exports.AUTHENTICATOR = exports.PASSWORDHASHER = void 0;
const common_1 = require("@nestjs/common");
const password_1 = require("./password");
exports.PASSWORDHASHER = 'PASSWORDHASHER';
/** */
exports.AUTHENTICATOR = "nest_api_utils_authenticator";
/**
 *
 *
 * @export
 * @abstract
 * @class Authenticator
 */
class Authenticator {
    /**
     *
     *
     * @param {number} [rounds=12]
     * @return {*}  {PasswordHash}
     * @memberof Authenticator
     */
    getHasher() {
        var _a;
        return (_a = this.hasher) !== null && _a !== void 0 ? _a : new password_1.PasswordUtil();
    }
    /**
     * checks if the scope of the user is in the roles requested by the function guard
     *
     * @param {*} { scope } user scope examples USER | ADMIN
     * @param {...string[]} roles function requested roles
     * @return {*}  {Promise<boolean>} true if scope is in roles otherwise not
     * @memberof Authenticator
     */
    validateRoles({ scopes }, ...roles) {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
            // return new Promise((resolve) => {
            //   resolve(roles.map((r) => r.toLowerCase()).includes(scope.toLowerCase()));
            // });
        });
    }
    /**
     *
     *
     * @param {IUser} user
     * @return {*}  {Promise<LoginEntity>}
     * @memberof Authenticator
     */
    signToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const payload = yield this.makeToken(user);
            if (this.jwtService === undefined) {
                throw new Error('app error');
            }
            const signed = (this.jwtService).sign({ token: payload.token });
            return {
                token: signed,
                refreshToken: payload.refreshToken,
            };
        });
    }
    makePassword(password) {
        return this.getHasher().hashPassword(password);
    }
    /**
     *
     *
     * @param {{ username: string, password: string, rounds: number }} { username, password, rounds = 12 }
     * @return {*}  {Promise<IUser>}
     * @memberof Authenticator
     */
    validate({ username, password }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findByUserName(username);
            if (user) {
                this.verifyUserLogin(user);
                if (yield this.getHasher().checkPassword(password, (_a = user.password) !== null && _a !== void 0 ? _a : ''))
                    return user;
                else
                    throw new common_1.UnauthorizedException('password mismatch');
            }
            throw new common_1.NotFoundException('user not found with that usernamr');
        });
    }
}
exports.Authenticator = Authenticator;
//# sourceMappingURL=authenticator.js.map