import { Model } from '@dev4vin/nest_data';
export type IUser = Model & {
    password?: string;
}