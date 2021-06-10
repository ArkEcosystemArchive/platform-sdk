import { Services } from "@arkecosystem/platform-sdk";
import { Keypair } from "stellar-sdk";
export declare const buildPath: (options?: Services.IdentityOptions | undefined) => string;
export declare const deriveKeyPair: (
	mnemonic: string,
	options?: Services.IdentityOptions | undefined,
) => {
	child: Keypair;
	path: string;
};
