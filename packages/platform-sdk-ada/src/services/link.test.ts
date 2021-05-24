import "jest-extended";

import { createConfig } from "../../test/helpers";
import { LinkService } from "./link";

let subject: LinkService;

beforeAll(async () => {
	subject = await LinkService.__construct(createConfig());
});

it("should generate a link for a block", async () => {
	expect(subject.block("id")).toMatchInlineSnapshot(`"https://shelleyexplorer.cardano.org/block/id"`);
});

it("should generate a link for a transaction", async () => {
	expect(subject.transaction("id")).toMatchInlineSnapshot(`"https://shelleyexplorer.cardano.org/tx/id"`);
});

it("should generate a link for a wallet", async () => {
	expect(subject.wallet("id")).toMatchInlineSnapshot(`"https://shelleyexplorer.cardano.org/address/id"`);
});
