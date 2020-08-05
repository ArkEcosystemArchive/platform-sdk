import "jest-extended";

import { Profile } from "../profile";
import { CountAggregate } from "./count-aggregate";

let subject: CountAggregate;

beforeEach(async () => {
	subject = new CountAggregate(new Profile("uuid"));
});

it.each(["contacts", "notifications", "wallets"])("should count %s", (method: string) => {
	expect(subject[method]()).toBeNumber();
});
