import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";
import CardanoWasm from "@emurgo/cardano-serialization-lib-nodejs";

import { SignedTransactionData } from "../dto";
import { createValue, getCip1852Account } from "./transaction.helpers";

export class TransactionService implements Contracts.TransactionService {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		this.#config = config;
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
			throw new Exceptions.MissingArgument(this.constructor.name, "transfer", "sign.mnemonic");
		}

		const { minFeeA, minFeeB, minUTxOValue, poolDeposit, keyDeposit } = this.#config.get<Contracts.KeyValuePair>(
			"network.meta",
		);

		// This is the transaction builder that uses values from the genesis block of the configured network.
		const txBuilder = CardanoWasm.TransactionBuilder.new(
			CardanoWasm.LinearFee.new(
				CardanoWasm.BigNum.from_str(minFeeA.toString()),
				CardanoWasm.BigNum.from_str(minFeeB.toString()),
			),
			CardanoWasm.BigNum.from_str(minUTxOValue.toString()),
			CardanoWasm.BigNum.from_str(poolDeposit.toString()),
			CardanoWasm.BigNum.from_str(keyDeposit.toString()),
		);

		// Get a `Bip32PrivateKey` instance according to `CIP1852` and turn it into a `PrivateKey` instance
		const privateKey = getCip1852Account(
			input.sign.mnemonic,
			this.#config.get<number>("network.crypto.slip44"),
		).to_raw_key();

		// These are the inputs (UTXO) that will be consumed to satisfy the outputs. Any change will be transfered back to the sender
		const utxos: any = await this.listUnspentTransactions(input.from);

		for (let i = 0; i < utxos.length; i++) {
			txBuilder.add_key_input(
				privateKey.to_public().hash(),
				CardanoWasm.TransactionInput.new(
					CardanoWasm.TransactionHash.from_bytes(Buffer.from(utxos[i].transaction.hash, "hex")),
					i,
				),
				createValue(utxos[i].value),
			);
		}

		// These are the outputs that will be transfered to other wallets. For now we only support a single output.
		txBuilder.add_output(
			CardanoWasm.TransactionOutput.new(
				CardanoWasm.Address.from_bech32(input.data.to),
				createValue(input.data.amount),
			),
		);

		// This is the expiration slot which should be estimated with #estimateExpiration
		if (input.data.expiration === undefined) {
			txBuilder.set_ttl(parseInt(await this.estimateExpiration()));
		} else {
			txBuilder.set_ttl(input.data.expiration);
		}

		// calculate the min fee required and send any change to an address
		txBuilder.add_change_if_needed(CardanoWasm.Address.from_bech32(input.from));

		// once the transaction is ready, we build it to get the tx body without witnesses
		const txBody = txBuilder.build();
		const txHash = CardanoWasm.hash_transaction(txBody);
		const witnesses = CardanoWasm.TransactionWitnessSet.new();

		// add keyhash witnesses
		const vkeyWitnesses = CardanoWasm.Vkeywitnesses.new();
		const vkeyWitness = CardanoWasm.make_vkey_witness(txHash, privateKey);
		vkeyWitnesses.add(vkeyWitness);
		witnesses.set_vkeys(vkeyWitnesses);

		return new SignedTransactionData(
			Buffer.from(txHash.to_bytes()).toString("hex"),
			{
				sender: input.from,
				recipient: input.data.to,
				amount: input.data.amount,
				fee: txBody.fee().to_str(),
			},
			Buffer.from(CardanoWasm.Transaction.new(txBody, witnesses).to_bytes()).toString("hex"),
		);
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
		throw new Exceptions.NotImplemented(this.constructor.name, "vote");
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
		return (
			await this.post(`{ cardano { tip { slotNo } } }`)
		).data.cardano.tip.slotNo + parseInt(value || "7200"); // Yoroi uses 7200 as TTL default
	}

	private async listUnspentTransactions(address: string): Promise<any> {
		return (await this.post(`{
				utxos(
				  order_by: { value: desc }
				  where: {
					address: {
					  _eq: "${address}"
					}
				  }
				) {
				  address
				  transaction {
					hash
				  }
				  value
				}
			  }`,
		)).data.utxos;
	}

	private async post(query: string): Promise<Record<string, any>> {
		return (await this.#config
			.get<Contracts.HttpClient>("httpClient")
			.post(Arr.randomElement(this.#config.get<string[]>("network.networking.hostsArchival")), { query })
	).json(); }
}
