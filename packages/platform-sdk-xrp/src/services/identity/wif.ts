import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class WIF implements Contracts.WIF {
	public async fromMnemonic(mnemonic: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMnemonic");
	}
}
