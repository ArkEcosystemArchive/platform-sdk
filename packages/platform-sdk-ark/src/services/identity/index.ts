import { Managers } from "@arkecosystem/crypto";
import { Contracts } from "@arkecosystem/platform-sdk";

import { Address } from "./address";
import { Keys } from "./keys";
import { PrivateKey } from "./private-key";
import { PublicKey } from "./public-key";
import { WIF } from "./wif";

export class IdentityService implements Contracts.IdentityService {
	public static async construct(opts: Contracts.KeyValuePair): Promise<IdentityService> {
		Managers.configManager.setFromPreset(opts.network);

		return new IdentityService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public address(): Address {
		return new Address();
	}

	public publicKey(): PublicKey {
		return new PublicKey();
	}

	public privateKey(): PrivateKey {
		return new PrivateKey();
	}

	public wif(): WIF {
		return new WIF();
	}

	public keys(): Keys {
		return new Keys();
	}
}
