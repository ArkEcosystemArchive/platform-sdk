import "jest-extended";

import wif from "wif";

import { BIP38 } from "./bip38";

const mnemonic = "TestingOneTwoThree";

test("#encrypt", async () => {
	const { compressed, privateKey } = wif.decode("5KN7MzqK5wt2TP1fQCYyHBtDrXdJuXbUzm4A9rKAteGu3Qi5CVR");

	expect(BIP38.encrypt(privateKey, mnemonic, compressed)).toBe(
		"6PRVWUbkzzsbcVac2qwfssoUJAN1Xhrg6bNk8J7Nzm5H7kxEbn2Nh2ZoGg",
	);
});

test("#decrypt", async () => {
	expect(BIP38.decrypt("6PRVWUbkzzsbcVac2qwfssoUJAN1Xhrg6bNk8J7Nzm5H7kxEbn2Nh2ZoGg", mnemonic)).toEqual({
		compressed: false,
		privateKey: "cbf4b9f70470856bb4f40f80b87edb90865997ffee6df315ab166d713af433a5",
	});
});

test("#verify", async () => {
	expect(BIP38.verify("6PRVWUbkzzsbcVac2qwfssoUJAN1Xhrg6bNk8J7Nzm5H7kxEbn2Nh2ZoGg")).toBeTrue();
});
