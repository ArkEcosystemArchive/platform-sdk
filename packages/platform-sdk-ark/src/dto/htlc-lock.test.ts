import "jest-extended";
import { createService } from "../../test/helpers";

import { HtlcLockData } from "./htlc-lock";

let subject: HtlcLockData;

beforeEach(() => {
	subject = createService(HtlcLockData);
	subject.configure({
		asset: {
			lock: {
				amount: 1,
				to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
				secretHash: "0f128d401958b1b30ad0d10406f47f9489321017b4614e6cb993fc63913c5454",
				expiration: {
					type: 1,
					value: 123456789,
				},
			},
		},
	});
});

describe("HtlcLockData", () => {
	test("#secretHash", () => {
		expect(subject.secretHash()).toBe("0f128d401958b1b30ad0d10406f47f9489321017b4614e6cb993fc63913c5454");
	});

	test("#expirationType", () => {
		expect(subject.expirationType()).toBe(1);
	});

	test("#expirationValue", () => {
		expect(subject.expirationValue()).toBe(123456789);
	});

	test("#type", () => {
		expect(subject.type()).toBe("transfer");
	});
});
