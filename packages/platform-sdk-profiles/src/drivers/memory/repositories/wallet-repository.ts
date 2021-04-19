import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { sortBy, sortByDesc } from "@arkecosystem/utils";
import retry from "p-retry";
import { v4 as uuidv4 } from "uuid";

import { Wallet } from "../wallets/wallet";
import { WalletFactory } from "../wallets/wallet.factory";
import { DataRepository } from "../../../repositories/data-repository";
import {
	IDataRepository,
	IReadWriteWallet,
	IWalletFactory,
	IWalletRepository,
	IWalletExportOptions,
	IWalletStruct,
} from "../../../contracts";
import { injectable } from "inversify";
import { pqueue } from "../../../helpers";
import { State } from "../../../environment/state";

@injectable()
export class WalletRepository implements IWalletRepository {
	readonly #data: IDataRepository = new DataRepository();
	readonly #wallets: IWalletFactory = new WalletFactory();
	#dataRaw: Record<string, any> = {};

	public all(): Record<string, IReadWriteWallet> {
		return this.#data.all() as Record<string, IReadWriteWallet>;
	}

	public first(): IReadWriteWallet {
		return this.#data.first();
	}

	public last(): IReadWriteWallet {
		return this.#data.last();
	}

	public allByCoin(): Record<string, Record<string, IReadWriteWallet>> {
		const result = {};

		for (const [id, wallet] of Object.entries(this.all())) {
			const coin: string = wallet.currency();

			if (!result[coin]) {
				result[coin] = {};
			}

			result[coin][id] = wallet;
		}

		return result;
	}

	public keys(): string[] {
		return this.#data.keys();
	}

	public values(): IReadWriteWallet[] {
		return this.#data.values();
	}

