"use strict";
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var _TransactionSchemaVerifier_instances, _TransactionSchemaVerifier_extendTransaction;
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionSchemaVerifier = void 0;
const crypto_1 = require("@arkecosystem/crypto");
class TransactionSchemaVerifier {
	constructor() {
		_TransactionSchemaVerifier_instances.add(this);
		for (const schemaName of Object.keys(crypto_1.Transactions.schemas)) {
			__classPrivateFieldGet(
				this,
				_TransactionSchemaVerifier_instances,
				"m",
				_TransactionSchemaVerifier_extendTransaction,
			).call(this, crypto_1.Transactions.schemas[schemaName], schemaName);
		}
	}
	verifySchema(data) {
		if (!data.signatures) {
			data.signatures = [];
		}
		const isMultiSignatureRegistration =
			data.type === crypto_1.Enums.TransactionType.MultiSignature &&
			(!data.typeGroup || data.typeGroup === crypto_1.Enums.TransactionTypeGroup.Core);
		const { error } = crypto_1.Transactions.Verifier.verifySchema(data, !isMultiSignatureRegistration);
		if (error) {
			throw new Error(error);
		}
	}
}
(_TransactionSchemaVerifier_instances = new WeakSet()),
	(_TransactionSchemaVerifier_extendTransaction = function _TransactionSchemaVerifier_extendTransaction(
		schema,
		schemaName,
	) {
		if (typeof schema !== "object" || !schema.properties.signatures.minItems || !schema.$id) {
			return;
		}
		crypto_1.Validation.validator.extendTransaction(schema, true);
		schema.properties.signatures.minItems = 1; // we require at least one participant to sign the tx
		if (schemaName && schemaName === "multiSignature") {
			schema.required = ["asset"];
		}
		crypto_1.Validation.validator.extendTransaction(schema);
	});
exports.transactionSchemaVerifier = new TransactionSchemaVerifier();
//# sourceMappingURL=transaction-schema-verifier.js.map
