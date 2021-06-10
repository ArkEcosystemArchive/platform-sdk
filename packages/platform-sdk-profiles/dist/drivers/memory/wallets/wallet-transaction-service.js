"use strict";
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
var _TransactionService_instances,
	_TransactionService_wallet,
	_TransactionService_signed,
	_TransactionService_broadcasted,
	_TransactionService_confirmed,
	_TransactionService_waitingForOurSignature,
	_TransactionService_waitingForOtherSignatures,
	_TransactionService_signTransaction,
	_TransactionService_assertHasValidIdentifier,
	_TransactionService_getPublicKey,
	_TransactionService_syncPendingMultiSignatures,
	_TransactionService_syncReadyMultiSignatures;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const uuid_1 = require("uuid");
const contracts_1 = require("../../../contracts");
const queue_1 = require("../../../helpers/queue");
class TransactionService {
	constructor(wallet) {
		_TransactionService_instances.add(this);
		/**
		 * The wallet that all transactions are signed with.
		 *
		 * @memberof TransactionService
		 */
		_TransactionService_wallet.set(this, void 0);
		/**
		 * The transactions that have been signed but not necessarily broadcasted.
		 *
		 * @memberof TransactionService
		 */
		_TransactionService_signed.set(this, {});
		/**
		 * The transactions that have been signed and broadcasted.
		 *
		 * @memberof TransactionService
		 */
		_TransactionService_broadcasted.set(this, {});
		/**
		 * The transactions that have been signed, broadcasted and confirmed.
		 *
		 * @memberof TransactionService
		 */
		_TransactionService_confirmed.set(this, {});
		/**
		 * The transactions that are waiting for the signatures of the wallet.
		 *
		 * @memberof TransactionService
		 */
		_TransactionService_waitingForOurSignature.set(this, {});
		/**
		 * The transactions that are waiting for the signatures of other participants.
		 *
		 * @memberof TransactionService
		 */
		_TransactionService_waitingForOtherSignatures.set(this, {});
		__classPrivateFieldSet(this, _TransactionService_wallet, wallet, "f");
		this.restore();
	}
	/** {@inheritDoc ITransactionService.sync} */
	async sync() {
		await queue_1.pqueueSettled([
			() =>
				__classPrivateFieldGet(
					this,
					_TransactionService_instances,
					"m",
					_TransactionService_syncPendingMultiSignatures,
				).call(this),
			() =>
				__classPrivateFieldGet(
					this,
					_TransactionService_instances,
					"m",
					_TransactionService_syncReadyMultiSignatures,
				).call(this),
		]);
	}
	/** {@inheritDoc ITransactionService.addSignature} */
	async addSignature(id, signatory) {
		__classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_assertHasValidIdentifier,
		).call(this, id);
		const transaction = await __classPrivateFieldGet(this, _TransactionService_wallet, "f")
			.coin()
			.multiSignature()
			.findById(id);
		const transactionWithSignature = await __classPrivateFieldGet(this, _TransactionService_wallet, "f")
			.coin()
			.transaction()
			.multiSign(transaction, { signatory });
		await __classPrivateFieldGet(this, _TransactionService_wallet, "f")
			.coin()
			.multiSignature()
			.broadcast(transactionWithSignature.data());
	}
	/** {@inheritDoc ITransactionService.signTransfer} */
	async signTransfer(input) {
		return __classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_signTransaction,
		).call(this, "transfer", input);
	}
	/** {@inheritDoc ITransactionService.signSecondSignature} */
	async signSecondSignature(input) {
		return __classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_signTransaction,
		).call(this, "secondSignature", input);
	}
	/** {@inheritDoc ITransactionService.signDelegateRegistration} */
	async signDelegateRegistration(input) {
		return __classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_signTransaction,
		).call(this, "delegateRegistration", input);
	}
	/** {@inheritDoc ITransactionService.signVote} */
	async signVote(input) {
		return __classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_signTransaction,
		).call(this, "vote", input);
	}
	/** {@inheritDoc ITransactionService.signMultiSignature} */
	async signMultiSignature(input) {
		return __classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_signTransaction,
		).call(this, "multiSignature", input);
	}
	/** {@inheritDoc ITransactionService.signIpfs} */
	async signIpfs(input) {
		return __classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_signTransaction,
		).call(this, "ipfs", input);
	}
	/** {@inheritDoc ITransactionService.signMultiPayment} */
	async signMultiPayment(input) {
		return __classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_signTransaction,
		).call(this, "multiPayment", input);
	}
	/** {@inheritDoc ITransactionService.signDelegateResignation} */
	async signDelegateResignation(input) {
		return __classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_signTransaction,
		).call(this, "delegateResignation", input);
	}
	/** {@inheritDoc ITransactionService.signHtlcLock} */
	async signHtlcLock(input) {
		return __classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_signTransaction,
		).call(this, "htlcLock", input);
	}
	/** {@inheritDoc ITransactionService.signHtlcClaim} */
	async signHtlcClaim(input) {
		return __classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_signTransaction,
		).call(this, "htlcClaim", input);
	}
	/** {@inheritDoc ITransactionService.signHtlcRefund} */
	async signHtlcRefund(input) {
		return __classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_signTransaction,
		).call(this, "htlcRefund", input);
	}
	/** {@inheritDoc ITransactionService.transaction} */
	transaction(id) {
		__classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_assertHasValidIdentifier,
		).call(this, id);
		if (this.hasBeenConfirmed(id)) {
			return __classPrivateFieldGet(this, _TransactionService_confirmed, "f")[id];
		}
		if (this.hasBeenBroadcasted(id)) {
			return __classPrivateFieldGet(this, _TransactionService_broadcasted, "f")[id];
		}
		if (this.hasBeenSigned(id)) {
			return __classPrivateFieldGet(this, _TransactionService_signed, "f")[id];
		}
		if (this.isAwaitingOurSignature(id)) {
			return __classPrivateFieldGet(this, _TransactionService_waitingForOurSignature, "f")[id];
		}
		if (this.isAwaitingOtherSignatures(id)) {
			return __classPrivateFieldGet(this, _TransactionService_waitingForOtherSignatures, "f")[id];
		}
		throw new Error(`Transaction [${id}] could not be found.`);
	}
	/** {@inheritDoc ITransactionService.pending} */
	pending() {
		return {
			...this.signed(),
			...this.broadcasted(),
			...this.waitingForOtherSignatures(),
			...this.waitingForOurSignature(),
		};
	}
	/** {@inheritDoc ITransactionService.signed} */
	signed() {
		return __classPrivateFieldGet(this, _TransactionService_signed, "f");
	}
	/** {@inheritDoc ITransactionService.broadcasted} */
	broadcasted() {
		return __classPrivateFieldGet(this, _TransactionService_broadcasted, "f");
	}
	/** {@inheritDoc ITransactionService.waitingForOurSignature} */
	waitingForOurSignature() {
		return __classPrivateFieldGet(this, _TransactionService_waitingForOurSignature, "f");
	}
	/** {@inheritDoc ITransactionService.waitingForOtherSignatures} */
	waitingForOtherSignatures() {
		return __classPrivateFieldGet(this, _TransactionService_waitingForOtherSignatures, "f");
	}
	/** {@inheritDoc ITransactionService.hasBeenSigned} */
	hasBeenSigned(id) {
		__classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_assertHasValidIdentifier,
		).call(this, id);
		return __classPrivateFieldGet(this, _TransactionService_signed, "f")[id] !== undefined;
	}
	/** {@inheritDoc ITransactionService.hasBeenBroadcasted} */
	hasBeenBroadcasted(id) {
		__classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_assertHasValidIdentifier,
		).call(this, id);
		return __classPrivateFieldGet(this, _TransactionService_broadcasted, "f")[id] !== undefined;
	}
	/** {@inheritDoc ITransactionService.hasBeenConfirmed} */
	hasBeenConfirmed(id) {
		__classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_assertHasValidIdentifier,
		).call(this, id);
		return __classPrivateFieldGet(this, _TransactionService_confirmed, "f")[id] !== undefined;
	}
	/** {@inheritDoc ITransactionService.isAwaitingConfirmation} */
	isAwaitingConfirmation(id) {
		__classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_assertHasValidIdentifier,
		).call(this, id);
		return __classPrivateFieldGet(this, _TransactionService_broadcasted, "f")[id] !== undefined;
	}
	/** {@inheritDoc ITransactionService.isAwaitingOurSignature} */
	isAwaitingOurSignature(id) {
		__classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_assertHasValidIdentifier,
		).call(this, id);
		return __classPrivateFieldGet(this, _TransactionService_waitingForOurSignature, "f")[id] !== undefined;
	}
	/** {@inheritDoc ITransactionService.isAwaitingOtherSignatures} */
	isAwaitingOtherSignatures(id) {
		__classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_assertHasValidIdentifier,
		).call(this, id);
		return __classPrivateFieldGet(this, _TransactionService_waitingForOtherSignatures, "f")[id] !== undefined;
	}
	/** {@inheritDoc ITransactionService.isAwaitingSignatureByPublicKey} */
	isAwaitingSignatureByPublicKey(id, publicKey) {
		__classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_assertHasValidIdentifier,
		).call(this, id);
		let transaction;
		if (__classPrivateFieldGet(this, _TransactionService_waitingForOurSignature, "f")[id]) {
			transaction = __classPrivateFieldGet(this, _TransactionService_waitingForOurSignature, "f")[id];
		}
		if (__classPrivateFieldGet(this, _TransactionService_waitingForOtherSignatures, "f")[id]) {
			transaction = __classPrivateFieldGet(this, _TransactionService_waitingForOtherSignatures, "f")[id];
		}
		if (transaction === undefined) {
			throw new Error(`Transaction [${id}] is not awaiting any signatures.`);
		}
		return __classPrivateFieldGet(this, _TransactionService_wallet, "f")
			.coin()
			.multiSignature()
			.needsWalletSignature(transaction, publicKey);
	}
	/** {@inheritDoc ITransactionService.canBeSigned} */
	canBeSigned(id) {
		__classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_assertHasValidIdentifier,
		).call(this, id);
		return __classPrivateFieldGet(this, _TransactionService_wallet, "f")
			.coin()
			.multiSignature()
			.needsWalletSignature(
				this.transaction(id),
				__classPrivateFieldGet(this, _TransactionService_instances, "m", _TransactionService_getPublicKey).call(
					this,
				),
			);
	}
	/** {@inheritDoc ITransactionService.canBeBroadcasted} */
	canBeBroadcasted(id) {
		__classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_assertHasValidIdentifier,
		).call(this, id);
		return __classPrivateFieldGet(this, _TransactionService_signed, "f")[id] !== undefined;
	}
	/** {@inheritDoc ITransactionService.broadcast} */
	async broadcast(id) {
		__classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_assertHasValidIdentifier,
		).call(this, id);
		const transaction = this.transaction(id);
		let result = {
			accepted: [],
			rejected: [],
			errors: {},
		};
		if (this.canBeBroadcasted(id)) {
			result = await __classPrivateFieldGet(this, _TransactionService_wallet, "f")
				.client()
				.broadcast([transaction]);
		} else if (transaction.isMultiSignature() || transaction.isMultiSignatureRegistration()) {
			result.accepted.push(
				await __classPrivateFieldGet(this, _TransactionService_wallet, "f")
					.coin()
					.multiSignature()
					.broadcast(transaction.data()),
			);
		}
		if (result.accepted.includes(transaction.id())) {
			__classPrivateFieldGet(this, _TransactionService_broadcasted, "f")[id] = __classPrivateFieldGet(
				this,
				_TransactionService_signed,
				"f",
			)[id];
		}
		return result;
	}
	/** {@inheritDoc ITransactionService.confirm} */
	async confirm(id) {
		__classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_assertHasValidIdentifier,
		).call(this, id);
		if (!this.isAwaitingConfirmation(id)) {
			throw new Error(`Transaction [${id}] is not awaiting confirmation.`);
		}
		try {
			const transactionLocal = this.transaction(id);
			const transaction = await __classPrivateFieldGet(this, _TransactionService_wallet, "f")
				.client()
				.transaction(transactionLocal.id());
			if (transaction.isConfirmed()) {
				delete __classPrivateFieldGet(this, _TransactionService_signed, "f")[id];
				delete __classPrivateFieldGet(this, _TransactionService_broadcasted, "f")[id];
				delete __classPrivateFieldGet(this, _TransactionService_waitingForOtherSignatures, "f")[id];
				delete __classPrivateFieldGet(this, _TransactionService_waitingForOurSignature, "f")[id];
				// We store the transaction here to be able to access it after it
				// has been confirmed. This list won't be persisted which means
				// it will be gone after a reboot of the consumer application.
				__classPrivateFieldGet(this, _TransactionService_confirmed, "f")[id] = transactionLocal;
			}
			return transaction.isConfirmed();
		} catch {
			return false;
		}
	}
	/** {@inheritDoc ITransactionService.fromPublicKey} */
	dump() {
		const dumpStorage = (storage, storageKey) => {
			const result = {};
			for (const [id, transaction] of Object.entries(storage)) {
				__classPrivateFieldGet(
					this,
					_TransactionService_instances,
					"m",
					_TransactionService_assertHasValidIdentifier,
				).call(this, id);
				result[id] = transaction;
			}
			__classPrivateFieldGet(this, _TransactionService_wallet, "f").data().set(storageKey, result);
		};
		dumpStorage(
			__classPrivateFieldGet(this, _TransactionService_signed, "f"),
			contracts_1.WalletData.SignedTransactions,
		);
		dumpStorage(
			__classPrivateFieldGet(this, _TransactionService_broadcasted, "f"),
			contracts_1.WalletData.BroadcastedTransactions,
		);
		dumpStorage(
			__classPrivateFieldGet(this, _TransactionService_waitingForOurSignature, "f"),
			contracts_1.WalletData.WaitingForOurSignatureTransactions,
		);
		dumpStorage(
			__classPrivateFieldGet(this, _TransactionService_waitingForOtherSignatures, "f"),
			contracts_1.WalletData.WaitingForOtherSignaturesTransactions,
		);
	}
	/** {@inheritDoc ITransactionService.fromPublicKey} */
	restore() {
		const restoreStorage = (storage, storageKey) => {
			const transactions =
				__classPrivateFieldGet(this, _TransactionService_wallet, "f").data().get(storageKey) || {};
			for (const [id, transaction] of Object.entries(transactions)) {
				__classPrivateFieldGet(
					this,
					_TransactionService_instances,
					"m",
					_TransactionService_assertHasValidIdentifier,
				).call(this, id);
				// @TODO: 3rd argument is optional
				storage[id] = __classPrivateFieldGet(this, _TransactionService_wallet, "f")
					.dataTransferObject()
					.signedTransaction(id, transaction, undefined);
			}
		};
		restoreStorage(
			__classPrivateFieldGet(this, _TransactionService_signed, "f"),
			contracts_1.WalletData.SignedTransactions,
		);
		restoreStorage(
			__classPrivateFieldGet(this, _TransactionService_broadcasted, "f"),
			contracts_1.WalletData.BroadcastedTransactions,
		);
		restoreStorage(
			__classPrivateFieldGet(this, _TransactionService_waitingForOurSignature, "f"),
			contracts_1.WalletData.WaitingForOurSignatureTransactions,
		);
		restoreStorage(
			__classPrivateFieldGet(this, _TransactionService_waitingForOtherSignatures, "f"),
			contracts_1.WalletData.WaitingForOtherSignaturesTransactions,
		);
	}
}
exports.TransactionService = TransactionService;
(_TransactionService_wallet = new WeakMap()),
	(_TransactionService_signed = new WeakMap()),
	(_TransactionService_broadcasted = new WeakMap()),
	(_TransactionService_confirmed = new WeakMap()),
	(_TransactionService_waitingForOurSignature = new WeakMap()),
	(_TransactionService_waitingForOtherSignatures = new WeakMap()),
	(_TransactionService_instances = new WeakSet()),
	(_TransactionService_signTransaction =
		/**
		 * Sign a transaction of the given type.
		 *
		 * @private
		 * @param {string} type
		 * @param {*} input
		 * @returns {Promise<string>}
		 * @memberof TransactionService
		 */
		async function _TransactionService_signTransaction(type, input) {
			const transaction = await __classPrivateFieldGet(this, _TransactionService_wallet, "f")
				.coin()
				.transaction()
				[type](input);
			const uuid = uuid_1.v4();
			// When we are working with Multi-Signatures we need to sign them in split through
			// broadcasting and fetching them multiple times until all participants have signed
			// the transaction. Once the transaction is fully signed we can mark it as finished.
			if (transaction.isMultiSignature() || transaction.isMultiSignatureRegistration()) {
				__classPrivateFieldGet(this, _TransactionService_waitingForOtherSignatures, "f")[uuid] = transaction;
			} else {
				__classPrivateFieldGet(this, _TransactionService_signed, "f")[uuid] = transaction;
			}
			return uuid;
		}),
	(_TransactionService_assertHasValidIdentifier = function _TransactionService_assertHasValidIdentifier(id) {
		if (id === undefined) {
			throw new Error("Encountered a malformed ID. This looks like a bug.");
		}
	}),
	(_TransactionService_getPublicKey = function _TransactionService_getPublicKey() {
		const publicKey = __classPrivateFieldGet(this, _TransactionService_wallet, "f").publicKey();
		/* istanbul ignore next */
		if (publicKey === undefined) {
			throw new Error(
				"This wallet is lacking a public key. Please sync the wallet before interacting with transactions.",
			);
		}
		return publicKey;
	}),
	(_TransactionService_syncPendingMultiSignatures = async function _TransactionService_syncPendingMultiSignatures() {
		const transactions = await __classPrivateFieldGet(this, _TransactionService_wallet, "f")
			.coin()
			.multiSignature()
			.allWithPendingState(
				__classPrivateFieldGet(this, _TransactionService_instances, "m", _TransactionService_getPublicKey).call(
					this,
				),
			);
		__classPrivateFieldSet(this, _TransactionService_waitingForOurSignature, {}, "f");
		__classPrivateFieldSet(this, _TransactionService_waitingForOtherSignatures, {}, "f");
		for (const transaction of transactions) {
			const transactionId = transaction.id;
			const signedTransaction = __classPrivateFieldGet(this, _TransactionService_wallet, "f")
				.coin()
				.dataTransferObject()
				.signedTransaction(transactionId, transaction, JSON.stringify(transaction));
			__classPrivateFieldGet(this, _TransactionService_waitingForOurSignature, "f")[
				transactionId
			] = signedTransaction;
			__classPrivateFieldGet(this, _TransactionService_waitingForOtherSignatures, "f")[
				transactionId
			] = signedTransaction;
			if (!this.canBeSigned(transactionId)) {
				delete __classPrivateFieldGet(this, _TransactionService_waitingForOurSignature, "f")[transactionId];
			}
		}
	}),
	(_TransactionService_syncReadyMultiSignatures = async function _TransactionService_syncReadyMultiSignatures() {
		const transactions = await __classPrivateFieldGet(this, _TransactionService_wallet, "f")
			.coin()
			.multiSignature()
			.allWithReadyState(
				__classPrivateFieldGet(this, _TransactionService_instances, "m", _TransactionService_getPublicKey).call(
					this,
				),
			);
		for (const transaction of transactions) {
			__classPrivateFieldGet(this, _TransactionService_signed, "f")[transaction.id] = __classPrivateFieldGet(
				this,
				_TransactionService_wallet,
				"f",
			)
				.coin()
				.dataTransferObject()
				.signedTransaction(transaction.id, transaction, JSON.stringify(transaction));
		}
	});
//# sourceMappingURL=wallet-transaction-service.js.map
