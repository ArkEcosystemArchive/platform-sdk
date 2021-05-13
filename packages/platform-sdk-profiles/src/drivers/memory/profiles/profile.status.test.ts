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

it("should mark as restored", async () => {
	expect(profile.status().isRestored()).toBeFalse();
	profile.status().markAsRestored();
	expect(profile.status().isRestored()).toBeTrue();
});

it("should reset profile status to default values", async () => {
	profile.status().markAsRestored();
	expect(profile.status().isRestored()).toBeTrue();
	profile.status().reset();
	expect(profile.status().isRestored()).toBeFalse();
});
