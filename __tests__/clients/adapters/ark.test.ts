import "jest-extended";

import { Ark } from "../../../src/clients/adapters/ark";
import { Block, Transaction, Wallet } from "../../../src/clients/adapters/ark/dto";

let subject: Ark;

beforeEach(() => (subject = new Ark("https://dexplorer.ark.io/api")));

describe("Ark", function () {
	describe("#getBlock", () => {
		it("should succeed", async () => {
			const result = await subject.getBlock("13114381566690093367");

			expect(result).toBeInstanceOf(Block);
		});
	});

	describe("#getBlocks", () => {
		it("should succeed", async () => {
			const result = await subject.getBlocks();

			expect(result).toBeArray();
			expect(result[0]).toBeInstanceOf(Block);
		});
	});

	describe("#getTransaction", () => {
		it("should succeed", async () => {
			const result = await subject.getTransaction(
				"3e3817fd0c35bc36674f3874c2953fa3e35877cbcdb44a08bdc6083dbd39d572",
			);

			expect(result).toBeInstanceOf(Transaction);
		});
	});

	describe("#getTransactions", () => {
		it("should succeed", async () => {
			const result = await subject.getTransactions();

			expect(result).toBeArray();
			expect(result[0]).toBeInstanceOf(Transaction);
		});
	});

	describe("#getWallet", () => {
		it("should succeed", async () => {
			const result = await subject.getWallet("D6Z26L69gdk9qYmTv5uzk3uGepigtHY4ax");

			expect(result).toBeInstanceOf(Wallet);
		});
	});

	describe("#getWallets", () => {
		it("should succeed", async () => {
			const result = await subject.getWallets();

			expect(result).toBeArray();
			expect(result[0]).toBeInstanceOf(Wallet);
		});
	});
});
