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
exports.deriveAddressesAndSigningKeys = exports.utxoToTxInput = exports.addUtxoInput = exports.addressesChunk = exports.usedAddressesForAccount = void 0;
const cardano_serialization_lib_nodejs_1 = __importStar(require("@emurgo/cardano-serialization-lib-nodejs"));
const buffer_1 = require("buffer");
const graphql_helpers_1 = require("./graphql-helpers");
const shelley_1 = require("./shelley");
const transaction_helpers_1 = require("./transaction.helpers");
const usedAddressesForAccount = async (config, httpClient, accountPublicKey) => {
	const networkId = config.get("network.meta.networkId");
	const usedSpendAddresses = new Set();
	const usedChangeAddresses = new Set();
	let offset = 0;
	let exhausted = false;
	do {
		const spendAddresses = await exports.addressesChunk(networkId, accountPublicKey, false, offset);
		const changeAddresses = await exports.addressesChunk(networkId, accountPublicKey, true, offset);
		const allAddresses = spendAddresses.concat(changeAddresses);
		const usedAddresses = await graphql_helpers_1.fetchUsedAddressesData(config, httpClient, allAddresses);
		spendAddresses
			.filter((sa) => usedAddresses.find((ua) => ua === sa) !== undefined)
			.forEach((sa) => usedSpendAddresses.add(sa));
		changeAddresses
			.filter((sa) => usedAddresses.find((ua) => ua === sa) !== undefined)
			.forEach((sa) => usedChangeAddresses.add(sa));
		exhausted = usedAddresses.length === 0;
		offset += 20;
	} while (!exhausted);
	return { usedSpendAddresses, usedChangeAddresses };
};
exports.usedAddressesForAccount = usedAddressesForAccount;
const addressesChunk = async (networkId, accountPublicKey, isChange, offset) => {
	const publicKey = buffer_1.Buffer.from(accountPublicKey, "hex");
	const addresses = [];
	for (let i = offset; i < offset + 20; ++i) {
		addresses.push(shelley_1.addressFromAccountExtPublicKey(publicKey, isChange, i, networkId));
	}
	return addresses;
};
exports.addressesChunk = addressesChunk;
const addUtxoInput = (txBuilder, input) => {
	const wasmAddr = cardano_serialization_lib_nodejs_1.Address.from_bech32(input.address);
	const txInput = exports.utxoToTxInput(input);
	const wasmAmount = transaction_helpers_1.createValue(input.value);
	// ignore UTXO that contribute less than their fee if they also don't contribute a token
	const feeForInput = txBuilder.fee_for_input(wasmAddr, txInput, wasmAmount);
	const skipped = feeForInput.compare(cardano_serialization_lib_nodejs_1.BigNum.from_str(input.value)) > 0;
	if (!skipped) {
		txBuilder.add_input(wasmAddr, txInput, wasmAmount);
	}
	return {
		added: !skipped,
		amount: cardano_serialization_lib_nodejs_1.BigNum.from_str(input.value),
		fee: feeForInput,
	};
};
exports.addUtxoInput = addUtxoInput;
const utxoToTxInput = (utxo) => {
	return cardano_serialization_lib_nodejs_1.default.TransactionInput.new(
		cardano_serialization_lib_nodejs_1.default.TransactionHash.from_bytes(buffer_1.Buffer.from(utxo.txHash, "hex")),
		parseInt(utxo.index),
	);
};
exports.utxoToTxInput = utxoToTxInput;
const deriveAddressesAndSigningKeys = async (publicKey, networkId, accountKey) => {
	const addresses = { 0: {}, 1: {} };
	for (let i = 0; i < 20; ++i) {
		addresses[0][shelley_1.deriveAddress(publicKey, false, i, networkId)] = shelley_1.deriveSpendKey(accountKey, i);
		addresses[1][shelley_1.deriveAddress(publicKey, true, i, networkId)] = shelley_1.deriveChangeKey(accountKey, i);
	}
	return addresses;
};
exports.deriveAddressesAndSigningKeys = deriveAddressesAndSigningKeys;
//# sourceMappingURL=helpers.js.map
