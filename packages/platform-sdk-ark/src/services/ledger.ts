import { ARKTransport } from "@arkecosystem/ledger-transport";
import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { IdentityService } from "./identity";
import { ledger } from "../../test/fixtures/ledger";
import { ClientService } from "./client";

export class LedgerService implements Contracts.LedgerService {
	readonly #identity: IdentityService;
	readonly #client: ClientService;
	#ledger: Contracts.LedgerTransport;
	#transport!: ARKTransport;

	private constructor(identity: IdentityService, client: ClientService) {
		this.#identity = identity;
		this.#client = client;
	}

	public static async __construct(config: Coins.Config): Promise<LedgerService> {
		return new LedgerService(
			await IdentityService.__construct(config),
			await ClientService.__construct(config),
		);
	}

	public async __destruct(): Promise<void> {
		await this.disconnect();
	}

	public async connect(transport: Contracts.LedgerTransport): Promise<void> {
		this.#ledger = await transport.open();
		this.#transport = new ARKTransport(this.#ledger);
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

	public async getExtendedPublicKey(path: string): Promise<string> {
		return this.#transport.getExtPublicKey(path);
	}

	public async signTransaction(path: string, payload: Buffer): Promise<string> {
		return this.#transport.signTransactionWithSchnorr(path, payload);
	}

	public async signMessage(path: string, payload: Buffer): Promise<string> {
		return this.#transport.signMessageWithSchnorr(path, payload);
	}

	public async scan(path: string): Promise<Contracts.WalletData> {
		const publicKey = await this.getPublicKey(ledger.bip44.path);
		const address = await this.#identity.address().fromPublicKey(publicKey);
		const wallet = await this.#client.wallet(address);
		return wallet;
	}
}
