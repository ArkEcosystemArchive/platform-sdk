import "jest-extended";

import { Environment } from "../src/env";
import { Profiles } from "../src/profiles";
import { Settings } from "../src/settings";
import { HttpClient } from "./stubs/client";

let subject: Environment;

beforeEach(() => (subject = new Environment({ httpClient: new HttpClient(), storage: "localstorage" })));

test("Environment#profiles", async () => {
	expect(subject.profiles()).toBeInstanceOf(Profiles);
});

test("Environment#settings", async () => {
	expect(subject.settings()).toBeInstanceOf(Settings);
});
