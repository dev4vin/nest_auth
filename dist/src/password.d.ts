/**
 *
 *
 * @export
 * @interface PasswordHash
 */
export interface PasswordHash {
    /**
     *
     *
     * @param {string} password
     * @return {*}  {Promise<string>}
     * @memberof PasswordHash
     */
    hashPassword(password: string): Promise<string>;
    /**
     *
     *
     * @param {string} password
     * @param {string} hashedPassword
     * @return {*}  {Promise<boolean>}
     * @memberof PasswordHash
     */
    checkPassword(password: string, hashedPassword: string): Promise<boolean>;
}
export declare class PasswordUtil implements PasswordHash {
    private rounds;
    constructor(rounds?: number);
    hashPassword(password: string): Promise<string>;
    checkPassword(password: string, hashedPassword: string): Promise<boolean>;
}
