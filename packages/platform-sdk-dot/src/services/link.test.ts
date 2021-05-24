import "jest-extended";

import { createConfig } from "../../test/helpers";
import { LinkService } from "./link";

let subject: LinkService;

beforeAll(async () => {
	subject = await LinkService.__construct(createConfig());
});

it("should generate a link for a block", async () => {
	expect(subject.block("id")).toMatchInlineSnapshot(`"https://polkascan.io/block/id"`);
});

it("should generate a link for a transaction", async () => {
	expect(subject.transaction("id")).toMatchInlineSnapshot(`"https://polkascan.io/tx/id"`);
});

it("should generate a link for a wallet", async () => {
	expect(subject.wallet("id")).toMatchInlineSnapshot(`"https://polkascan.io/address/id"`);
});
