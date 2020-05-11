import { Contracts } from "@arkecosystem/platform-sdk";

import { deriveWallet } from "./utils";

export class WIF implements Contracts.WIF {
	public async fromPassphrase(passphrase: string): Promise<string> {
		return deriveWallet(passphrase).WIF;
	}
}
