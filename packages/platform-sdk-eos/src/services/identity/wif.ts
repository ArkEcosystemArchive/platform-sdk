import { Contracts } from "@arkecosystem/platform-sdk";
import { seedPrivate } from "eosjs-ecc";

export class WIF implements Contracts.WIF {
	public async fromMnemonic(mnemonic: string): Promise<string> {
		return seedPrivate(passphrase);
	}
}
