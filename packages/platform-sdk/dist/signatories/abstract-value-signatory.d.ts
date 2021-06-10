export declare abstract class AbstractValueSignatory {
	#private;
	constructor({ signingKey, address, publicKey }: { signingKey: string; address: string; publicKey: string });
	signingKey(): string;
	address(): string;
	publicKey(): string;
}
