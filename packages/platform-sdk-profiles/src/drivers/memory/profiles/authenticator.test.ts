import "jest-extended";
import "reflect-metadata";

import { bootContainer } from "../../../../test/helpers";
import { IProfile, ProfileSetting } from "../../../contracts";
import { State } from "../../../environment/state";
import { MemoryPassword } from "../../../helpers";
import { Authenticator } from "./authenticator";
import { Profile } from "./profile";

let subject: Authenticator;
let profile: IProfile;

beforeAll(() => bootContainer());

beforeEach(() => {
	profile = new Profile({ id: "uuid", name: "name", avatar: "avatar", data: "" });

	State.profile(profile);

	subject = new Authenticator();
});

it("should set the password", async () => {
	expect(profile.settings().get(ProfileSetting.Password)).toBeUndefined();

	expect(subject.setPassword("password")).toBeUndefined();

	expect(profile.settings().get(ProfileSetting.Password)).toBeString();
});

it("should verify the password", async () => {
	subject.setPassword("password");

	expect(subject.verifyPassword({ password: "password" })).toBeTrue();
	expect(subject.verifyPassword({ password: "invalid" })).toBeFalse();
});

it("should verify the password for a given profile", async () => {
	const passwordProtectedProfile = new Profile({
		id: "password-protected",
		name: "name",
		avatar: "avatar",
		password: "$2a$10$Qy/Mcjg2AAZ.Wqj7MUba4eQtNTC5c4Vh6SCWKezmolrp/58TlCA8u", // password
		data: "",
	});

	expect(subject.verifyPassword({ profile: passwordProtectedProfile, password: "password" })).toBeTrue();
	expect(subject.verifyPassword({ profile: passwordProtectedProfile, password: "invalid" })).toBeFalse();
});

it("should fail to verify the password for a profile that doesn't use a profile", async () => {
	expect(() => subject.verifyPassword({ password: "password" })).toThrow("No password is set.");
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

	expect(MemoryPassword.get()).toEqual("password");
});
