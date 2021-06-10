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
exports.addressFromAccountExtPublicKey = exports.addressFromMnemonic = exports.deriveStakeKey = exports.deriveChangeKey = exports.deriveSpendKey = exports.deriveAccountKey = exports.deriveRootKey = exports.deriveAddress = exports.SHELLEY_DERIVATION_SCHEME = exports.SHELLEY_COIN_TYPE = exports.SHELLEY_COIN_PURPOSE = exports.HARDENED_THRESHOLD = void 0;
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const cardano_serialization_lib_nodejs_1 = __importStar(require("@emurgo/cardano-serialization-lib-nodejs"));
exports.HARDENED_THRESHOLD = 0x80000000;
exports.SHELLEY_COIN_PURPOSE = 1852;
exports.SHELLEY_COIN_TYPE = 1815;
exports.SHELLEY_DERIVATION_SCHEME = 2;
const harden = (value) => exports.HARDENED_THRESHOLD + value;
const deriveAddress = (accountKey, isChange, addressIndex, networkId) => {
	const spendKey = accountKey.derive(isChange ? 1 : 0).derive(addressIndex);
	const stakeKey = accountKey.derive(2).derive(0);
	return cardano_serialization_lib_nodejs_1.default.BaseAddress.new(
		parseInt(networkId),
		cardano_serialization_lib_nodejs_1.default.StakeCredential.from_keyhash(spendKey.to_raw_key().hash()),
		cardano_serialization_lib_nodejs_1.default.StakeCredential.from_keyhash(stakeKey.to_raw_key().hash()),
	)
		.to_address()
		.to_bech32();
};
exports.deriveAddress = deriveAddress;
// Key Derivation
const deriveRootKey = (mnemonic) =>
	cardano_serialization_lib_nodejs_1.Bip32PrivateKey.from_bip39_entropy(
		Buffer.from(platform_sdk_crypto_1.BIP39.toEntropy(mnemonic), "hex"),
		Buffer.from(""),
	);
exports.deriveRootKey = deriveRootKey;
const deriveAccountKey = (rootKey, index) =>
	rootKey
		.derive(harden(exports.SHELLEY_COIN_PURPOSE)) // CIP1852
		.derive(harden(exports.SHELLEY_COIN_TYPE))
		.derive(harden(index));
exports.deriveAccountKey = deriveAccountKey;
const deriveSpendKey = (accountKey, index) =>
	accountKey
		.derive(0) // External
		.derive(index);
exports.deriveSpendKey = deriveSpendKey;
const deriveChangeKey = (accountKey, index) =>
	accountKey
		.derive(1) // Change
		.derive(index);
exports.deriveChangeKey = deriveChangeKey;
const deriveStakeKey = (accountKey, index) =>
	accountKey
		.derive(2) // Chimeric
		.derive(index);
exports.deriveStakeKey = deriveStakeKey;
// Address Derivation
const addressFromMnemonic = (mnemonic, accountIndex, isChange, addressIndex, networkId) =>
	exports.deriveAddress(
		exports
			.deriveRootKey(mnemonic)
			.derive(harden(exports.SHELLEY_COIN_PURPOSE))
			.derive(harden(exports.SHELLEY_COIN_TYPE))
			.derive(harden(accountIndex))
			.to_public(),
		isChange,
		addressIndex,
		networkId,
	);
exports.addressFromMnemonic = addressFromMnemonic;
const addressFromAccountExtPublicKey = (extPubKey, isChange, addressIndex, networkId) =>
	exports.deriveAddress(
		cardano_serialization_lib_nodejs_1.default.Bip32PublicKey.from_bytes(extPubKey),
		isChange,
		addressIndex,
		networkId,
	);
exports.addressFromAccountExtPublicKey = addressFromAccountExtPublicKey;
//# sourceMappingURL=shelley.js.map
