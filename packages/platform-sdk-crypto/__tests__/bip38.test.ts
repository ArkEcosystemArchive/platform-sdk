import "jest-extended";
import wif from "wif";

import { BIP38 } from "../src/bip38";

const passphrase: string = "TestingOneTwoThree";

test("#encrypt", async () => {
	// @ts-ignore
	const { compressed, privateKey } = wif.decode("5KN7MzqK5wt2TP1fQCYyHBtDrXdJuXbUzm4A9rKAteGu3Qi5CVR");

	expect(BIP38.encrypt(privateKey, passphrase, compressed)).toBe(
		"6PRVWUbkzzsbcVac2qwfssoUJAN1Xhrg6bNk8J7Nzm5H7kxEbn2Nh2ZoGg",
	);
});
