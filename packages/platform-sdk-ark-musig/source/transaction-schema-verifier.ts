import { Enums, Interfaces, Transactions, Validation } from "@arkecosystem/crypto";

class TransactionSchemaVerifier {
	public constructor() {
		for (const schemaName of Object.keys(Transactions.schemas)) {
			this.#extendTransaction(Transactions.schemas[schemaName], schemaName);
		}
	}

	public verifySchema(data: Interfaces.ITransactionData) {
		if (!data.signatures) {
			data.signatures = [];
		}

		const isMultiSignatureRegistration =
			data.type === Enums.TransactionType.MultiSignature &&
			(!data.typeGroup || data.typeGroup === Enums.TransactionTypeGroup.Core);

		return Transactions.Verifier.verifySchema(data, !isMultiSignatureRegistration);
	}

	#extendTransaction(schema, schemaName?) {
		if (typeof schema !== "object" || !schema.properties.signatures.minItems || !schema.$id) {
			return;
		}

		Validation.validator.extendTransaction(schema, true);
		schema.properties.signatures.minItems = 1; // we require at least one participant to sign the tx

		if (schemaName && schemaName === "multiSignature") {
			schema.required = ["asset"];
		}

		Validation.validator.extendTransaction(schema);
	}
}

export const transactionSchemaVerifier = new TransactionSchemaVerifier();
