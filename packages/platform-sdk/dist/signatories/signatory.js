"use strict";
/* istanbul ignore file */
var __classPrivateFieldSet =
	(this && this.__classPrivateFieldSet) ||
	function (receiver, state, value, kind, f) {
		if (kind === "m") throw new TypeError("Private method is not writable");
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot write private member to an object whose class did not declare it");
		return kind === "a" ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value;
	};
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var _Signatory_signatory;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signatory = void 0;
const exceptions_1 = require("../exceptions");
const abstract_double_signatory_1 = require("./abstract-double-signatory");
const abstract_signatory_1 = require("./abstract-signatory");
const abstract_value_signatory_1 = require("./abstract-value-signatory");
const ledger_1 = require("./ledger");
const mnemonic_1 = require("./mnemonic");
const multi_mnemonic_1 = require("./multi-mnemonic");
const multi_signature_1 = require("./multi-signature");
const private_key_1 = require("./private-key");
const private_multi_signature_1 = require("./private-multi-signature");
const secondary_mnemonic_1 = require("./secondary-mnemonic");
const secondary_wif_1 = require("./secondary-wif");
const sender_public_key_1 = require("./sender-public-key");
const wif_1 = require("./wif");
class Signatory {
	constructor(signatory) {
		_Signatory_signatory.set(this, void 0);
		__classPrivateFieldSet(this, _Signatory_signatory, signatory, "f");
	}
	signingKey() {
		// @TODO: deduplicate this
		if (
			__classPrivateFieldGet(this, _Signatory_signatory, "f") instanceof multi_mnemonic_1.MultiMnemonicSignatory
		) {
			throw new exceptions_1.ForbiddenMethodCallException(this.constructor.name, this.signingKey.name);
		}
		if (
			__classPrivateFieldGet(this, _Signatory_signatory, "f") instanceof multi_signature_1.MultiSignatureSignatory
		) {
			throw new exceptions_1.ForbiddenMethodCallException(this.constructor.name, this.signingKey.name);
		}
		return __classPrivateFieldGet(this, _Signatory_signatory, "f").signingKey();
	}
	signingKeys() {
		// @TODO: deduplicate this
		if (
			__classPrivateFieldGet(this, _Signatory_signatory, "f") instanceof multi_mnemonic_1.MultiMnemonicSignatory
		) {
			return __classPrivateFieldGet(this, _Signatory_signatory, "f").signingKeys();
		}
		if (
			__classPrivateFieldGet(this, _Signatory_signatory, "f") instanceof
			private_multi_signature_1.PrivateMultiSignatureSignatory
		) {
			return __classPrivateFieldGet(this, _Signatory_signatory, "f").signingKeys();
		}
		throw new exceptions_1.ForbiddenMethodCallException(this.constructor.name, this.signingKeys.name);
	}
	signingList() {
		if (
			__classPrivateFieldGet(this, _Signatory_signatory, "f") instanceof multi_signature_1.MultiSignatureSignatory
		) {
			return __classPrivateFieldGet(this, _Signatory_signatory, "f").signingList();
		}
		throw new exceptions_1.ForbiddenMethodCallException(this.constructor.name, this.signingList.name);
	}
	confirmKey() {
		// @TODO: deduplicate this
		if (
			__classPrivateFieldGet(this, _Signatory_signatory, "f") instanceof
			secondary_mnemonic_1.SecondaryMnemonicSignatory
		) {
			return __classPrivateFieldGet(this, _Signatory_signatory, "f").confirmKey();
		}
		if (__classPrivateFieldGet(this, _Signatory_signatory, "f") instanceof secondary_wif_1.SecondaryWIFSignatory) {
			return __classPrivateFieldGet(this, _Signatory_signatory, "f").confirmKey();
		}
		throw new exceptions_1.ForbiddenMethodCallException(this.constructor.name, this.confirmKey.name);
	}
	identifier() {
		if (
			__classPrivateFieldGet(this, _Signatory_signatory, "f") instanceof multi_signature_1.MultiSignatureSignatory
		) {
			return __classPrivateFieldGet(this, _Signatory_signatory, "f").identifier();
		}
		throw new exceptions_1.ForbiddenMethodCallException(this.constructor.name, this.identifier.name);
	}
	identifiers() {
		if (
			!(
				__classPrivateFieldGet(this, _Signatory_signatory, "f") instanceof
				multi_mnemonic_1.MultiMnemonicSignatory
			)
		) {
			throw new exceptions_1.ForbiddenMethodCallException(this.constructor.name, this.identifiers.name);
		}
		return __classPrivateFieldGet(this, _Signatory_signatory, "f").identifiers();
	}
	address() {
		// @TODO: deduplicate this
		if (__classPrivateFieldGet(this, _Signatory_signatory, "f") instanceof abstract_signatory_1.AbstractSignatory) {
			return __classPrivateFieldGet(this, _Signatory_signatory, "f").address();
		}
		if (
			__classPrivateFieldGet(this, _Signatory_signatory, "f") instanceof
			abstract_double_signatory_1.AbstractDoubleSignatory
		) {
			return __classPrivateFieldGet(this, _Signatory_signatory, "f").address();
		}
		if (
			__classPrivateFieldGet(this, _Signatory_signatory, "f") instanceof
			abstract_value_signatory_1.AbstractValueSignatory
		) {
			return __classPrivateFieldGet(this, _Signatory_signatory, "f").address();
		}
		if (__classPrivateFieldGet(this, _Signatory_signatory, "f") instanceof private_key_1.PrivateKeySignatory) {
			return __classPrivateFieldGet(this, _Signatory_signatory, "f").address();
		}
		throw new exceptions_1.ForbiddenMethodCallException(this.constructor.name, this.address.name);
	}
	publicKey() {
		// @TODO: deduplicate this
		if (__classPrivateFieldGet(this, _Signatory_signatory, "f") instanceof abstract_signatory_1.AbstractSignatory) {
			return __classPrivateFieldGet(this, _Signatory_signatory, "f").publicKey();
		}
		if (
			__classPrivateFieldGet(this, _Signatory_signatory, "f") instanceof
			abstract_double_signatory_1.AbstractDoubleSignatory
		) {
			return __classPrivateFieldGet(this, _Signatory_signatory, "f").publicKey();
		}
		if (
			__classPrivateFieldGet(this, _Signatory_signatory, "f") instanceof
			abstract_value_signatory_1.AbstractValueSignatory
		) {
			return __classPrivateFieldGet(this, _Signatory_signatory, "f").publicKey();
		}
		throw new exceptions_1.ForbiddenMethodCallException(this.constructor.name, this.publicKey.name);
	}
	privateKey() {
		// @TODO: deduplicate this
		if (__classPrivateFieldGet(this, _Signatory_signatory, "f") instanceof abstract_signatory_1.AbstractSignatory) {
			return __classPrivateFieldGet(this, _Signatory_signatory, "f").privateKey();
		}
		if (
			__classPrivateFieldGet(this, _Signatory_signatory, "f") instanceof
			abstract_double_signatory_1.AbstractDoubleSignatory
		) {
			return __classPrivateFieldGet(this, _Signatory_signatory, "f").privateKey();
		}
		if (__classPrivateFieldGet(this, _Signatory_signatory, "f") instanceof private_key_1.PrivateKeySignatory) {
			return __classPrivateFieldGet(this, _Signatory_signatory, "f").privateKey();
		}
		throw new exceptions_1.ForbiddenMethodCallException(this.constructor.name, this.privateKey.name);
	}
	path() {
		if (__classPrivateFieldGet(this, _Signatory_signatory, "f") instanceof ledger_1.LedgerSignatory) {
			return __classPrivateFieldGet(this, _Signatory_signatory, "f").signingKey();
		}
		throw new exceptions_1.ForbiddenMethodCallException(this.constructor.name, this.path.name);
	}
	actsWithMnemonic() {
		return __classPrivateFieldGet(this, _Signatory_signatory, "f") instanceof mnemonic_1.MnemonicSignatory;
	}
	actsWithMultiMnemonic() {
		return (
			__classPrivateFieldGet(this, _Signatory_signatory, "f") instanceof multi_mnemonic_1.MultiMnemonicSignatory
		);
	}
	actsWithSecondaryMnemonic() {
		return (
			__classPrivateFieldGet(this, _Signatory_signatory, "f") instanceof
			secondary_mnemonic_1.SecondaryMnemonicSignatory
		);
	}
	actsWithWif() {
		return __classPrivateFieldGet(this, _Signatory_signatory, "f") instanceof wif_1.WIFSignatory;
	}
	actsWithSecondaryWif() {
		return __classPrivateFieldGet(this, _Signatory_signatory, "f") instanceof secondary_wif_1.SecondaryWIFSignatory;
	}
	actsWithPrivateKey() {
		return __classPrivateFieldGet(this, _Signatory_signatory, "f") instanceof private_key_1.PrivateKeySignatory;
	}
	actsWithSenderPublicKey() {
		return (
			__classPrivateFieldGet(this, _Signatory_signatory, "f") instanceof
			sender_public_key_1.SenderPublicKeySignatory
		);
	}
	actsWithMultiSignature() {
		return (
			__classPrivateFieldGet(this, _Signatory_signatory, "f") instanceof multi_signature_1.MultiSignatureSignatory
		);
	}
	actsWithPrivateMultiSignature() {
		return (
			__classPrivateFieldGet(this, _Signatory_signatory, "f") instanceof
			private_multi_signature_1.PrivateMultiSignatureSignatory
		);
	}
	actsWithLedger() {
		return __classPrivateFieldGet(this, _Signatory_signatory, "f") instanceof ledger_1.LedgerSignatory;
	}
}
exports.Signatory = Signatory;
_Signatory_signatory = new WeakMap();
//# sourceMappingURL=signatory.js.map
