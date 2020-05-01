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

describe.skip("ClientService", function () {
	describe("#transaction", () => {
		it("should succeed", async () => {
			const result = await subject.transaction(
				"D9D4534A92E0639DA600494FA4DB10D1C6CA654C4576C1ED508B536DF797FBB9",
			);

			expect(result).toBeInstanceOf(TransactionData);
			expect(result.id()).toBe("D9D4534A92E0639DA600494FA4DB10D1C6CA654C4576C1ED508B536DF797FBB9");
			// expect(result.type()).toBeUndefined();
			// expect(result.typeGroup()).toBeUndefined();
			expect(result.timestamp()).toBe(1588147353000);
			expect(result.confirmations()).toEqual(BigNumber.ZERO);
			expect(result.nonce()).toBe(1);
			expect(result.sender()).toBe("rMWnHRpSWTYSsxbDjASvGvC31F4pRkyYHP");
			expect(result.recipient()).toBe("rHE2tehVYCGeMvi1gDEcYzQ7fpiCiYecAR");
			expect(result.amount()).toEqual(BigNumber.make(1000000));
			expect(result.fee()).toEqual(BigNumber.make(1200));
			// expect(result.memo()).toBeUndefined();
			// expect(result.blockId()).toBeUndefined();
		});
	});

	// todo: always results in "MissingLedgerHistoryError: Server is missing ledger history in the specified range"
	describe("#transactions", () => {
		it("should succeed", async () => {
			const result = await subject.transactions({
				address: "rMWnHRpSWTYSsxbDjASvGvC31F4pRkyYHP",
			});

			expect(result.data).toBeArray();
			expect(result.data[0]).toBeInstanceOf(TransactionData);
		});
	});

	describe("#wallet", () => {
		it("should succeed", async () => {
			const result = await subject.wallet("rMWnHRpSWTYSsxbDjASvGvC31F4pRkyYHP");

			expect(result).toBeInstanceOf(WalletData);
			expect(result.address()).toEqual("rMWnHRpSWTYSsxbDjASvGvC31F4pRkyYHP");
			// expect(result.publicKey()).toBeUndefined();
			expect(result.balance()).toEqual(BigNumber.make("101197997600"));
		});
	});
});
