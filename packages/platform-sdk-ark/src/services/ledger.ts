import { ARKTransport } from "@arkecosystem/ledger-transport";
import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { HDKey } from "@arkecosystem/platform-sdk-crypto";

import { ClientService } from "./client";
import { IdentityService } from "./identity";

const chunk = <T>(value: T[], size: number) =>
	Array.from({ length: Math.ceil(value.length / size) }, (v, i) => value.slice(i * size, i * size + size));

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

	public async scan(options: { useLegacy: boolean } = { useLegacy: false }): Promise<Contracts.WalletData[]> {
		const pageSize = 5;
		let page = 0;
		const slip44 = this.#config.get<number>("network.crypto.slip44");

		let wallets: Contracts.WalletData[] = [];
		let collection: Coins.WalletDataCollection;
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

		// NEW BIP44 COMPLIANT
		// for (let accountIndex = 0; accountIndex < 5; accountIndex++) {
		// 	const compressedPublicKey = await this.getExtendedPublicKey(`m/44'/${slip44}'/${accountIndex}'`);

		// 	for (let addressIndex = 0; addressIndex < 50; addressIndex++) {
		// 		const path = `44'/${slip44}'/${accountIndex}'/0/${addressIndex}`;
		// 		const extendedKey = HDKey.fromCompressedPublicKey(compressedPublicKey).derive(`m/0/${addressIndex}`).publicKey.toString("hex");
		// 		const extendedAddress = await this.#identity.address().fromPublicKey(extendedKey);

		// 		addressMap[extendedAddress] = { path, extendedKey };
		// 	}
		// }

		// await Promise.all(chunk(Object.keys(addressMap), 50).map((addresses: string[]) => this.#client.wallets({ addresses })));

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
