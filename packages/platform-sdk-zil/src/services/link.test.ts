import "jest-extended";

import { createService } from "../../test/helpers";
import { LinkService } from "./link";

let subject: LinkService;

beforeEach(async () => {
	subject = createService(LinkService);
});

it("should generate a link for a block", async () => {
	expect(subject.block("id")).toMatchInlineSnapshot(`"https://viewblock.io/block/id?network=testnet"`);
});

it("should generate a link for a transaction", async () => {
	expect(subject.transaction("id")).toMatchInlineSnapshot(`"https://viewblock.io/tx/id?network=testnet"`);
});

it("should generate a link for a wallet", async () => {
	expect(subject.wallet("id")).toMatchInlineSnapshot(`"https://viewblock.io/address/id?network=testnet"`);
});
