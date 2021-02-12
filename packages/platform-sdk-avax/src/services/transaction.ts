import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BN, Buffer } from "avalanche";
import { AVMAPI } from "avalanche/dist/apis/avm";
import { PlatformVMAPI } from "avalanche/dist/apis/platformvm";
import { v4 as uuidv4 } from "uuid";

import { SignedTransactionData } from "../dto";
import { keyPairFromMnemonic, useAvalanche, useXChain, useKeychain, usePChain } from "./helpers";

export class TransactionService implements Contracts.TransactionService {
	readonly #config: Coins.Config;
	readonly #xchain: AVMAPI;
	readonly #pchain: PlatformVMAPI;
	readonly #keychain;

	public constructor(config: Coins.Config) {
		this.#config = config;
		this.#xchain = useXChain(config);
		this.#pchain = usePChain(config);
		this.#keychain = useKeychain(config);
	}

	public static async __construct(config: Coins.Config): Promise<TransactionService> {
		return new TransactionService(config);
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async transfer(
		input: Contracts.TransferInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		if (input.sign.mnemonic === undefined) {
			throw new Exceptions.InvalidArguments(this.constructor.name, "transfer");
		}

		try {
			const keyPair = this.#keychain.importKey(
				keyPairFromMnemonic(this.#config, input.sign.mnemonic).getPrivateKey(),
			);
			const keyPairAddresses = this.#keychain.getAddressStrings();
			const { utxos } = await this.#xchain.getUTXOs(keyPair.getAddressString());

			const signedTx = (
				await this.#xchain.buildBaseTx(
					utxos,
					new BN(input.data.amount),
					this.#config.get("network.crypto.assetId"),
					[input.data.to],
					keyPairAddresses,
					keyPairAddresses,
					input.data.memo === undefined ? undefined : Buffer.from(input.data.memo),
				)
			).sign(this.#keychain);

			// @TODO: compute the ID and set raw data for UI purposes
			return new SignedTransactionData(uuidv4(), signedTx.toString(), signedTx.toString());
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async secondSignature(
		input: Contracts.SecondSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "secondSignature");
	}

	public async delegateRegistration(
		input: Contracts.DelegateRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegateRegistration");
	}

	public async vote(
		input: Contracts.VoteInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		if (input.sign.mnemonic === undefined) {
			throw new Exceptions.InvalidArguments(this.constructor.name, "vote");
		}

		try {
			const keyPair = this.#keychain.importKey(
				keyPairFromMnemonic(this.#config, input.sign.mnemonic).getPrivateKey(),
			);
			const keyPairAddresses = this.#keychain.getAddressStrings();
			const { utxos } = await this.#pchain.getUTXOs(keyPair.getAddressString());

			const signedTx = (
				await this.#pchain.buildAddDelegatorTx(
					utxos,
					input.data.votes, // @TODO: handle unvotes
					keyPairAddresses,
					keyPairAddresses,
					"NODE-ID",
					"START-TIME",
					"END-TIME",
					"STAKE-AMOUNT",
					["REWARD-ADDRESSES"],
					"REWARD-LOCKTIME",
					"REWARD-THRESHOLD",
				)
			).sign(this.#keychain);

			// @TODO: compute the ID and set raw data for UI purposes
			return new SignedTransactionData(uuidv4(), signedTx.toString(), signedTx.toString());
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async multiSignature(
		input: Contracts.MultiSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "multiSignature");
	}

	public async ipfs(
		input: Contracts.IpfsInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "ipfs");
	}

	public async multiPayment(
		input: Contracts.MultiPaymentInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "multiPayment");
	}

	public async delegateResignation(
		input: Contracts.DelegateResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegateResignation");
	}

	public async htlcLock(
		input: Contracts.HtlcLockInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcLock");
	}

	public async htlcClaim(
		input: Contracts.HtlcClaimInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcClaim");
	}

	public async htlcRefund(
		input: Contracts.HtlcRefundInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcRefund");
	}

	public async multiSign(
		transaction: Contracts.RawTransactionData,
		input: Contracts.TransactionInputs,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "multiSign");
	}

	public async estimateExpiration(value?: string): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "estimateExpiration");
	}
}
