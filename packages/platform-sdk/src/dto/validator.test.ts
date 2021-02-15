import "jest-extended";

import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { AbstractValidatorData } from "./validator";

test("#id", () => {
	expect(new Validator({ key: "value" }).id()).toBeString();
});

test("#rank", () => {
	expect(new Validator({ key: "value" }).rank()).toBeNumber();
});

test("#stake", () => {
	expect(new Validator({ key: "value" }).stake()).toBeInstanceOf(BigNumber);
});

test("#delegationFee", () => {
	expect(new Validator({ key: "value" }).delegationFee()).toBeInstanceOf(BigNumber);
});

test("#startTime", () => {
	expect(new Validator({ key: "value" }).startTime()).toBeInstanceOf(DateTime);
});

test("#endTime", () => {
	expect(new Validator({ key: "value" }).endTime()).toBeInstanceOf(DateTime);
});

test("#toObject", () => {
	expect(new Validator({ key: "value" }).toObject()).toMatchInlineSnapshot(`
		Object {
		  "delegationFee": BigNumber {},
		  "endTime": "2021-01-01T12:00:00.000Z",
		  "id": "public-key",
		  "rank": 0,
		  "stake": BigNumber {},
		  "startTime": "2021-01-01T12:00:00.000Z",
		}
	`);
});

class Validator extends AbstractValidatorData {
	public id(): string {
		return "public-key";
	}

	public rank(): number {
		return 0;
	}

	public stake(): BigNumber | undefined {
		return BigNumber.ZERO;
	}

	public delegationFee(): BigNumber | undefined {
		return BigNumber.ZERO;
	}

	public startTime(): DateTime | undefined {
		return DateTime.make("2021-01-01 12:00");
	}

	public endTime(): DateTime | undefined {
		return DateTime.make("2021-01-01 12:00");
	}
}
