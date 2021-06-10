"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WIF = void 0;
const wif_1 = require("wif");
class WIF {
	static encode({ version, privateKey, compressed }) {
		return wif_1.encode(version, Buffer.from(privateKey, "hex"), compressed);
	}
	static decode(string) {
		const { privateKey, compressed, version } = wif_1.decode(string);
		return { version, privateKey: privateKey.toString("hex"), compressed };
	}
}
exports.WIF = WIF;
//# sourceMappingURL=wif.js.map
