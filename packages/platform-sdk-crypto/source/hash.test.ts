import "jest-extended";

import { Hash } from "./hash";

test("#ripemd160", () => {
	expect(Hash.ripemd160("Hello World")).toMatchInlineSnapshot(`
		Object {
		  "data": Array [
		    168,
		    48,
		    215,
		    190,
		    176,
		    78,
		    183,
		    84,
		    156,
		    233,
		    144,
		    251,
		    125,
		    201,
		    98,
		    228,
		    153,
		    162,
		    114,
		    48,
		  ],
		  "type": "Buffer",
		}
	`);
});

test("#sha1", () => {
	expect(Hash.sha1("Hello World")).toMatchInlineSnapshot(`
		Object {
		  "data": Array [
		    10,
		    77,
		    85,
		    168,
		    215,
		    120,
		    229,
		    2,
		    47,
		    171,
		    112,
		    25,
		    119,
		    197,
		    216,
		    64,
		    187,
		    196,
		    134,
		    208,
		  ],
		  "type": "Buffer",
		}
	`);
});

test("#sha256", () => {
	expect(Hash.sha256("Hello World")).toMatchInlineSnapshot(`
		Object {
		  "data": Array [
		    165,
		    145,
		    166,
		    212,
		    11,
		    244,
		    32,
		    64,
		    74,
		    1,
		    23,
		    51,
		    207,
		    183,
		    177,
		    144,
		    214,
		    44,
		    101,
		    191,
		    11,
		    205,
		    163,
		    43,
		    87,
		    178,
		    119,
		    217,
		    173,
		    159,
		    20,
		    110,
		  ],
		  "type": "Buffer",
		}
	`);
});

test("#hash160", () => {
	expect(Hash.hash160("Hello World")).toMatchInlineSnapshot(`
		Object {
		  "data": Array [
		    189,
		    251,
		    105,
		    85,
		    121,
		    102,
		    208,
		    38,
		    151,
		    91,
		    235,
		    233,
		    20,
		    105,
		    43,
		    240,
		    132,
		    144,
		    216,
		    202,
		  ],
		  "type": "Buffer",
		}
	`);
});

test("#hash256", () => {
	expect(Hash.hash256("Hello World")).toMatchInlineSnapshot(`
		Object {
		  "data": Array [
		    66,
		    168,
		    115,
		    172,
		    58,
		    189,
		    2,
		    18,
		    45,
		    39,
		    232,
		    4,
		    134,
		    198,
		    250,
		    30,
		    247,
		    134,
		    148,
		    232,
		    80,
		    95,
		    206,
		    201,
		    203,
		    204,
		    138,
		    119,
		    40,
		    186,
		    137,
		    73,
		  ],
		  "type": "Buffer",
		}
	`);
});
