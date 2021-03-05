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

test("#deriveMasterKey", async () => {
	expect(
		BIP44.deriveMasterKey(
			"praise you muffin lion enable neck grocery crumble super myself license ghost",
		).toBase58(),
	).toBe(
		"xprv9s21ZrQH143K4DRBUU8Dp25M61mtjm9T3LsdLLFCXL2U6AiKEqs7dtCJWGFcDJ9DtHpdwwmoqLgzPrW7unpwUyL49FZvut9xUzpNB6wbEnz",
	);
});
