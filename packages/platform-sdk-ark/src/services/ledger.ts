import { ARKTransport } from "@arkecosystem/ledger-transport";
import { Contracts } from "@arkecosystem/platform-sdk";

export class LedgerService implements Contracts.LedgerService {
	readonly #transport: ARKTransport;

	private constructor(transport: Contracts.LedgerTransport) {
		this.#transport = transport;
	}

	public static async construct(opts: Contracts.LedgerOptions): Promise<LedgerService> {
		return new LedgerService(opts.transport);
	}

	public async destruct(): Promise<void> {
		//
	}

	public async getVersion(): Promise<string> {
		return this.#transport.getVersion();
	}

	public async getPublicKey(path: string): Promise<string> {
		return this.#transport.getPublicKey(path);
	}

	public async signTransaction(path: string, hex: Buffer): Promise<string> {
		return this.#transport.signTransaction(path, hex);
	}

	public async signMessage(path: string, hex: Buffer): Promise<string> {
		return this.#transport.signMessage(path, hex);
	}
}
