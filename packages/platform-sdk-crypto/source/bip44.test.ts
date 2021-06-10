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

test("#deriveChildWithPath", async () => {
	expect(
		BIP44.deriveChildWithPath("praise you muffin lion enable neck grocery crumble super myself license ghost", {
			purpose: 1,
			coinType: 2,
			account: 3,
			change: 4,
			index: 5,
		}),
	).toMatchInlineSnapshot(`
		Object {
		  "child": BIP32 {
		    "__D": Object {
		      "data": Array [
		        193,
		        169,
		        247,
		        170,
		        209,
		        177,
		        135,
		        144,
		        35,
		        79,
		        61,
		        128,
		        172,
		        224,
		        49,
		        152,
		        209,
		        121,
		        51,
		        20,
		        19,
		        163,
		        150,
		        15,
		        13,
		        12,
		        239,
		        237,
		        134,
		        108,
		        175,
		        153,
		      ],
		      "type": "Buffer",
		    },
		    "__DEPTH": 5,
		    "__INDEX": 5,
		    "__PARENT_FINGERPRINT": 2500390891,
		    "__Q": undefined,
		    "chainCode": Object {
		      "data": Array [
		        7,
		        48,
		        10,
		        240,
		        214,
		        120,
		        255,
		        19,
		        211,
		        191,
		        202,
		        155,
		        32,
		        175,
		        24,
		        176,
		        241,
		        93,
		        145,
		        129,
		        107,
		        24,
		        197,
		        106,
		        48,
		        222,
		        83,
		        142,
		        230,
		        46,
		        222,
		        11,
		      ],
		      "type": "Buffer",
		    },
		    "lowR": false,
		    "network": Object {
		      "bech32": "bc",
		      "bip32": Object {
		        "private": 76066276,
		        "public": 76067358,
		      },
		      "messagePrefix": "Bitcoin Signed Message:
		",
		      "pubKeyHash": 0,
		      "scriptHash": 5,
		      "wif": 128,
		    },
		  },
		  "path": "m/1'/2'/3'/4/5",
		}
	`);
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
