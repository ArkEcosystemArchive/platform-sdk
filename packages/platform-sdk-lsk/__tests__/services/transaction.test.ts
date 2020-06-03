import "jest-extended";

import { TransactionService } from "../../src/services/transaction";
import { identity } from "../__fixtures__/identity";
import { createConfig } from "../helpers";

let subject: TransactionService;

beforeEach(async () => (subject = await TransactionService.construct(createConfig())));

describe("TransactionService", () => {
	describe("#transfer", () => {
		it.each(["mainnet", "testnet", "betanet"])("should create for %s", async (network) => {
			const service = await TransactionService.construct(createConfig({ network }));

			const result: any = await service.transfer({
				sign: {
					mnemonic: identity.mnemonic,
				},
				data: {
					amount: "1",
					to: identity.address,
				},
			});

			expect(result).toBeObject();
		});
	});

	describe("#secondSignature", () => {
		it("should verify", async () => {
			const result: any = await subject.secondSignature({
				sign: {
					mnemonic: identity.mnemonic,
				},
				data: {
					mnemonic: identity.mnemonic,
				},
			});

			expect(result).toBeObject();
		});
	});

	describe("#delegateRegistration", () => {
		it("should verify", async () => {
			const result: any = await subject.delegateRegistration({
				sign: {
					mnemonic: identity.mnemonic,
				},
				data: {
					username: "johndoe",
				},
			});

			expect(result).toBeObject();
		});
	});

	describe("#vote", () => {
		it("should verify", async () => {
			const result: any = await subject.vote({
				sign: {
					mnemonic: identity.mnemonic,
				},
				data: {
					vote: "9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f",
				},
			});

			expect(result).toBeObject();
		});
	});

	describe("#multiSignature", () => {
		it("should verify", async () => {
			const result: any = await subject.multiSignature({
				sign: { mnemonic: identity.mnemonic },
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
