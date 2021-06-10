/// <reference types="node" />
export declare const derivePrivateKey: (mnemonic: string, account: number, index: number, slip44: number) => Buffer;
export declare const derivePublicKey: (privateKey: Buffer) => Buffer;
