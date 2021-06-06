import "jest-extended";

import { createService } from "../../test/helpers";
import { LinkService } from "./link";

let subject: LinkService;

beforeEach(async () => {
	subject = createService(LinkService);
});

it("should generate a link for a block", async () => {
	expect(subject.block("id")).toMatchInlineSnapshot(`"https://nanocrawler.cc/explorer/block/id"`);
});

it("should generate a link for a transaction", async () => {
	expect(subject.transaction("id")).toMatchInlineSnapshot(`"https://nanocrawler.cc/explorer/block/id"`);
});

it("should generate a link for a wallet", async () => {
	expect(subject.wallet("id")).toMatchInlineSnapshot(`"https://nanocrawler.cc/explorer/account/id"`);
});
