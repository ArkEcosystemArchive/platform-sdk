import { Coins, Contracts, Services } from "@arkecosystem/platform-sdk";
import Tron from "@ledgerhq/hw-app-trx";

export class LedgerService extends Services.AbstractLedgerService {
	#ledger: Contracts.LedgerTransport;
	#transport!: Tron;

	public static async __construct(config: Coins.Config): Promise<LedgerService> {
		return new LedgerService();
	}

	public async connect(transport: Contracts.LedgerTransport): Promise<void> {
		this.#ledger = await transport.open();
		this.#transport = new Tron(this.#ledger);
	}

	public async disconnect(): Promise<void> {
		await this.#ledger.close();
	}

	public async getVersion(): Promise<string> {
		const { version } = await this.#transport.getAppConfiguration();

		return version;
	}

	public async getPublicKey(path: string): Promise<string> {
		const { publicKey } = await this.#transport.getAddress(path);

		return publicKey;
	}

	public async signTransaction(path: string, payload: Buffer): Promise<string> {
		return this.#transport.signTransaction(path, payload);
	}
}
