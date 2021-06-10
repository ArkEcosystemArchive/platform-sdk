export declare const privateToPublic: (mnemonic: string) => string;
export declare const sign: (data: string, privateKey: string) => string;
export declare const verify: (signature: string, data: string, publicKey: string) => boolean;
