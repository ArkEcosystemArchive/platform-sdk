"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddress = exports.createWallet = void 0;
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const ethereumjs_wallet_1 = require("ethereumjs-wallet");
const createWallet = (mnemonic, coinType, account, change, addressIndex) =>
	ethereumjs_wallet_1.hdkey
		.fromMasterSeed(platform_sdk_crypto_1.BIP39.toSeed(mnemonic))
		.derivePath(`m/44'/${coinType}'/${account}'/${change}/${addressIndex}`)
		.getWallet();
exports.createWallet = createWallet;
const getAddress = (wallet) => "0x" + wallet.getAddress().toString("hex").toUpperCase();
exports.getAddress = getAddress;
//# sourceMappingURL=utils.js.map
