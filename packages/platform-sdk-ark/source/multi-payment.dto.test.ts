import "jest-extended";

import { createService } from "../test/helpers";
import { MultiPaymentData } from "./multi-payment";

let subject: MultiPaymentData;

beforeEach(() => {
	subject = createService(MultiPaymentData);
	subject.configure({
		asset: {
			payments: [
				{ to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9", amount: 10 },
				{ to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9", amount: 10 },
				{ to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9", amount: 10 },
			],
		},
	});
});

describe("MultiPaymentData", () => {
	test("#memo", () => {
		expect(subject.memo()).toBeUndefined();
	});

	test("#payments", () => {
		expect(subject.payments()).toBeArrayOfSize(3);
	});

	test("#type", () => {
		expect(subject.type()).toBe("transfer");
	});
});
