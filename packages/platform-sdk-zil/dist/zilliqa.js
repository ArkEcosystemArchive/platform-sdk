"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertZilToQa = exports.convertQaToZil = exports.accountFromPrivateKey = exports.accountFromMnemonic = exports.getZilliqaVersion = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const zilliqa_1 = require("@zilliqa-js/zilliqa");
const getZilliqaVersion = (config) => {
	const id = config.get("network.id");
	let chainId;
	if (id === "zil.testnet") {
		chainId = 333;
	}
	if (id === "zil.mainnet") {
		chainId = 1;
	}
	if (!chainId) {
		throw new platform_sdk_1.Exceptions.Exception(`Add chainId for network ${id}`);
	}
	return zilliqa_1.bytes.pack(chainId, 1);
};
exports.getZilliqaVersion = getZilliqaVersion;
const accountFromMnemonic = async (wallet, mnemonic, options) => {
	var _a;
	const index =
		(_a = options === null || options === void 0 ? void 0 : options.bip44) === null || _a === void 0
			? void 0
			: _a.addressIndex;
	const address = wallet.addByMnemonic(mnemonic, index); // TODO: is second argument correct?
	return wallet.accounts[address];
};
exports.accountFromMnemonic = accountFromMnemonic;
const accountFromPrivateKey = async (wallet, privateKey) => {
	const address = wallet.addByPrivateKey(privateKey);
	return wallet.accounts[address];
};
exports.accountFromPrivateKey = accountFromPrivateKey;
const convertQaToZil = (qa) => zilliqa_1.units.fromQa(new zilliqa_1.BN(qa), zilliqa_1.units.Units.Zil);
exports.convertQaToZil = convertQaToZil;
const convertZilToQa = (zil) => zilliqa_1.units.toQa(zil, zilliqa_1.units.Units.Zil).toString();
exports.convertZilToQa = convertZilToQa;
//# sourceMappingURL=zilliqa.js.map
