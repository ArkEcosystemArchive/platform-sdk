import { Coins, Contracts, Services } from "@arkecosystem/platform-sdk";
import { BIP44 } from "@arkecosystem/platform-sdk-crypto";
import { CommHandler, DposLedger, LedgerAccount, SupportedCoin } from "dpos-ledger-api";

import { WalletData } from "../dto";
import { ClientService } from "./client";
import { IdentityService } from "./identity";

const chunk = <T>(value: T[], size: number) =>
	Array.from({ length: Math.ceil(value.length / size) }, (v, i) => value.slice(i * size, i * size + size));

const createRange = (start: number, size: number) => Array.from({ length: size }, (_, i) => i + size * start);

export class LedgerService extends Services.AbstractLedgerService {
	readonly #config: Coins.Config;
	readonly #identity: Services.IdentityService;
	readonly #client: Services.ClientService;
	#ledger: Services.LedgerTransport;
	#transport!: DposLedger;

	private constructor(config: Coins.Config, identity: Services.IdentityService, client: Services.ClientService) {
		super();

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

	public async connect(transport: Services.LedgerTransport): Promise<void> {
		this.#ledger = await transport.open();
		this.#transport = new DposLedger(new CommHandler(this.#ledger));
	}

	public async disconnect(): Promise<void> {
		await this.#ledger.close();
	}

	public async getVersion(): Promise<string> {
		const { version } = await this.#transport.version();

		return version;
	}

	public async getPublicKey(path: string): Promise<string> {
		const { publicKey } = await this.getPublicKeyAndAddress(path);

		return publicKey;
	}

	public async signTransaction(path: string, payload: Buffer): Promise<string> {
		const signature: Buffer = await this.#transport.signTX(this.#getLedgerAccount(path), payload);

		return signature.toString("hex");
	}

	public async signMessage(path: string, payload: Buffer): Promise<string> {
		const signature: Buffer = await this.#transport.signMSG(this.#getLedgerAccount(path), payload);

		return signature.slice(0, 64).toString("hex");
	}

	// @TODO: send requests in parallel
	// @TODO: discover wallets until they 404
	public async scan(options?: { useLegacy: boolean; startPath?: string }): Promise<Services.LedgerWalletList> {
		const pageSize = 5;
		const page = 0;
		const slip44 = this.#config.get<number>("network.constants.slip44");

		const addressCache: Record<string, { address: string; publicKey: string }> = {};
		const wallets: Contracts.WalletData[] = [];

		const addresses: string[] = [];

		let initialAddressIndex = 0;

		if (options?.startPath) {
			initialAddressIndex = BIP44.parse(options.startPath).addressIndex + 1;
		}

		for (const addressIndexIterator of createRange(page, pageSize)) {
			const addressIndex = initialAddressIndex + addressIndexIterator;

			// @TODO: the dpos-ledger-api seems to operate purely on the account index and always forces an account index of 0
			const path = `m/44'/${slip44}'/${addressIndex}'/0/0`;
			const { publicKey, address } = await this.getPublicKeyAndAddress(path);
			console.log("path", path, "publicKey", publicKey, "address", address);
			addresses.push(address);

			addressCache[path] = { address, publicKey };
		}

		for (const address of addresses) {
			try {
				wallets.push(await this.#client.wallet(address));
			} catch {
				// Do nothing...
			}
		}

		// Create a mapping of paths and wallets that have been found.
		const cold: Services.LedgerWalletList = {};
		const used: Services.LedgerWalletList = {};

		for (const [path, { address, publicKey }] of Object.entries(addressCache)) {
			const matchingWallet: Contracts.WalletData | undefined = wallets.find(
				(wallet: Contracts.WalletData) => wallet.address() === address,
			);

			if (matchingWallet === undefined) {
				if (Object.keys(cold).length > 0) {
					continue;
				}

				cold[path] = new WalletData({
					address,
					publicKey,
					balance: 0,
				});
			} else {
				used[path] = matchingWallet;
			}
		}

		return { ...cold, ...used };
	}

	private async getPublicKeyAndAddress(
		path: string,
	): Promise<{
		publicKey: string;
		address: string;
	}> {
		return this.#transport.getPubKey(this.#getLedgerAccount(path));
	}

	#getLedgerAccount(path: string): LedgerAccount {
		return new LedgerAccount().coinIndex(SupportedCoin.LISK).account(BIP44.parse(path).account);
	}
}
