/// <reference types="node" />
export declare class HashAlgorithms {
	static ripemd160(buffer: Buffer | string): Buffer;
	static sha256(buffer: Buffer | string | Buffer[]): Buffer;
}
