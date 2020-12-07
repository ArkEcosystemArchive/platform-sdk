import "jest-extended";

import { Arr } from "./arr";

test("#randomElement", () => {
	const data = [...Array(1000).keys()];

	expect(Arr.randomElement(data)).not.toBe(Arr.randomElement(data));
});
