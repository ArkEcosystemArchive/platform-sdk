import { Coins, Services } from "@arkecosystem/platform-sdk";
import Stellar from "@ledgerhq/hw-app-str";

export class LedgerService extends Services.AbstractLedgerService {
	#ledger: Services.LedgerTransport;
	#transport!: Stellar;

	public static async __construct(config: Coins.ConfigRepository): Promise<LedgerService> {
		return new LedgerService();
	}

	public async connect(transport: Services.LedgerTransport): Promise<void> {
		this.#ledger = await transport.open();
		this.#transport = new Stellar(this.#ledger);
	}

	public async disconnect(): Promise<void> {
		await this.#ledger.close();
	}

	public async getVersion(): Promise<string> {
		const { version } = await this.#transport.getAppConfiguration();

		return version;
	}

	public async getPublicKey(path: string): Promise<string> {
		const { publicKey } = await this.#transport.getPublicKey(path, true, true);

		return publicKey;
	}

	public async signTransaction(path: string, payload: Buffer): Promise<string> {
		const { signature } = await this.#transport.signTransaction(path, payload);

		return signature.toString("hex");
	}
}
