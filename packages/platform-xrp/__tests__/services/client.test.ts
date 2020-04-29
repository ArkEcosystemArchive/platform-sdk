import "jest-extended";
import nock from "nock";

import { BigNumber } from "@arkecosystem/utils";

import { ClientService } from "../../src/services/client";
import { DelegateData, WalletData, TransactionData } from "../../src/dto";

let subject: ClientService;

beforeEach(async () => (subject = await ClientService.new("wss://s.altnet.rippletest.net:51233", false)));

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

describe("ClientService", function () {
	describe("#getTransaction", () => {
		it("should succeed", async () => {
			nock("https://data.ripple.com/v2")
				.get("/transactions/3B1A4E1C9BB6A7208EB146BCDB86ECEA6068ED01466D933528CA2B4C64F753EF")
				.reply(200, require(`${__dirname}/../__fixtures__/client/getTransaction.json`));

			const result = await subject.getTransaction(
				"3B1A4E1C9BB6A7208EB146BCDB86ECEA6068ED01466D933528CA2B4C64F753EF",
			);

			expect(result).toBeInstanceOf(TransactionData);
			expect(result.getId()).toBe("3B1A4E1C9BB6A7208EB146BCDB86ECEA6068ED01466D933528CA2B4C64F753EF");
			// expect(result.getType()).toBeUndefined();
			// expect(result.getTypeGroup()).toBeUndefined();
			expect(result.getTimestamp()).toBe(1357109000000);
			expect(result.getConfirmations()).toEqual(BigNumber.ZERO);
			expect(result.getNonce()).toBe(62);
			expect(result.getSender()).toBe("r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV");
			expect(result.getRecipient()).toBe("rLQBHVhFnaC5gLEkgr6HgBJJ3bgeZHg9cj");
			expect(result.getAmount()).toEqual(BigNumber.make("10000000000"));
			expect(result.getFee()).toEqual(BigNumber.make(10));
			// expect(result.getVendorField()).toBeUndefined();
			// expect(result.getBlockId()).toBeUndefined();
		});
	});

	describe("#getTransactions", () => {
		it("should succeed", async () => {
			nock("https://data.ripple.com/v2")
				.get("/accounts/r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV/transactions")
				.reply(200, require(`${__dirname}/../__fixtures__/client/getTransactions.json`));

			const result = await subject.getTransactions({ address: "r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV" });

			expect(result.data).toBeArray();
			expect(result.data[0]).toBeInstanceOf(TransactionData);
		});
	});

	describe("#getWallet", () => {
		it("should succeed", async () => {
			nock("https://data.ripple.com/v2")
				.get("/accounts/rB31eWvkfKBAu6FDD9zgnzT4RwSfXGcqPm")
				.reply(200, require(`${__dirname}/../__fixtures__/client/getWallet.json`))
				.get("/accounts/rB31eWvkfKBAu6FDD9zgnzT4RwSfXGcqPm/balances?currency=XRP")
				.reply(200, require(`${__dirname}/../__fixtures__/client/getWalletBalances.json`));

			const result = await subject.getWallet("rB31eWvkfKBAu6FDD9zgnzT4RwSfXGcqPm");

			expect(result).toBeInstanceOf(WalletData);
			expect(result.getAddress()).toEqual("rB31eWvkfKBAu6FDD9zgnzT4RwSfXGcqPm");
			// expect(result.getPublicKey()).toBeUndefined();
			expect(result.getBalance()).toEqual(BigNumber.make("758662953600"));
		});
	});

	describe("#getWallets", () => {
		it("should succeed", async () => {
			nock("https://data.ripple.com/v2")
				.get("/accounts")
				.reply(200, require(`${__dirname}/../__fixtures__/client/getWallets.json`));

			const result = await subject.getWallets();

			expect(result.data).toBeArray();
			expect(result.data[0]).toBeInstanceOf(WalletData);
		});
	});

	describe("#getDelegate", () => {
		it("should succeed", async () => {
			nock("https://data.ripple.com/v2")
				.get("/network/validators/nHBidG3pZK11zQD6kpNDoAhDxH6WLGui6ZxSbUx7LSqLHsgzMPec")
				.reply(200, require(`${__dirname}/../__fixtures__/client/getDelegate.json`));

			const result = await subject.getDelegate("nHBidG3pZK11zQD6kpNDoAhDxH6WLGui6ZxSbUx7LSqLHsgzMPec");

			expect(result).toBeInstanceOf(DelegateData);
			// expect(result.getAddress()).toBeUndefined();
			expect(result.getPublicKey()).toBe("nHBidG3pZK11zQD6kpNDoAhDxH6WLGui6ZxSbUx7LSqLHsgzMPec");
		});
	});

	describe("#getDelegates", () => {
		it("should succeed", async () => {
			nock("https://data.ripple.com/v2")
				.get("/network/validators")
				.reply(200, require(`${__dirname}/../__fixtures__/client/getDelegates.json`));

			const result = await subject.getDelegates();

			expect(result.data).toBeArray();
			expect(result.data[0]).toBeInstanceOf(DelegateData);
		});
	});
});
