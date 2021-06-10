export declare abstract class AbstractSignatory {
	#private;
	constructor({
		signingKey,
		address,
		publicKey,
		privateKey,
	}: {
		signingKey: string;
		address: string;
		publicKey: string;
		privateKey: string;
	});
	signingKey(): string;
	address(): string;
	publicKey(): string;
	privateKey(): string;
}
