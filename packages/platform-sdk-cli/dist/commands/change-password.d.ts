import { Contracts } from "@arkecosystem/platform-sdk-profiles";
export declare const validatePassword: (value: string) => Promise<boolean | string>;
export declare const changePassword: (profile: Contracts.IProfile) => Promise<void>;
