export interface Structure {
	readonly version: number;
	readonly privateKey: string;
	readonly compressed: boolean;
}
export declare class WIF {
	static encode({ version, privateKey, compressed }: Structure): string;
	static decode(string: string): Structure;
}
