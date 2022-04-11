export declare const IS_PUBLIC_KEY = "isPublic";
/**
 * decorates function as can be accessed by guests
 * @returns metadata with public key
 */
export declare const Public: () => import("@nestjs/common").CustomDecorator<string>;
export declare const AuthOptions: {
    type: string;
    scheme: string;
    bearerFormat: string;
    name: string;
    description: string;
    in: string;
    docName: string;
};
export declare const Authenticated: (guards?: string[], summary?: string) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol | undefined, descriptor?: TypedPropertyDescriptor<Y> | undefined) => void;
