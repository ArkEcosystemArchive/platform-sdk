import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class LedgerService implements Contracts.LedgerService {
	public static async __construct(config: Coins.Config): Promise<LedgerService> {
		return new LedgerService();
	}

	public async __destruct(): Promise<void> {
		await this.disconnect();
	}

	public async connect(transport: Contracts.LedgerTransport): Promise<void> {
		throw new Exceptions.NotImplemented(this.constructor.name, "connect");
	}

	public async disconnect(): Promise<void> {
		throw new Exceptions.NotImplemented(this.constructor.name, "disconnect");
	}

	public async getVersion(): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getVersion");
	}

	public async getPublicKey(path: string): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getPublicKey");
	}

	public async getExtendedPublicKey(path: string): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getPublicKey");
	}

	public async signTransaction(path: string, payload: Buffer): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "signTransaction");
	}

	public async signMessage(path: string, payload: Buffer): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "signMessage");
	}

	public async scan(options?: { useLegacy: boolean }): Promise<Contracts.LedgerWalletList> {
		throw new Exceptions.NotImplemented(this.constructor.name, "scan");
	}
}
