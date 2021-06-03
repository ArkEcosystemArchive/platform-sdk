import { Coins, Contracts, Exceptions, Helpers, Services } from "@arkecosystem/platform-sdk";
import { Hash } from "@arkecosystem/platform-sdk-crypto";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/utils";
import { BN, Buffer } from "avalanche";
import { AVMAPI } from "avalanche/dist/apis/avm";
import { PlatformVMAPI } from "avalanche/dist/apis/platformvm";
import { v4 as uuidv4 } from "uuid";

import { SignedTransactionData } from "../dto";
import { keyPairFromMnemonic, useKeychain, usePChain, useXChain } from "./helpers";

export class TransactionService extends Services.AbstractTransactionService {
	readonly #config: Coins.Config;
	readonly #xchain: AVMAPI;
	readonly #pchain: PlatformVMAPI;
	readonly #keychain;

	public constructor(config: Coins.Config) {
		super();

		this.#config = config;
		this.#xchain = useXChain(config);
		this.#pchain = usePChain(config);
		this.#keychain = useKeychain(config);
	}

	public static async __construct(config: Coins.Config): Promise<TransactionService> {
		return new TransactionService(config);
	}

	public async transfer(
		input: Services.TransferInput,
		options?: Services.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		if (input.signatory.signingKey() === undefined) {
			throw new Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "input.signatory");
		}

		try {
			const { child } = this.#keychain.importKey(
				keyPairFromMnemonic(this.#config, input.signatory.signingKey()).child.getPrivateKey(),
			);
			const keyPairAddresses = this.#keychain.getAddressStrings();
			const { utxos } = await this.#xchain.getUTXOs(child.getAddressString());
			const amount = Helpers.toRawUnit(input.data.amount, this.#config).toString();

			const signedTx = (
				await this.#xchain.buildBaseTx(
					utxos,
					new BN(amount),
					this.#config.get("network.meta.assetId"),
					[input.data.to],
					keyPairAddresses,
					keyPairAddresses,
					input.data.memo === undefined ? undefined : Buffer.from(input.data.memo),
				)
			).sign(this.#keychain);

			return new SignedTransactionData(
				// @ts-ignore - feross/buffer should behave the same as nodejs/buffer
				Hash.sha256(signedTx.toBuffer()).toString("hex"),
				{
					sender: input.signatory.address(),
					recipient: input.data.to,
					amount,
					fee: BigNumber.make(0.001).times(1e8),
					timestamp: DateTime.make(),
				},
				signedTx.toString(),
			);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async vote(
		input: Services.VoteInput,
		options?: Services.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		if (input.signatory.signingKey() === undefined) {
			throw new Exceptions.MissingArgument(this.constructor.name, this.vote.name, "input.signatory");
		}

		try {
			const { child } = this.#keychain.importKey(
				keyPairFromMnemonic(this.#config, input.signatory.signingKey()).child.getPrivateKey(),
			);
			const keyPairAddresses = this.#keychain.getAddressStrings();
			const { utxos } = await this.#pchain.getUTXOs(child.getAddressString());

			const signedTx = (
				await this.#pchain.buildAddDelegatorTx(
					utxos,
					keyPairAddresses,
					keyPairAddresses,
					keyPairAddresses,
					input.data.votes[0],
					// @ts-ignore
					"START-TIME",
					"END-TIME",
					"STAKE-AMOUNT",
					keyPairAddresses,
				)
			).sign(this.#keychain);

			return new SignedTransactionData(
				uuidv4(),
				{
					sender: input.signatory.address(),
					recipient: input.signatory.address(),
					amount: 0,
					fee: 0,
				},
				signedTx.toString(),
			);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
