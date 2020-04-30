import "jest-extended";

import { TransactionService } from "../../src/services/transaction";
import { identity } from "../__fixtures__/identity";

let subject: TransactionService;

beforeEach(
	async () =>
		(subject = await TransactionService.construct({
			network: "7158c297294a540bc9ac6e474529c3da38d03ece056e3fa2d98141e6ec54132d",
		})),
);

describe("TransactionService", () => {
	describe("#createTransfer", () => {
		it("should verify", async () => {
			const result: any = await subject.createTransfer({
				sign: {
					passphrase: identity.passphrase,
				},
				data: {
					amount: "1",
					to: identity.address,
				},
			});

			expect(result).toBeObject();
		});
	});

	describe("#createSecondSignature", () => {
		it("should verify", async () => {
			const result: any = await subject.createSecondSignature({
				sign: {
					passphrase: identity.passphrase,
				},
				data: {
					passphrase: identity.passphrase,
				},
			});

			expect(result).toBeObject();
		});
	});

	describe("#createDelegateRegistration", () => {
		it("should verify", async () => {
			const result: any = await subject.createDelegateRegistration({
				sign: {
					passphrase: identity.passphrase,
				},
				data: {
					username: "johndoe",
				},
			});

			expect(result).toBeObject();
		});
	});

	describe("#createVote", () => {
		it("should verify", async () => {
			const result: any = await subject.createVote({
				sign: {
					passphrase: identity.passphrase,
				},
				data: {
					vote: "9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f",
				},
			});

			expect(result).toBeObject();
		});
	});

	describe("#createMultiSignature", () => {
		it("should verify", async () => {
			const result: any = await subject.createMultiSignature({
				sign: { passphrase: identity.passphrase },
				data: {
					publicKeys: [
						"9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f",
						"141b16ac8d5bd150f16b1caa08f689057ca4c4434445e56661831f4e671b7c0a",
						"3ff32442bb6da7d60c1b7752b24e6467813c9b698e0f278d48c43580da972135",
					],
					lifetime: 34,
					min: 2,
				},
			});

			expect(result).toBeObject();
		});
	});
});
