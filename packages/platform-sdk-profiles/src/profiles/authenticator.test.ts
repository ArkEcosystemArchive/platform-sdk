import "jest-extended";

import { bootContainer } from "../../test/helpers";
import { MemoryPassword } from "../helpers/password";
import { Authenticator } from "./authenticator";
import { Profile } from "./profile";
import { ProfileSetting } from "./profile.models";

let subject: Authenticator;
let profile: Profile;

beforeAll(() => bootContainer());

beforeEach(() => {
	profile = new Profile({ id: "uuid", name: "name", avatar: "avatar", data: "" });
	subject = new Authenticator(profile);
});

it("should set the password", async () => {
	expect(profile.settings().get(ProfileSetting.Password)).toBeUndefined();

	expect(subject.setPassword("password")).toBeUndefined();

	expect(profile.settings().get(ProfileSetting.Password)).toBeString();
});

it("should verify the password", async () => {
	subject.setPassword("password");

	expect(subject.verifyPassword("password")).toBeTrue();
	expect(subject.verifyPassword("invalid")).toBeFalse();
});

it("should change the password", () => {
	subject.setPassword("old-password");

	const oldPassword = profile.settings().get(ProfileSetting.Password);

	expect(subject.changePassword("old-password", "new-password")).toBeUndefined();

	expect(profile.settings().get(ProfileSetting.Password)).not.toBe(oldPassword);
});

it("should fail to change the password if no password is set", () => {
	expect(() => subject.changePassword("old-password", "new-password")).toThrow("No password");
});

it("should fail to change the password if the old password is invalid", () => {
	subject.setPassword("old-password");

	expect(() => subject.changePassword("invalid-old-password", "new-password")).toThrow("does not match");
});

it("should set password in memory", () => {
	subject.setPassword("password");

	expect(MemoryPassword.get(profile)).toEqual("password");
});
