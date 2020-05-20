import "jest-extended";

import { Environment } from "../src/env";
import { Profiles } from "../src/profiles";
import { Settings } from "../src/settings";

let subject: Environment;

beforeEach(() => (subject = new Environment({ storage: "localstorage" })));

test("Environment#profiles", async () => {
	expect(subject.profiles()).toBeInstanceOf(Profiles);
});

test("Environment#settings", async () => {
	expect(subject.settings()).toBeInstanceOf(Settings);
});
