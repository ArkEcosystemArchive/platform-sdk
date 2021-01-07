import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class LedgerService implements Contracts.LedgerService {
	public static async construct(config: Coins.Config): Promise<LedgerService> {
		return new LedgerService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async connect(transport: Contracts.LedgerTransport): Promise<void> {
		//
	}

	public async disconnect(): Promise<void> {
		//
	}

	public async getVersion(): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getVersion");
	}

	public async getPublicKey(path: string): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getPublicKey");
	}

	public async signTransaction(path: string, payload: Buffer): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "signTransaction");
	}

	public async signTransactionWithSchnorr(path: string, payload: Buffer): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "signTransactionWithSchnorr");
	}

	public async signMessage(path: string, payload: Buffer): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "signMessage");
	}

	public async signMessageWithSchnorr(path: string, payload: Buffer): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "signMessageWithSchnorr");
	}
}