	public async importByMnemonic(mnemonic: string, coin: string, network: string): Promise<IReadWriteWallet> {
		return this.storeWallet(await this.#wallets.fromMnemonic({ coin, network, mnemonic }));
	}

	public async importByAddress(address: string, coin: string, network: string): Promise<IReadWriteWallet> {
		return this.storeWallet(await this.#wallets.fromAddress({ coin, network, address }));
	}

	public async importByAddressList(addresses: string[], coin: string, network: string): Promise<IReadWriteWallet[]> {
		const createWallet = async (
			coin: string,
			network: string,
			address: string,
			wallets: IReadWriteWallet[],
		): Promise<void> => {
			const instance: IReadWriteWallet = new Wallet(uuidv4(), {});
			await instance.setCoin(coin, network);
			await instance.setAddress(address);

			wallets.push(instance);
		};

		// Make sure we have an instance of the coin
		const service = State.profile().coins().push(coin, network);

		// Bulk request the addresses.
		const wallets: IReadWriteWallet[] = [];

		let hasMore = true;
		let lastResponse: Coins.WalletDataCollection | undefined;
		while (hasMore) {
			if (lastResponse) {
				lastResponse = await service
					.client()
					.wallets({ addresses: addresses, cursor: lastResponse.nextPage() });
			} else {
				lastResponse = await service.client().wallets({ addresses: addresses });
			}

			await Promise.all(
				lastResponse
					.items()
					.map((wallet: Contracts.WalletData) => createWallet(coin, network, wallet.address(), wallets)),
			);

			hasMore = lastResponse.hasMorePages();
		}

		return wallets;
	}

	public async importByAddressWithLedgerPath(
		address: string,
		coin: string,
		network: string,
		path: string,
	): Promise<IReadWriteWallet> {
		return this.storeWallet(await this.#wallets.fromAddressWithLedgerPath({ coin, network, address, path }));
	}

	public async importByMnemonicWithEncryption(
		mnemonic: string,
		coin: string,
		network: string,
		password: string,
	): Promise<IReadWriteWallet> {
		return this.storeWallet(await this.#wallets.fromMnemonicWithEncryption({ coin, network, mnemonic, password }));
	}

	public async importByPublicKey(coin: string, network: string, publicKey: string): Promise<IReadWriteWallet> {
		return this.storeWallet(await this.#wallets.fromPublicKey({ coin, network, publicKey }));
	}

	public async importByPrivateKey(coin: string, network: string, privateKey: string): Promise<IReadWriteWallet> {
		return this.storeWallet(await this.#wallets.fromPrivateKey({ coin, network, privateKey }));
	}

	public async importByWIF({
		coin,
		network,
		wif,
	}: {
		coin: string;
		network: string;
		wif: string;
	}): Promise<IReadWriteWallet> {
		return this.storeWallet(await this.#wallets.fromWIF({ coin, network, wif }));
	}

	public async importByWIFWithEncryption({
		coin,
		network,
		wif,
		password,
	}: {
		coin: string;
		network: string;
		wif: string;
		password: string;
	}): Promise<IReadWriteWallet> {
		return this.storeWallet(await this.#wallets.fromWIFWithEncryption({ coin, network, wif, password }));
	}

	public async generate(coin: string, network: string, locale?: string): Promise<{ mnemonic: string; wallet: IReadWriteWallet }> {
		const mnemonic: string = BIP39.generate(locale);

		return { mnemonic, wallet: await this.importByMnemonic(mnemonic, coin, network) };
	}

	public findById(id: string): IReadWriteWallet {
		const wallet: IReadWriteWallet | undefined = this.#data.get(id);

		if (!wallet) {
			throw new Error(`Failed to find a wallet for [${id}].`);
		}

		return wallet;
	}

	public findByAddress(address: string): IReadWriteWallet | undefined {
		return this.values().find((wallet: IReadWriteWallet) => wallet.address() === address);
	}

	public findByPublicKey(publicKey: string): IReadWriteWallet | undefined {
		return this.values().find((wallet: IReadWriteWallet) => wallet.publicKey() === publicKey);
	}

	public findByCoin(coin: string): IReadWriteWallet[] {
		return this.values().filter(
			(wallet: IReadWriteWallet) => wallet.coin().manifest().get<string>("name") === coin,
		);
	}

	public findByCoinWithNetwork(coin: string, network: string): IReadWriteWallet[] {
		return this.values().filter(
			(wallet: IReadWriteWallet) => wallet.coinId() === coin && wallet.networkId() === network,
		);
	}

	public findByAlias(alias: string): IReadWriteWallet | undefined {
		return this.values().find(
			(wallet: IReadWriteWallet) => (wallet.alias() || "").toLowerCase() === alias.toLowerCase(),
		);
	}

	public update(id: string, data: { alias?: string }): void {
		const result = this.findById(id);

		if (data.alias) {
			const wallets: IReadWriteWallet[] = this.values();

			for (const wallet of wallets) {
				if (wallet.id() === id || !wallet.alias()) {
					continue;
				}

				if (wallet.alias()!.toLowerCase() === data.alias.toLowerCase()) {
					throw new Error(`The wallet with alias [${data.alias}] already exists.`);
				}
			}

			result.setAlias(data.alias);
		}

		this.#data.set(id, result);
	}

	public has(id: string): boolean {
		return this.#data.has(id);
	}

	public forget(id: string): void {
		this.#data.forget(id);
	}

	public flush(): void {
		this.#data.flush();
	}

	public count(): number {
		return this.keys().length;
	}

	public toObject(
		options: IWalletExportOptions = {
			excludeEmptyWallets: false,
			excludeLedgerWallets: false,
			addNetworkInformation: true,
		},
	): Record<string, IWalletStruct> {
		if (!options.addNetworkInformation) {
			throw Error("This is not implemented yet");
		}

		const result: Record<string, IWalletStruct> = {};

		for (const [id, wallet] of Object.entries(this.#data.all())) {
			if (options.excludeLedgerWallets && wallet.isLedger()) {
				continue;
			}
			if (options.excludeEmptyWallets && wallet.balance().isZero()) {
				continue;
			}
			result[id] = wallet.toObject();
		}

		return result;
	}

	public sortBy(column: string, direction: "asc" | "desc" = "asc"): IReadWriteWallet[] {
		// TODO: sort by balance as fiat (BigInt)

		const sortFunction = (wallet: IReadWriteWallet) => {
			if (column === "coin") {
				return wallet.currency();
			}

			if (column === "type") {
				return wallet.isStarred();
			}

			if (column === "balance") {
				return wallet.balance().toFixed();
			}

			return wallet[column]();
		};

		if (direction === "asc") {
			return sortBy(this.values(), sortFunction);
		}

		return sortByDesc(this.values(), sortFunction);
	}
	/**
	 * Restore wallets without syncing them.
	 *
	 * @param {Record<string, IWalletStruct>} struct
	 * @returns {Promise<void>}
	 * @memberof WalletRepository
	 */
	public async fill(struct: Record<string, IWalletStruct>): Promise<void> {
		this.#dataRaw = struct;

		for (const item of Object.values(struct)) {
			const { id, coin, network, address, data, settings } = item;

			const wallet = new Wallet(id, item);

			wallet.data().fill(data);

			wallet.settings().fill(settings);

			await wallet.setCoin(coin!, network, { sync: false });

			await wallet.setAddress(address, { syncIdentity: false, validate: false });

			wallet.markAsPartiallyRestored();

			this.storeWallet(wallet, { force: wallet.hasBeenPartiallyRestored() });
		}
	}

	/**
	 * Synchronise each wallet by sending network requests to gather data.
	 *
	 * One wallet of each network is pre-synced to avoid duplicate
	 * requests for subsequent imports to save bandwidth and time.
	 *
	 * @private
	 * @param {object} wallets
	 * @returns {Promise<void>}
	 * @memberof Profile
	 */
	public async restore(): Promise<void> {
		const syncWallets = (wallets: object): Promise<IReadWriteWallet[]> =>
			pqueue([...Object.values(wallets)].map((wallet) => () => this.restoreWallet(wallet)));

		const earlyWallets: Record<string, object> = {};
		const laterWallets: Record<string, object> = {};

		for (const [id, wallet] of Object.entries(this.#dataRaw) as any) {
			const nid: string = wallet.network;

			if (earlyWallets[nid] === undefined) {
				earlyWallets[nid] = wallet;
			} else {
				laterWallets[id] = wallet;
			}
		}

		// These wallets will be synced first so that we have cached coin instances for consecutive sync operations.
		// This will help with coins like ARK to prevent multiple requests for configuration and syncing operations.
		await syncWallets(earlyWallets);

		// These wallets will be synced last because they can reuse already existing coin instances from the warmup wallets
		// to avoid duplicate requests which elongate the waiting time for a user before the wallet is accessible and ready.
		await syncWallets(laterWallets);
	}

	/**
	 * Fully restore the given wallet if it has been partially restored before.
	 *
	 * @private
	 * @param {*} { id, address, coin, network, networkConfig }
	 * @returns {Promise<void>}
	 * @memberof WalletRepository
	 */
	private async restoreWallet({ id, address, coin, network, networkConfig }): Promise<void> {
		const previousWallet: IReadWriteWallet = this.findById(id);

		if (previousWallet.hasBeenPartiallyRestored()) {
			try {
				await this.syncWalletWithNetwork({ address, coin, network, networkConfig, wallet: previousWallet });
			} catch {
				// If we end up here the wallet had previously been
				// partially restored but we again failed to fully
				// restore it which means the has to consumer try again.
			}
		}
	}

	/**
	 * Store a new wallet instance using its unique ID.
	 *
	 * @private
	 * @param {IReadWriteWallet} wallet
	 * @param {{ force: boolean }} [options={ force: false }]
	 * @returns {IReadWriteWallet}
	 * @memberof WalletRepository
	 */
	private storeWallet(wallet: IReadWriteWallet, options: { force: boolean } = { force: false }): IReadWriteWallet {
		if (!options.force) {
			if (this.findByAddress(wallet.address())) {
				throw new Error(`The wallet [${wallet.address()}] already exists.`);
			}
		}

		this.#data.set(wallet.id(), wallet);

		return wallet;
	}

	private async syncWalletWithNetwork({
		address,
		coin,
		network,
		networkConfig,
		wallet,
	}: {
		wallet: IReadWriteWallet;
		coin: string;
		network: string;
		address: string;
		networkConfig: any;
	}): Promise<void> {
		await retry(
			async () => {
				await wallet.setCoin(coin, network);

				await wallet.setAddress(address);

				if (networkConfig) {
					for (const [key, value] of Object.entries(networkConfig)) {
						wallet.coin().config().set(`network.${key}`, value);
					}
				}
			},
			{
				onFailedAttempt: (error) =>
					console.log(
						`Attempt #${error.attemptNumber} to restore [${address}] failed. There are ${error.retriesLeft} retries left.`,
					),
				retries: 3,
			},
		);
	}
}
