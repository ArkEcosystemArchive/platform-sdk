import "jest-extended";

import { Profile } from "../profile";
import { CountAggregate } from "./count-aggregate";

let subject: CountAggregate;

beforeEach(async () => {
	subject = new CountAggregate(new Profile({ id: "uuid", data: "" }));
});

it.each(["contacts", "notifications", "wallets"])("should count %s", (method: string) => {
	expect(subject[method]()).toBeNumber();
});
