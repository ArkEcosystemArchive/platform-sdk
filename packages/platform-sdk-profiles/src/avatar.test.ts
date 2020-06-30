import "jest-extended";

import { Avatar } from "./avatar";

test("#profiles", async () => {
	expect(Avatar.make("Hello World")).toMatchSnapshot();
});
