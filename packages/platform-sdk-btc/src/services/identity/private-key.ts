import { Contracts } from "@arkecosystem/platform-sdk";
import { BIP44 } from "@arkecosystem/platform-sdk-support";
import Bitcoin from "bitcore-lib";

export class PrivateKey implements Contracts.PrivateKey {
	public async fromPassphrase(passphrase: string): Promise<string> {
		return BIP44.deriveMasterKey(passphrase).privateKey!.toString("hex");
	}

	public async fromWIF(wif: string): Promise<string> {
		const privateKey: Buffer = Bitcoin.PrivateKey.fromWIF(wif);

		if (!privateKey) {
			throw new Error(`Failed to derive private key for [${wif}].`);
		}

		return privateKey.toString("hex");
	}
}
