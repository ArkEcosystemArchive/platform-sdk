import "jest-extended";
import "reflect-metadata";

import { Base64 } from "@arkecosystem/platform-sdk-crypto";
import { bootContainer } from "../../../../test/helpers";
import { Profile } from "./profile";
import { IProfile } from "../../../contracts";

let profile: IProfile;

beforeAll(() => bootContainer());

beforeEach(async () => {
	profile = new Profile({ id: "id", name: "name", avatar: "avatar", data: Base64.encode("{}") });
});

it("should mark the profile as dirty", async () => {
	expect(profile.status().isDirty()).toBeFalse();
	profile.status().markAsDirty();
	expect(profile.status().isDirty()).toBeTrue();
});

it("should mark the profile as restored", async () => {
	expect(profile.status().isRestored()).toBeFalse();
	profile.status().markAsRestored();
	expect(profile.status().isRestored()).toBeTrue();
});

it("should reset the status of the profile to the default values", async () => {
	profile.status().markAsRestored();
	expect(profile.status().isRestored()).toBeTrue();
	profile.status().reset();
	expect(profile.status().isRestored()).toBeFalse();
});

it("should reset dirty status", async () => {
	profile.status().markAsDirty();
	expect(profile.status().isDirty()).toBeTrue();
	profile.status().resetDirty();
	expect(profile.status().isDirty()).toBeFalse();
});
