import "jest-extended";

import { IoC } from "@arkecosystem/platform-sdk";
import nock from "nock";

import { createService } from "../test/mocking";
import { SignedTransactionData } from "./signed-transaction.dto";
import { MultiSignatureService } from "./multi-signature.service";

let subject: MultiSignatureService;

beforeAll(() => {
	nock.disableNetConnect();

	subject = createService(MultiSignatureService, undefined, (container) => {
		container.constant(IoC.BindingType.Container, container);
	});
});

afterEach(() => nock.cleanAll());

describe("MultiSignatureService", () => {
	const fixtures = require(`${__dirname}/../test/fixtures/client/multisig-transactions.json`);

	test("#allWithPendingState", async () => {
		nock(/.+/)
			.get("/transactions")
			.query({ state: "pending", publicKey: "DBk4cPYpqp7EBcvkstVDpyX7RQJNHxpMg8" })
			.reply(200, fixtures);

		const result = await subject.allWithPendingState("DBk4cPYpqp7EBcvkstVDpyX7RQJNHxpMg8");
		expect(result).toBeArrayOfSize(3);
	});

	test("#allWithReadyState", async () => {
		nock(/.+/)
			.get("/transactions")
			.query({ state: "ready", publicKey: "DBk4cPYpqp7EBcvkstVDpyX7RQJNHxpMg8" })
			.reply(200, fixtures);

		const result = await subject.allWithReadyState("DBk4cPYpqp7EBcvkstVDpyX7RQJNHxpMg8");
		expect(result).toBeArrayOfSize(3);
	});

	test("#findById", async () => {
		nock(/.+/).get("/transaction/DBk4cPYpqp7EBcvkstVDpyX7RQJNHxpMg8").reply(200, fixtures[0]);

		const result = await subject.findById("DBk4cPYpqp7EBcvkstVDpyX7RQJNHxpMg8");
		expect(result).toBeObject();
	});

	test("#broadcast", async () => {
		nock(/.+/).post("/transaction").reply(200, { id: "abc" }).post("/transaction").reply(200, { id: "abc" });

		let id = await subject.broadcast({});
		expect(id).toEqual("abc");

		id = await subject.broadcast({ asset: { multiSignature: "123" } });
		expect(id).toEqual("abc");
	});

	test("#flush", async () => {
		nock(/.+/).delete("/transactions").reply(200, {});

		await subject.flush();
	});

	test("#isMultiSignatureReady", () => {
		const transaction = createService(SignedTransactionData);
		transaction.configure("123", { signatures: [] });
		const result = subject.isMultiSignatureReady(transaction);
		expect(result).toBeTrue();
	});

	test("#needsSignatures", () => {
		const transaction = createService(SignedTransactionData);
		transaction.configure("123", { signatures: [] });
		const result = subject.needsSignatures(transaction);
		expect(result).toBeFalse();
	});

	test("#needsAllSignatures", () => {
		const transaction = createService(SignedTransactionData);
		transaction.configure("123", {
			signatures: [],
			multiSignature: {
				publicKeys: [
					"0301fd417566397113ba8c55de2f093a572744ed1829b37b56a129058000ef7bce",
					"034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
				],
				min: 2,
			},
		});
		const result = subject.needsAllSignatures(transaction);
		expect(result).toBeTrue();
	});
	test("#needsWalletSignature", () => {
		const transaction = createService(SignedTransactionData);
		transaction.configure("123", { signatures: [] });
		const result = subject.needsWalletSignature(transaction, "DBk4cPYpqp7EBcvkstVDpyX7RQJNHxpMg8");
		expect(result).toBeFalse();
	});

	test("#needsFinalSignature", () => {
		const transaction = createService(SignedTransactionData);
		transaction.configure("123", { signatures: [] });
		const result = subject.needsFinalSignature(transaction);
		expect(result).toBeTrue();
	});
	test("#getValidMultiSignatures", () => {
		const transaction = createService(SignedTransactionData);
		transaction.configure("123", { signatures: [] });
		const result = subject.getValidMultiSignatures(transaction);
		expect(result).toEqual([]);
	});

	test("#remainingSignatureCount", () => {
		const transaction = createService(SignedTransactionData);
		transaction.configure("123", {
			signatures: [],
			multiSignature: {
				publicKeys: [
					"0301fd417566397113ba8c55de2f093a572744ed1829b37b56a129058000ef7bce",
					"034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
				],
				min: 2,
			},
		});
		const result = subject.remainingSignatureCount(transaction);
		expect(result).toBe(2);
	});
});
