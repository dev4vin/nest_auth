export declare const IS_PUBLIC_KEY = "isPublic";
/**
 * decorates function as can be accessed by guests
 * @returns metadata with public key
 */
export declare const Public: () => import("@nestjs/common").CustomDecorator<string>;
