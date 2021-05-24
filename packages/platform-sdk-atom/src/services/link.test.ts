import "jest-extended";

import { createConfig } from "../../test/helpers";
import { LinkService } from "./link";

let subject: LinkService;

beforeAll(async () => {
	subject = await LinkService.__construct(createConfig());
});

it("should generate a link for a block", async () => {
	expect(subject.block("id")).toMatchInlineSnapshot(`"https://gaia.stake.id/blocks/id"`);
});

it("should generate a link for a transaction", async () => {
	expect(subject.transaction("id")).toMatchInlineSnapshot(`"https://gaia.stake.id/transactions/id"`);
});

it("should generate a link for a wallet", async () => {
	expect(subject.wallet("id")).toMatchInlineSnapshot(`"https://gaia.stake.id/account/id"`);
});
