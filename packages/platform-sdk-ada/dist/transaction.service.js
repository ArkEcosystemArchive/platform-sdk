"use strict";
var __createBinding =
	(this && this.__createBinding) ||
	(Object.create
		? function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				Object.defineProperty(o, k2, {
					enumerable: true,
					get: function () {
						return m[k];
					},
				});
		  }
		: function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				o[k2] = m[k];
		  });
var __setModuleDefault =
	(this && this.__setModuleDefault) ||
	(Object.create
		? function (o, v) {
				Object.defineProperty(o, "default", { enumerable: true, value: v });
		  }
		: function (o, v) {
				o["default"] = v;
		  });
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
var __importStar =
	(this && this.__importStar) ||
	function (mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null)
			for (var k in mod)
				if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		__setModuleDefault(result, mod);
		return result;
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_intl_1 = require("@arkecosystem/platform-sdk-intl");
const cardano_serialization_lib_nodejs_1 = __importStar(require("@emurgo/cardano-serialization-lib-nodejs"));
const graphql_helpers_1 = require("./graphql-helpers");
const helpers_1 = require("./helpers");
const shelley_1 = require("./shelley");
const transaction_helpers_1 = require("./transaction.helpers");
let TransactionService = class TransactionService extends platform_sdk_1.Services.AbstractTransactionService {
	async transfer(input) {
		const { minFeeA, minFeeB, minUTxOValue, poolDeposit, keyDeposit, networkId } = this.configRepository.get(
			"network.meta",
		);
		// This is the transaction builder that uses values from the genesis block of the configured network.
		const txBuilder = cardano_serialization_lib_nodejs_1.default.TransactionBuilder.new(
			cardano_serialization_lib_nodejs_1.default.LinearFee.new(
				cardano_serialization_lib_nodejs_1.default.BigNum.from_str(minFeeA.toString()),
				cardano_serialization_lib_nodejs_1.default.BigNum.from_str(minFeeB.toString()),
			),
			cardano_serialization_lib_nodejs_1.default.BigNum.from_str(minUTxOValue.toString()),
			cardano_serialization_lib_nodejs_1.default.BigNum.from_str(poolDeposit.toString()),
			cardano_serialization_lib_nodejs_1.default.BigNum.from_str(keyDeposit.toString()),
		);
		// Get a `Bip32PrivateKey` instance according to `CIP1852` and turn it into a `PrivateKey` instance
		const accountKey = shelley_1.deriveAccountKey(shelley_1.deriveRootKey(input.signatory.signingKey()), 0);
		const publicKey = accountKey.to_public();
		// Gather all **used** spend and change addresses of the account
		const { usedSpendAddresses, usedChangeAddresses } = await helpers_1.usedAddressesForAccount(
			this.configRepository,
			this.httpClient,
			Buffer.from(publicKey.as_bytes()).toString("hex"),
		);
		const usedAddresses = [...usedSpendAddresses.values(), ...usedChangeAddresses.values()];
		// Now get utxos for those addresses
		const utxos = await graphql_helpers_1.listUnspentTransactions(
			this.configRepository,
			this.httpClient,
			usedAddresses,
		); // when more that one utxo, they seem to be ordered by amount descending
		// Figure out which of the utxos to use
		const usedUtxos = [];
		const amount = platform_sdk_1.Helpers.toRawUnit(input.data.amount, this.configRepository).toString();
		const requestedAmount = cardano_serialization_lib_nodejs_1.BigNum.from_str(amount);
		let totalTxAmount = cardano_serialization_lib_nodejs_1.BigNum.from_str("0");
		let totalFeesAmount = cardano_serialization_lib_nodejs_1.BigNum.from_str("0");
		for (const utxo of utxos) {
			const { added, amount, fee } = helpers_1.addUtxoInput(txBuilder, utxo);
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
			cardano_serialization_lib_nodejs_1.default.TransactionOutput.new(
				cardano_serialization_lib_nodejs_1.default.Address.from_bech32(input.data.to),
				transaction_helpers_1.createValue(amount),
			),
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
		const addresses = await helpers_1.deriveAddressesAndSigningKeys(publicKey, networkId, accountKey);
		// Calculate the min fee required and send any change to an address
		const changeAddress = shelley_1.deriveAddress(publicKey, true, 0, networkId);
		txBuilder.add_change_if_needed(cardano_serialization_lib_nodejs_1.default.Address.from_bech32(changeAddress));
		// Once the transaction is ready, we build it to get the tx body without witnesses
		const txBody = txBuilder.build();
		const txHash = cardano_serialization_lib_nodejs_1.default.hash_transaction(txBody);
		// Add the signatures
		const vkeyWitnesses = cardano_serialization_lib_nodejs_1.default.Vkeywitnesses.new();
		usedUtxos.forEach((utxo) => {
			vkeyWitnesses.add(
				cardano_serialization_lib_nodejs_1.default.make_vkey_witness(
					txHash,
					addresses[utxo.index][utxo.address].to_raw_key(),
				),
			);
		});
		const witnesses = cardano_serialization_lib_nodejs_1.default.TransactionWitnessSet.new();
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
				timestamp: platform_sdk_intl_1.DateTime.make(),
			},
			Buffer.from(
				cardano_serialization_lib_nodejs_1.default.Transaction.new(txBody, witnesses).to_bytes(),
			).toString("hex"),
		);
	}
	async estimateExpiration(value) {
		const tip = await graphql_helpers_1.fetchNetworkTip(this.configRepository, this.httpClient);
		const ttl = parseInt(value || "7200"); // Yoroi uses 7200 as TTL default
		return (tip + ttl).toString();
	}
};
TransactionService = __decorate([platform_sdk_1.IoC.injectable()], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map
