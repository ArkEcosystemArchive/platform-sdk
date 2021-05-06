import { sortBy, sortByDesc } from "@arkecosystem/utils";
import retry from "p-retry";

import { Wallet } from "../wallets/wallet";
import { DataRepository } from "../../../repositories/data-repository";
import {
	IDataRepository,
	IReadWriteWallet,
	IWalletRepository,
	IWalletExportOptions,
	IWalletData,
	IProfile,
} from "../../../contracts";
import { injectable } from "inversify";
import { pqueue } from "../../../helpers";
import { emitProfileChanged } from "../helpers";

@injectable()
export class WalletRepository implements IWalletRepository {
	readonly #profile: IProfile;
	readonly #data: IDataRepository = new DataRepository();
	#dataRaw: Record<string, any> = {};

	public constructor(profile: IProfile) {
		this.#profile = profile;
	}

	/** {@inheritDoc IWalletRepository.all} */
	public all(): Record<string, IReadWriteWallet> {
		return this.#data.all() as Record<string, IReadWriteWallet>;
	}

	/** {@inheritDoc IWalletRepository.first} */
	public first(): IReadWriteWallet {
		return this.#data.first();
	}

	/** {@inheritDoc IWalletRepository.last} */
	public last(): IReadWriteWallet {
		return this.#data.last();
	}

	/** {@inheritDoc IWalletRepository.allByCoin} */
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

	/** {@inheritDoc IWalletRepository.keys} */
	public keys(): string[] {
		return this.#data.keys();
	}

	/** {@inheritDoc IWalletRepository.values} */
	public values(): IReadWriteWallet[] {
		return this.#data.values();
	}

	/** {@inheritDoc IWalletRepository.findById} */
	public findById(id: string): IReadWriteWallet {
		const wallet: IReadWriteWallet | undefined = this.#data.get(id);

		if (!wallet) {
			throw new Error(`Failed to find a wallet for [${id}].`);
		}

		return wallet;
	}

	/** {@inheritDoc IWalletRepository.findByAddress} */
	public findByAddress(address: string): IReadWriteWallet | undefined {
		return this.values().find((wallet: IReadWriteWallet) => wallet.address() === address);
	}

	/** {@inheritDoc IWalletRepository.findByPublicKey} */
	public findByPublicKey(publicKey: string): IReadWriteWallet | undefined {
		return this.values().find((wallet: IReadWriteWallet) => wallet.publicKey() === publicKey);
	}

	/** {@inheritDoc IWalletRepository.findByCoin} */
	public findByCoin(coin: string): IReadWriteWallet[] {
		return this.values().filter(
			(wallet: IReadWriteWallet) => wallet.coin().manifest().get<string>("name") === coin,
		);
	}

	/** {@inheritDoc IWalletRepository.findByCoinWithNetwork} */
	public findByCoinWithNetwork(coin: string, network: string): IReadWriteWallet[] {
		return this.values().filter(
			(wallet: IReadWriteWallet) => wallet.coinId() === coin && wallet.networkId() === network,
		);
	}

	/** {@inheritDoc IWalletRepository.findByAlias} */
	public findByAlias(alias: string): IReadWriteWallet | undefined {
		return this.values().find(
			(wallet: IReadWriteWallet) => (wallet.alias() || "").toLowerCase() === alias.toLowerCase(),
		);
	}

	/** {@inheritDoc IWalletRepository.push} */
	public push(wallet: IReadWriteWallet, options: { force: boolean } = { force: false }): IReadWriteWallet {
		if (!options.force) {
			if (this.findByAddress(wallet.address())) {
				throw new Error(`The wallet [${wallet.address()}] already exists.`);
			}
		}

		this.#data.set(wallet.id(), wallet);

		emitProfileChanged(this.#profile);

		return wallet;
	}

	/** {@inheritDoc IWalletRepository.update} */
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

			result.mutator().alias(data.alias);
		}

		this.#data.set(id, result);

		emitProfileChanged(this.#profile);
	}

	/** {@inheritDoc IWalletRepository.has} */
	public has(id: string): boolean {
		return this.#data.has(id);
	}

	/** {@inheritDoc IWalletRepository.forget} */
	public forget(id: string): void {
		this.#data.forget(id);

		emitProfileChanged(this.#profile);
	}

	/** {@inheritDoc IWalletRepository.flush} */
	public flush(): void {
		this.#data.flush();

		emitProfileChanged(this.#profile);
	}

	/** {@inheritDoc IWalletRepository.count} */
	public count(): number {
		return this.keys().length;
	}

	/** {@inheritDoc IWalletRepository.toObject} */
	public toObject(
		options: IWalletExportOptions = {
			excludeEmptyWallets: false,
			excludeLedgerWallets: false,
			addNetworkInformation: true,
		},
	): Record<string, IWalletData> {
		if (!options.addNetworkInformation) {
			throw Error("This is not implemented yet");
		}

		const result: Record<string, IWalletData> = {};

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

	/** {@inheritDoc IWalletRepository.sortBy} */
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

	/** {@inheritDoc IWalletRepository.fill} */
	public async fill(struct: Record<string, IWalletData>): Promise<void> {
		this.#dataRaw = struct;

		for (const item of Object.values(struct)) {
			const { id, coin, network, address, data, settings } = item;

			const wallet = new Wallet(id, item, this.#profile);

			wallet.data().fill(data);

			wallet.settings().fill(settings);

			await wallet.mutator().coin(coin!, network, { sync: false });

			await wallet.mutator().address(address, { syncIdentity: false, validate: false });

			wallet.markAsPartiallyRestored();

			this.push(wallet, { force: wallet.hasBeenPartiallyRestored() });
		}
	}

	/** {@inheritDoc IWalletRepository.restore} */
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
				await wallet.mutator().coin(coin, network);

				await wallet.mutator().address(address);

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
