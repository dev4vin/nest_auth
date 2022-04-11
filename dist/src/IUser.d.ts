import { Model } from '@dev4vin/nest_data';
/**
 *
 */
export declare type IUser = Model & {
    /**
     * the user model needs to hve a password for local auth
     *
     * @type {string}
     */
    password?: string;
};
