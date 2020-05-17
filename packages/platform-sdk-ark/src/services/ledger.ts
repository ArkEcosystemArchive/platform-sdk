import { ARKTransport } from "@arkecosystem/ledger-transport";
import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import LedgerTransport from "@ledgerhq/hw-transport-node-hid-singleton";

export class LedgerService implements Contracts.LedgerService {
	readonly #ledger: LedgerTransport;
	readonly #transport: ARKTransport;

	private constructor(transport: Contracts.LedgerTransport) {
		this.#ledger = transport;
		this.#transport = new ARKTransport(transport);
	}

	public static async construct(config: Coins.Config): Promise<LedgerService> {
		return new LedgerService(config.get("services.ledger.transport") || LedgerTransport);
	}

	public async destruct(): Promise<void> {
		await this.disconnect();
	}

	public async connect(): Promise<void> {
		await this.#ledger.open();
	}

	public async disconnect(): Promise<void> {
		await this.#ledger.close();
	}

	public async connect(): Promise<void> {
		await this.#ledger.open();
	}

	public async disconnect(): Promise<void> {
		await this.#ledger.close();
	}

	public async getVersion(): Promise<string> {
		return this.#transport.getVersion();
	}

	public async getPublicKey(path: string): Promise<string> {
		return this.#transport.getPublicKey(path);
	}

	public async signTransaction(path: string, payload: Buffer): Promise<string> {
		return this.#transport.signTransaction(path, payload);
	}

	public async signTransactionWithSchnorr(path: string, payload: Buffer): Promise<string> {
		return this.#transport.signTransaction(path, payload);
	}

	public async signMessage(path: string, payload: Buffer): Promise<string> {
		return this.#transport.signMessage(path, payload);
	}

	public async signMessageWithSchnorr(path: string, payload: Buffer): Promise<string> {
		return this.#transport.signMessage(path, payload);
	}
}
