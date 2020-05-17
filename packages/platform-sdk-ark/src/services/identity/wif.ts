import { Identities } from "@arkecosystem/crypto";
import { Coins, Contracts } from "@arkecosystem/platform-sdk";

export class WIF implements Contracts.WIF {
	public async fromPassphrase(passphrase: string): Promise<string> {
		return Identities.WIF.fromPassphrase(passphrase);
	}
}
