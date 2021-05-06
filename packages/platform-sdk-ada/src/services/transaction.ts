import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import CardanoWasm, { BigNum, Bip32PrivateKey } from "@emurgo/cardano-serialization-lib-nodejs";

import { SignedTransactionData } from "../dto";
import { fetchNetworkTip, listUnspentTransactions } from "./graphql-helpers";
import { addUtxoInput, deriveAddressesAndSigningKeys, usedAddressesForAccount } from "./helpers";
import { deriveAccountKey, deriveAddress, deriveRootKey } from "./identity/shelley";
import { createValue } from "./transaction.helpers";
import { UnspentTransaction } from "./transaction.models";

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
		const networkId = this.#config.get<string>(Coins.ConfigKey.CryptoNetworkId);

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
		const accountKey: Bip32PrivateKey = deriveAccountKey(deriveRootKey(input.sign.mnemonic), 0);
		const publicKey = accountKey.to_public();

		if (Buffer.from(publicKey.as_bytes()).toString("hex") !== input.from) {
			throw Error("Public key doesn't match the given mnemonic");
		}

		// Gather all **used** spend and change addresses of the account
		const { usedSpendAddresses, usedChangeAddresses } = await usedAddressesForAccount(this.#config, input.from);
		const usedAddresses: string[] = [...usedSpendAddresses.values(), ...usedChangeAddresses.values()];

		// Now get utxos for those addresses
		const utxos: UnspentTransaction[] = await listUnspentTransactions(this.#config, usedAddresses); // when more that one utxo, they seem to be ordered by amount descending

		// Figure out which of the utxos to use
		const usedUtxos: UnspentTransaction[] = [];
		const requestedAmount: BigNum = BigNum.from_str(input.data.amount);
		let totalTxAmount: BigNum = BigNum.from_str("0");
		let totalFeesAmount: BigNum = BigNum.from_str("0");

		for (const utxo of utxos) {
			const { added, amount, fee } = addUtxoInput(txBuilder, utxo);
			if (added) {
				usedUtxos.push(utxo);
				totalTxAmount = totalTxAmount.checked_add(amount);
				totalFeesAmount = totalFeesAmount.checked_add(fee);
			}
			if (totalTxAmount.compare(requestedAmount.checked_add(totalFeesAmount)) > 0) {
				break;
			}
		}

		// These are the outputs that will be transferred to other wallets. For now we only support a single output.
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

		const addresses = await deriveAddressesAndSigningKeys(publicKey, networkId, accountKey);

		// Calculate the min fee required and send any change to an address
		const changeAddress = deriveAddress(publicKey, true, 0, networkId);
		txBuilder.add_change_if_needed(CardanoWasm.Address.from_bech32(changeAddress));

		// Once the transaction is ready, we build it to get the tx body without witnesses
		const txBody = txBuilder.build();
		const txHash = CardanoWasm.hash_transaction(txBody);

		// Add the signatures
		const vkeyWitnesses = CardanoWasm.Vkeywitnesses.new();
		usedUtxos.forEach((utxo: UnspentTransaction) => {
			vkeyWitnesses.add(
				CardanoWasm.make_vkey_witness(
					txHash,
					addresses[utxo.index][utxo.address].to_raw_key(),
					// (addresses[0][utxo.address] || addresses[1][utxo.address]).to_raw_key()
				),
			);
		});
		const witnesses = CardanoWasm.TransactionWitnessSet.new();
		witnesses.set_vkeys(vkeyWitnesses);

		// Build the signed transaction
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

	public async estimateExpiration(value?: string): Promise<string | undefined> {
		const tip: number = await fetchNetworkTip(this.#config);
		const ttl: number = parseInt(value || "7200"); // Yoroi uses 7200 as TTL default

		return (tip + ttl).toString();
	}
}
