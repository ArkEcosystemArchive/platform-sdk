import { Contracts, Helpers, IoC, Services } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import CardanoWasm, { BigNum, Bip32PrivateKey } from "@emurgo/cardano-serialization-lib-nodejs";

import { fetchNetworkTip, listUnspentTransactions } from "./graphql-helpers";
import { addUtxoInput, deriveAddressesAndSigningKeys, usedAddressesForAccount } from "./transaction.domain";
import { deriveAccountKey, deriveAddress, deriveRootKey } from "./shelley";
import { createValue } from "./transaction.factory";
import { UnspentTransaction } from "./transaction.models";

@IoC.injectable()
export class TransactionService extends Services.AbstractTransactionService {
	public override async transfer(input: Services.TransferInput): Promise<Contracts.SignedTransactionData> {
		const {
			minFeeA,
			minFeeB,
			minUTxOValue,
			poolDeposit,
			keyDeposit,
			networkId,
		} = this.configRepository.get<Contracts.KeyValuePair>("network.meta");

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
		const accountKey: Bip32PrivateKey = deriveAccountKey(deriveRootKey(input.signatory.signingKey()), 0);
		const publicKey = accountKey.to_public();

		// Gather all **used** spend and change addresses of the account
		const { usedSpendAddresses, usedChangeAddresses } = await usedAddressesForAccount(
			this.configRepository,
			this.httpClient,
			Buffer.from(publicKey.as_bytes()).toString("hex"),
		);
		const usedAddresses: string[] = [...usedSpendAddresses.values(), ...usedChangeAddresses.values()];

		// Now get utxos for those addresses
		const utxos: UnspentTransaction[] = await listUnspentTransactions(
			this.configRepository,
			this.httpClient,
			usedAddresses,
		); // when more that one utxo, they seem to be ordered by amount descending

		// Figure out which of the utxos to use
		const usedUtxos: UnspentTransaction[] = [];
		const amount = Helpers.toRawUnit(input.data.amount, this.configRepository).toString();
		const requestedAmount: BigNum = BigNum.from_str(amount);
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
			CardanoWasm.TransactionOutput.new(CardanoWasm.Address.from_bech32(input.data.to), createValue(amount)),
		);

		// This is the expiration slot which should be estimated with #estimateExpiration
		if (input.data.expiration === undefined) {
			const expiration = await this.estimateExpiration();

			if (expiration !== undefined) {
				txBuilder.set_ttl(parseInt(expiration));
			}
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
		return this.dataTransferObjectService.signedTransaction(
			Buffer.from(txHash.to_bytes()).toString("hex"),
			{
				// @TODO This doesn't make sense in Cardano, because there can be any many senders (all addresses from the same sender)
				sender: input.signatory.publicKey(),
				recipient: input.data.to,
				amount: amount,
				fee: txBody.fee().to_str(),
				timestamp: DateTime.make(),
			},
			Buffer.from(CardanoWasm.Transaction.new(txBody, witnesses).to_bytes()).toString("hex"),
		);
	}

	public override async estimateExpiration(value?: string): Promise<string | undefined> {
		const tip: number = await fetchNetworkTip(this.configRepository, this.httpClient);
		const ttl: number = parseInt(value || "7200"); // Yoroi uses 7200 as TTL default

		return (tip + ttl).toString();
	}
}
