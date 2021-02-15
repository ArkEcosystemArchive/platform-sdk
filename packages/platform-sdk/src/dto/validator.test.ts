import "jest-extended";

import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { AbstractValidatorData } from "./validator";

test("#id", () => {
	expect(new Validator({ key: "value" }).id()).toBeString();
});

test("#alias", () => {
	expect(new Validator({ key: "value" }).alias()).toBeString();
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

test("#toObject", () => {
	expect(new Validator({ key: "value" }).toObject()).toMatchInlineSnapshot(`
		Object {
		  "delegationFee": BigNumber {},
		  "id": "public-key",
		  "rank": 0,
		  "stake": BigNumber {},
		}
	`);
});

class Validator extends AbstractValidatorData {
	public id(): string {
		return "public-key";
	}

	public alias(): string {
		return "alias";
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
}
