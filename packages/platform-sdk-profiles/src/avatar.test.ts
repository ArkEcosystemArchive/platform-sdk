import "jest-extended";

import { Avatar } from "../src/avatar";

test("#profiles", async () => {
	expect(Avatar.make("Hello World")).toMatchSnapshot();
});
