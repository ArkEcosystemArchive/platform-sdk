import "jest-extended";

import { BIP44 } from "./bip44";

const mnemonic = "TestingOneTwoThree";

test("#deriveChild", async () => {
	expect(
		BIP44.deriveChild("praise you muffin lion enable neck grocery crumble super myself license ghost", {
			coinType: 1,
		}).toBase58(),
	).toBe(
		"xprvA2hdDq2Hzo9LTv8NN925UXHToL1WbiGHkC7x64AUtoHQ5K7T1ZYkdXs5WFRKX7fx3vzVi4bTcAtpHqdpfVd1cVHuPU2bo1W3ozBJk1j9JXf",
	);
});

test("#deriveChildFromPath", async () => {
	expect(
		BIP44.deriveChildFromPath(
			"praise you muffin lion enable neck grocery crumble super myself license ghost",
			"m/0/0",
		).toBase58(),
	).toBe(
		"xprv9wMjT6HUeJy2LQqk1GRdSkiJRBxxurasRZ8aU2wBktamDQ282PM9t1cmxCf5bhUoz19KNJAwAYeTEExUkxzinFSb7bRDdnWcytMGj53aKcH",
	);
});

test("#stringify", async () => {
	expect(
		BIP44.stringify({
			purpose: 1,
			coinType: 2,
			account: 3,
			change: 4,
			index: 5,
		}),
	).toMatchInlineSnapshot(`"m/1'/2'/3'/4/5"`);
});
