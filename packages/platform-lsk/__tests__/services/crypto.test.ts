import "jest-extended";

import { TransactionService } from "../../src/services/transaction";
import { identity } from "../__fixtures__/identity";

let subject: TransactionService;

beforeEach(
	() => (subject = new TransactionService("7158c297294a540bc9ac6e474529c3da38d03ece056e3fa2d98141e6ec54132d")),
);

describe("TransactionService", () => {
	describe("#createTransfer", () => {
		it("should verify", () => {
			const result: any = subject.createTransfer({
				amount: "1",
				recipientId: identity.address,
				passphrase: identity.passphrase,
			});

			expect(result).toBeObject();
		});
	});

	describe("#createSecondSignature", () => {
		it("should verify", () => {
			const result: any = subject.createSecondSignature({
				passphrase: identity.passphrase,
				secondPassphrase: identity.passphrase,
			});

			expect(result).toBeObject();
		});
	});

	describe("#createDelegateRegistration", () => {
		it("should verify", () => {
			const result: any = subject.createDelegateRegistration({
				username: "johndoe",
				passphrase: identity.passphrase,
			});

			expect(result).toBeObject();
		});
	});

	describe("#createVote", () => {
		it("should verify", () => {
			const result: any = subject.createVote({
				asset: "9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f",
				passphrase: identity.passphrase,
			});

			expect(result).toBeObject();
		});
	});

	describe("#createMultiSignature", () => {
		it("should verify", () => {
			const result: any = subject.createMultiSignature({
				keysgroup: [
					"9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f",
					"141b16ac8d5bd150f16b1caa08f689057ca4c4434445e56661831f4e671b7c0a",
					"3ff32442bb6da7d60c1b7752b24e6467813c9b698e0f278d48c43580da972135",
				],
				lifetime: 34,
				minimum: 2,
				passphrase: identity.passphrase,
			});

			expect(result).toBeObject();
		});
	});
});
