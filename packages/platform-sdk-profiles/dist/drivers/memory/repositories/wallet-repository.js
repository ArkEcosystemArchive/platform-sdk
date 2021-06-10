"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (decorators, target, key, desc) {
		var c = arguments.length,
			r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
			d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
			r = Reflect.decorate(decorators, target, key, desc);
		else
			for (var i = decorators.length - 1; i >= 0; i--)
				if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
var __metadata =
	(this && this.__metadata) ||
	function (k, v) {
		if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
var __classPrivateFieldSet =
	(this && this.__classPrivateFieldSet) ||
	function (receiver, state, value, kind, f) {
		if (kind === "m") throw new TypeError("Private method is not writable");
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot write private member to an object whose class did not declare it");
		return kind === "a" ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value;
	};
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
var _WalletRepository_instances,
	_WalletRepository_profile,
	_WalletRepository_data,
	_WalletRepository_dataRaw,
	_WalletRepository_restoreWallet,
	_WalletRepository_syncWalletWithNetwork;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletRepository = void 0;
const utils_1 = require("@arkecosystem/utils");
const p_retry_1 = __importDefault(require("p-retry"));
const wallet_1 = require("../wallets/wallet");
const data_repository_1 = require("../../../repositories/data-repository");
const contracts_1 = require("../../../contracts");
const inversify_1 = require("inversify");
const helpers_1 = require("../../../helpers");
let WalletRepository = class WalletRepository {
	constructor(profile) {
		_WalletRepository_instances.add(this);
		_WalletRepository_profile.set(this, void 0);
		_WalletRepository_data.set(this, new data_repository_1.DataRepository());
		_WalletRepository_dataRaw.set(this, {});
		__classPrivateFieldSet(this, _WalletRepository_profile, profile, "f");
	}
	/** {@inheritDoc IWalletRepository.all} */
	all() {
		return __classPrivateFieldGet(this, _WalletRepository_data, "f").all();
	}
	/** {@inheritDoc IWalletRepository.first} */
	first() {
		return __classPrivateFieldGet(this, _WalletRepository_data, "f").first();
	}
	/** {@inheritDoc IWalletRepository.last} */
	last() {
		return __classPrivateFieldGet(this, _WalletRepository_data, "f").last();
	}
	/** {@inheritDoc IWalletRepository.allByCoin} */
	allByCoin() {
		const result = {};
		for (const [id, wallet] of Object.entries(this.all())) {
			const coin = wallet.currency();
			if (!result[coin]) {
				result[coin] = {};
			}
			result[coin][id] = wallet;
		}
		return result;
	}
	/** {@inheritDoc IWalletRepository.keys} */
	keys() {
		return __classPrivateFieldGet(this, _WalletRepository_data, "f").keys();
	}
	/** {@inheritDoc IWalletRepository.values} */
	values() {
		return __classPrivateFieldGet(this, _WalletRepository_data, "f").values();
	}
	/** {@inheritDoc IWalletRepository.findById} */
	findById(id) {
		const wallet = __classPrivateFieldGet(this, _WalletRepository_data, "f").get(id);
		if (!wallet) {
			throw new Error(`Failed to find a wallet for [${id}].`);
		}
		return wallet;
	}
	/** {@inheritDoc IWalletRepository.findByAddress} */
	findByAddress(address) {
		return this.values().find((wallet) => wallet.address() === address);
	}
	/** {@inheritDoc IWalletRepository.findByPublicKey} */
	findByPublicKey(publicKey) {
		return this.values().find((wallet) => wallet.publicKey() === publicKey);
	}
	/** {@inheritDoc IWalletRepository.findByCoin} */
	findByCoin(coin) {
		return this.values().filter((wallet) => wallet.coin().manifest().get("name") === coin);
	}
	/** {@inheritDoc IWalletRepository.findByCoinWithNetwork} */
	findByCoinWithNetwork(coin, network) {
		return this.values().filter((wallet) => wallet.coinId() === coin && wallet.networkId() === network);
	}
	/** {@inheritDoc IWalletRepository.findByAlias} */
	findByAlias(alias) {
		return this.values().find((wallet) => (wallet.alias() || "").toLowerCase() === alias.toLowerCase());
	}
	/** {@inheritDoc IWalletRepository.push} */
	push(wallet, options = { force: false }) {
		if (!options.force) {
			if (this.findByAddress(wallet.address())) {
				throw new Error(`The wallet [${wallet.address()}] already exists.`);
			}
		}
		__classPrivateFieldGet(this, _WalletRepository_data, "f").set(wallet.id(), wallet);
		__classPrivateFieldGet(this, _WalletRepository_profile, "f").status().markAsDirty();
		return wallet;
	}
	/** {@inheritDoc IWalletRepository.update} */
	update(id, data) {
		const result = this.findById(id);
		if (data.alias) {
			const wallets = this.values();
			for (const wallet of wallets) {
				if (wallet.id() === id || !wallet.alias()) {
					continue;
				}
				if (wallet.alias().toLowerCase() === data.alias.toLowerCase()) {
					throw new Error(`The wallet with alias [${data.alias}] already exists.`);
				}
			}
			result.mutator().alias(data.alias);
		}
		__classPrivateFieldGet(this, _WalletRepository_data, "f").set(id, result);
		__classPrivateFieldGet(this, _WalletRepository_profile, "f").status().markAsDirty();
	}
	/** {@inheritDoc IWalletRepository.has} */
	has(id) {
		return __classPrivateFieldGet(this, _WalletRepository_data, "f").has(id);
	}
	/** {@inheritDoc IWalletRepository.forget} */
	forget(id) {
		__classPrivateFieldGet(this, _WalletRepository_data, "f").forget(id);
		__classPrivateFieldGet(this, _WalletRepository_profile, "f").status().markAsDirty();
	}
	/** {@inheritDoc IWalletRepository.flush} */
	flush() {
		__classPrivateFieldGet(this, _WalletRepository_data, "f").flush();
		__classPrivateFieldGet(this, _WalletRepository_profile, "f").status().markAsDirty();
	}
	/** {@inheritDoc IWalletRepository.count} */
	count() {
		return this.keys().length;
	}
	/** {@inheritDoc IWalletRepository.toObject} */
	toObject(
		options = {
			excludeEmptyWallets: false,
			excludeLedgerWallets: false,
			addNetworkInformation: true,
		},
	) {
		if (!options.addNetworkInformation) {
			throw Error("This is not implemented yet");
		}
		const result = {};
		for (const [id, wallet] of Object.entries(__classPrivateFieldGet(this, _WalletRepository_data, "f").all())) {
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
	sortBy(column, direction = "asc") {
		// TODO: sort by balance as fiat (BigInt)
		const sortFunction = (wallet) => {
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
			return utils_1.sortBy(this.values(), sortFunction);
		}
		return utils_1.sortByDesc(this.values(), sortFunction);
	}
	/** {@inheritDoc IWalletRepository.fill} */
	async fill(struct) {
		__classPrivateFieldSet(this, _WalletRepository_dataRaw, struct, "f");
		for (const item of Object.values(struct)) {
			const { id, data, settings } = item;
			const wallet = new wallet_1.Wallet(id, item, __classPrivateFieldGet(this, _WalletRepository_profile, "f"));
			wallet.data().fill(data);
			wallet.settings().fill(settings);
			await wallet
				.mutator()
				.coin(
					wallet.data().get(contracts_1.WalletData.Coin),
					wallet.data().get(contracts_1.WalletData.Network),
					{
						sync: false,
					},
				);
			await wallet
				.mutator()
				.address(
					{ address: wallet.data().get(contracts_1.WalletData.Address) },
					{ syncIdentity: false, validate: false },
				);
			wallet.markAsPartiallyRestored();
			this.push(wallet, { force: wallet.hasBeenPartiallyRestored() });
		}
	}
	/** {@inheritDoc IWalletRepository.restore} */
	async restore() {
		const syncWallets = (wallets) =>
			helpers_1.pqueue(
				[...Object.values(wallets)].map((wallet) => () =>
					__classPrivateFieldGet(
						this,
						_WalletRepository_instances,
						"m",
						_WalletRepository_restoreWallet,
					).call(this, wallet),
				),
			);
		const earlyWallets = {};
		const laterWallets = {};
		for (const [id, wallet] of Object.entries(__classPrivateFieldGet(this, _WalletRepository_dataRaw, "f"))) {
			const nid = wallet.network;
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
};
(_WalletRepository_profile = new WeakMap()),
	(_WalletRepository_data = new WeakMap()),
	(_WalletRepository_dataRaw = new WeakMap()),
	(_WalletRepository_instances = new WeakSet()),
	(_WalletRepository_restoreWallet = async function _WalletRepository_restoreWallet({ id, data }) {
		const previousWallet = this.findById(id);
		if (previousWallet.hasBeenPartiallyRestored()) {
			try {
				await __classPrivateFieldGet(
					this,
					_WalletRepository_instances,
					"m",
					_WalletRepository_syncWalletWithNetwork,
				).call(this, {
					coin: data[contracts_1.WalletData.Coin],
					network: data[contracts_1.WalletData.Network],
					address: data[contracts_1.WalletData.Address],
					wallet: previousWallet,
				});
			} catch {
				// If we end up here the wallet had previously been
				// partially restored but we again failed to fully
				// restore it which means the has to consumer try again.
			}
		}
	}),
	(_WalletRepository_syncWalletWithNetwork = async function _WalletRepository_syncWalletWithNetwork({
		address,
		coin,
		network,
		wallet,
	}) {
		await p_retry_1.default(
			async () => {
				await wallet.mutator().coin(coin, network);
				await wallet.mutator().address({ address });
			},
			{
				onFailedAttempt: (error) =>
					/* istanbul ignore next */
					console.log(
						`Attempt #${error.attemptNumber} to restore [${address}] failed. There are ${error.retriesLeft} retries left.`,
					),
				retries: 3,
			},
		);
	});
WalletRepository = __decorate([inversify_1.injectable(), __metadata("design:paramtypes", [Object])], WalletRepository);
exports.WalletRepository = WalletRepository;
//# sourceMappingURL=wallet-repository.js.map
