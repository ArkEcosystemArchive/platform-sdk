import "jest-extended";
import "reflect-metadata";

import { bootContainer } from "../../test/helpers";
import { Profile } from "../drivers/memory/profiles/profile";
import { container } from "./container";
import { State as Identifiers } from "./container.models";
import { State } from "./state";

beforeAll(() => bootContainer());

beforeEach(() => {
	if (container.has(Identifiers.Profile)) {
		container.unbind(Identifiers.Profile);
	}
});

it("should bind the profile", async () => {
	const profile = new Profile({ id: "uuid", name: "name", data: "" })

	const mockBind = jest.spyOn(container, "bind");

	State.profile(profile);

	expect(mockBind).toHaveBeenCalledTimes(1);
});

it("should rebind the profile", async () => {
	const profile = new Profile({ id: "uuid", name: "name", data: "" })

	const mockRebind = jest.spyOn(container, "rebind");

	State.profile(profile);
	State.profile(profile);

	expect(mockRebind).toHaveBeenCalledTimes(1);
});

it("should unbind the profile", async () => {
	const profile = new Profile({ id: "uuid", name: "name", data: "" })

	const mockUnbind = jest.spyOn(container, "unbind");

	State.profile(profile);
	State.reset();

	expect(mockUnbind).toHaveBeenCalledTimes(1);
});

it("should throw if no profile is set when trying to get it", async () => {
	expect(() => State.profile()).toThrow("There is no active profile.");
});

it("should throw if no profile is set when trying to forget it", async () => {
	expect(() => State.reset()).toThrow("There is no active profile.");
});
