import "jest-extended";

import { Environment } from "../src";
import { DataRepository } from "../src/repositories/data-repository";
import { ProfileRepository } from "../src/repositories/profile-repository";
import { HttpClient } from "./stubs/client";

let subject: Environment;

beforeAll(() => (subject = new Environment({ httpClient: new HttpClient(), storage: "localstorage" })));

test("Environment#profiles", async () => {
	expect(subject.profiles()).toBeInstanceOf(ProfileRepository);
});

test("Environment#data", async () => {
	expect(subject.data()).toBeInstanceOf(DataRepository);
});
