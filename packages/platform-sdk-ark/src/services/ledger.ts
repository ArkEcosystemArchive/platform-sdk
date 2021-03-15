import { ARKTransport } from "@arkecosystem/ledger-transport";
import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { IdentityService } from "./identity";
import { ClientService } from "./client";
import { WalletDataCollection } from "@arkecosystem/platform-sdk/dist/coins";

export class LedgerService implements Contracts.LedgerService {
	readonly #config: Coins.Config;
	readonly #identity: IdentityService;
	readonly #client: ClientService;
	#ledger: Contracts.LedgerTransport;
	#transport!: ARKTransport;

	private constructor(config: Coins.Config, identity: IdentityService, client: ClientService) {
		this.#config = config;
		this.#identity = identity;
		this.#client = client;
	}

	public static async __construct(config: Coins.Config): Promise<LedgerService> {
		return new LedgerService(
			config,
			await IdentityService.__construct(config),
			await ClientService.__construct(config)
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

	public async scan(): Promise<Contracts.WalletData[]> {
		const pageSize: number = 5;
		let page: number = 0;
		let slip44 = this.#config.get<number>("network.crypto.slip44");

		let wallets: Contracts.WalletData[] = [];
		let collection: WalletDataCollection;
		do {
			const addresses: string[] = [];

			for (const index of createRange(page, pageSize)) {
				const path: string = formatLedgerDerivationPath({ coinType: slip44, account: index });
				const publicKey = await this.getPublicKey(path);
				addresses.push(await this.#identity.address().fromPublicKey(publicKey));
			}

			collection = await this.#client.wallets({ addresses: addresses });
			wallets = wallets.concat(collection.items());

			page++;
		} while (!collection.isEmpty());

		return wallets;
	}
}

const formatLedgerDerivationPath = (scheme: LedgerDerivationScheme) =>
	`${scheme.purpose || 44}'/${scheme.coinType}'/${scheme.account || 0}'/${scheme.change || 0}/${scheme.address || 0}`;

export type LedgerDerivationScheme = {
	coinType: number;
	purpose?: number;
	account?: number;
	change?: number;
	address?: number;
};

export const createRange = (start: number, size: number) => Array.from({ length: size }, (_, i) => i + size * start);
