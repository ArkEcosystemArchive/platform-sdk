import "jest-extended";

import { WIF } from "./wif";

test("#encode", () => {
	expect(
		WIF.encode({
			version: 1,
			privateKey: "d8839c2432bfd0a67ef10a804ba991eabba19f154a3d707917681d45822a5712",
			compressed: true,
		}),
	).toMatchInlineSnapshot(`"GqWL4nXjDSjBfMvK95GK6d8zm3v8XQoM7T6VKmCAEtAL4tTtaWt"`);
});

test("#decode", () => {
	expect(WIF.decode("SGq4xLgZKCGxs7bjmwnBrWcT4C1ADFEermj846KC97FSv1WFD1dA")).toMatchInlineSnapshot(`
		Object {
		  "compressed": true,
		  "privateKey": Object {
		    "data": Array [
		      216,
		      131,
		      156,
		      36,
		      50,
		      191,
		      208,
		      166,
		      126,
		      241,
		      10,
		      128,
		      75,
		      169,
		      145,
		      234,
		      187,
		      161,
		      159,
		      21,
		      74,
		      61,
		      112,
		      121,
		      23,
		      104,
		      29,
		      69,
		      130,
		      42,
		      87,
		      18,
		    ],
		    "type": "Buffer",
		  },
		  "version": 170,
		}
	`);
});
