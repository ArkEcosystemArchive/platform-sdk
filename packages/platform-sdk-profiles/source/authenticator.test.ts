import "jest-extended";
import "reflect-metadata";

import { bootContainer } from "../test/mocking";
import { IProfile, ProfileSetting } from "./contracts";
import { Authenticator } from "./authenticator";
import { Profile } from "./profile";
import { ProfileExporter } from "./profile.exporter";

let subject: Authenticator;
let profile: IProfile;

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

it("should fail to verify the password for a profile that doesn't use a profile", async () => {
	expect(() => subject.verifyPassword("password")).toThrow("No password is set.");
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

	expect(profile.password().get()).toEqual("password");
});

it("should forget the password", () => {
	expect(profile.usesPassword()).toBeFalse();
	const firstExport = new ProfileExporter(profile).export();
	expect(firstExport).toMatchSnapshot();

	subject.setPassword("old-password");

	expect(profile.usesPassword()).toBeTrue();
	expect(new ProfileExporter(profile).export().length > firstExport.length * 2).toBeTrue();

	subject.forgetPassword("old-password");

	expect(profile.usesPassword()).toBeFalse();
	expect(new ProfileExporter(profile).export().length <= firstExport.length).toBeTrue();
});
