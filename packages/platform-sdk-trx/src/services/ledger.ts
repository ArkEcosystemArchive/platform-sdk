import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class LedgerService implements Contracts.LedgerService {
	private constructor(transport: Contracts.LedgerTransport) {
		//
	}

	public static async construct(opts: Contracts.LedgerOptions): Promise<LedgerService> {
		return new LedgerService(opts.transport);
	}

	public async destruct(): Promise<void> {
		//
	}

	public async getVersion(): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getVersion");
	}

	public async getPublicKey(path: string): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getPublicKey");
	}

	public async signTransaction(path: string, hex: Buffer): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "signTransaction");
	}

	public async signMessage(path: string, hex: Buffer): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "signMessage");
	}
}
