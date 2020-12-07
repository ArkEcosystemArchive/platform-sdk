import "jest-extended";

import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { AbstractSignedTransactionData } from "./signed-transaction";

test("#id", () => {
	expect(new Transaction("id", { key: "value" }).id()).toBe("id");
});

test("#data", () => {
	expect(new Transaction("id", { key: "value" }).blockId()).toBe("blockId");
});

test("#sender", () => {
	expect(new Transaction("id", { key: "value" }).sender()).toBe("sender");
});

test("#recipient", () => {
	expect(new Transaction("id", { key: "value" }).recipient()).toBe("recipient");
});

test("#amount", () => {
	expect(new Transaction("id", { key: "value" }).amount()).toBe(BigNumber.ZERO);
});

test("#fee", () => {
	expect(new Transaction("id", { key: "value" }).fee()).toBe(BigNumber.ZERO);
});

test("#get", () => {
	expect(new Transaction("id", { key: "value" }).get('key')).toBe('value');
});

test("#toString", () => {
	expect(new Transaction("id", JSON.stringify({ key: "value" })).toString()).toMatchInlineSnapshot(`"{\\"key\\":\\"value\\"}"`);
	expect(new Transaction("id", { key: "value" }).toString()).toMatchInlineSnapshot(`"{\\"key\\":\\"value\\"}"`);
});

test("#toObject", () => {
	expect(new Transaction("id", { key: "value" }).toObject()).toMatchInlineSnapshot(`
		Object {
		  "amount": "0",
		  "data": Object {
		    "key": "value",
		  },
		  "fee": "0",
		  "id": "id",
		  "recipient": "recipient",
		  "sender": "sender",
		}
	`);
});

class Transaction extends AbstractSignedTransactionData {
	public blockId(): string | undefined {
		return "blockId";
	}

	public sender(): string {
		return "sender";
	}

	public recipient(): string {
		return "recipient";
	}

	public amount(): BigNumber {
		return BigNumber.ZERO;
	}

	public fee(): BigNumber {
		return BigNumber.ZERO;
	}
}
