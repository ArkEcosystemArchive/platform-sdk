import "jest-extended";
import "reflect-metadata";

import { bootContainer } from "../../../../../test/helpers";
import { State } from "../../../../environment/state";
import { Profile } from "../profile";
import { CountAggregate } from "./count-aggregate";

let subject: CountAggregate;

beforeAll(() => bootContainer());

beforeEach(async () => {
	State.profile(new Profile({ id: "uuid", name: "name", avatar: "avatar", data: "" }));

	subject = new CountAggregate();
});

it.each(["contacts", "notifications", "wallets"])("should count %s", (method: string) => {
	expect(subject[method]()).toBeNumber();
});
