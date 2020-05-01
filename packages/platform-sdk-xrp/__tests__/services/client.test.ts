import "jest-extended";

import { BigNumber } from "@arkecosystem/utils";

import { ClientService } from "../../src/services/client";
import { WalletData, TransactionData } from "../../src/dto";

let subject: ClientService;

beforeEach(
	async () =>
		(subject = await ClientService.construct({
			peer: "wss://s.altnet.rippletest.net:51233",
		})),
);

describe("ClientService", function () {
	describe("#getTransaction", () => {
		it("should succeed", async () => {
			const result = await subject.getTransaction(
				"D9D4534A92E0639DA600494FA4DB10D1C6CA654C4576C1ED508B536DF797FBB9",
			);

			expect(result).toBeInstanceOf(TransactionData);
			expect(result.getId()).toBe("D9D4534A92E0639DA600494FA4DB10D1C6CA654C4576C1ED508B536DF797FBB9");
			// expect(result.getType()).toBeUndefined();
			// expect(result.getTypeGroup()).toBeUndefined();
			expect(result.getTimestamp()).toBe(1588147353000);
			expect(result.getConfirmations()).toEqual(BigNumber.ZERO);
			expect(result.getNonce()).toBe(1);
			expect(result.getSender()).toBe("rMWnHRpSWTYSsxbDjASvGvC31F4pRkyYHP");
			expect(result.getRecipient()).toBe("rHE2tehVYCGeMvi1gDEcYzQ7fpiCiYecAR");
			expect(result.getAmount()).toEqual(BigNumber.make(1000000));
			expect(result.getFee()).toEqual(BigNumber.make(1200));
			// expect(result.getVendorField()).toBeUndefined();
			// expect(result.getBlockId()).toBeUndefined();
		});
	});

	describe("#getTransactions", () => {
		it("should succeed", async () => {
			const result = await subject.getTransactions({ address: "rMWnHRpSWTYSsxbDjASvGvC31F4pRkyYHP" });

			expect(result.data).toBeArray();
			expect(result.data[0]).toBeInstanceOf(TransactionData);
		});
	});

	describe("#getWallet", () => {
		it("should succeed", async () => {
			const result = await subject.getWallet("rMWnHRpSWTYSsxbDjASvGvC31F4pRkyYHP");

			expect(result).toBeInstanceOf(WalletData);
			expect(result.getAddress()).toEqual("rMWnHRpSWTYSsxbDjASvGvC31F4pRkyYHP");
			// expect(result.getPublicKey()).toBeUndefined();
			expect(result.getBalance()).toEqual(BigNumber.make("101197997600"));
		});
	});
});
