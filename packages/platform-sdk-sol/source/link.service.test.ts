import "jest-extended";

import { Services } from "@arkecosystem/platform-sdk";

import { createService } from "../test/mocking";

let subject: Services.AbstractLinkService;

beforeAll(async () => {
	subject = createService(Services.AbstractLinkService);
});

it("should generate a link for a block", async () => {
	expect(subject.block("id")).toMatchInlineSnapshot(`"https://explorer.solana.com/block/id?cluster=testnet"`);
});

it("should generate a link for a transaction", async () => {
	expect(subject.transaction("id")).toMatchInlineSnapshot(`"https://explorer.solana.com/tx/id?cluster=testnet"`);
});

it("should generate a link for a wallet", async () => {
	expect(subject.wallet("id")).toMatchInlineSnapshot(`"https://explorer.solana.com/address/id?cluster=testnet"`);
});
