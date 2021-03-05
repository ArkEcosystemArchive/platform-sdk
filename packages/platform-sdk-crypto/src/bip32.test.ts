import "jest-extended";

import { BIP32 } from "./bip32";

const mnemonic = "TestingOneTwoThree";

test("#fromMnemonic", async () => {
	expect(
		BIP32.fromMnemonic("praise you muffin lion enable neck grocery crumble super myself license ghost").toBase58(),
	).toBe(
		"xprv9s21ZrQH143K4DRBUU8Dp25M61mtjm9T3LsdLLFCXL2U6AiKEqs7dtCJWGFcDJ9DtHpdwwmoqLgzPrW7unpwUyL49FZvut9xUzpNB6wbEnz",
	);
});
