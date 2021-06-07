import "jest-extended";

import { Services } from "@arkecosystem/platform-sdk";
import { createService } from "../../test/helpers";

let subject: Services.AbstractLinkService;

beforeAll(async () => {
	subject = createService(Services.AbstractLinkService);
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
