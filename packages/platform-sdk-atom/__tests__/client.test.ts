import "jest-extended";

import { BigNumber } from "@arkecosystem/utils";
import nock from "nock";

import { Client } from "../src/client";
import { Block, Delegate, Peer, Transaction, Wallet } from "../src/dto";

let subject: Client;

beforeEach(() => (subject = new Client("https://api.cosmos.network")));

beforeAll(() => nock.disableNetConnect());

describe("Client", function () {
	describe("#getTransaction", () => {
		it("should succeed", async () => {
			nock("https://api.cosmos.network/")
				.get("/txs/342C8CBA30B0C0AEF823ED153B2DD99A80CD3B48488DB97FB467474B3F029CEB")
				.reply(200, require(`${__dirname}/__fixtures__/client/getTransaction.json`));

			const result = await subject.getTransaction(
				"342C8CBA30B0C0AEF823ED153B2DD99A80CD3B48488DB97FB467474B3F029CEB",
			);

			expect(result).toBeInstanceOf(Transaction);
			expect(result.getId()).toBe("342C8CBA30B0C0AEF823ED153B2DD99A80CD3B48488DB97FB467474B3F029CEB");
			expect(result.getType()).toBeUndefined();
			expect(result.getTypeGroup()).toBeUndefined();
			expect(result.getTimestamp()).toBe(1587973063000);
			expect(result.getConfirmations()).toEqual(BigNumber.ZERO);
			expect(result.getNonce()).toBeUndefined();
			expect(result.getSender()).toBe("cosmos1jv65s3grqf6v6jl3dp4t6c9t9rk99cd88lyufl");
			expect(result.getRecipient()).toBe("cosmos1y6yvdel7zys8x60gz9067fjpcpygsn62ae9x46");
			expect(result.getAmount()).toBe("142uatom");
			expect(result.getFee()).toEqual(BigNumber.make(158014));
			expect(result.getVendorField()).toBe("Hello World");
			expect(result.getBlockId()).toBe("1672852");
		});
	});
});
