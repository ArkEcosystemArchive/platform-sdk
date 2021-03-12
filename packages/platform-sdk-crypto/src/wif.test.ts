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
		  "privateKey": "d8839c2432bfd0a67ef10a804ba991eabba19f154a3d707917681d45822a5712",
		  "version": 170,
		}
	`);
});
