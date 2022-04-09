import * as bcrypt from 'bcryptjs';

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
  hashPassword(password: string): Promise<string>
  /**
   *
   *
   * @param {string} password
   * @param {string} hashedPassword
   * @return {*}  {Promise<boolean>}
   * @memberof PasswordHash
   */
  checkPassword(password: string, hashedPassword: string): Promise<boolean>
}

export class PasswordUtil implements PasswordHash {
  constructor(private rounds: number = 12) { }
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.rounds);
    // now we set user password to hashed password
    return await bcrypt.hash(password, salt);
  }
  async checkPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
