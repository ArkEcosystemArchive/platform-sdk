/// <reference types="node" />
export declare class UUID {
	static timestamp(): string;
	static md5(name: string, namespace: string): string;
	static random(): string;
	static sha1(name: string, namespace: string): string;
	static parse(uuid: string): Buffer;
	static stringify(uuid: Buffer): string;
	static validate(uuid: string): boolean;
}
