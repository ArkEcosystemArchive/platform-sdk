import "jest-extended";
import "reflect-metadata";

import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { AbstractSignedTransactionData } from "./signed-transaction";

test("#setAttributes", () => {
	let transaction = new Transaction().configure("id", { key: "value" }, "");
	expect(transaction.id()).toBe("id");

	transaction.setAttributes({ identifier: "new" });
	expect(transaction.id()).toBe("new");

	transaction = new Transaction().configure("id", { key: "value" }, "", 2);
	expect(transaction).toBeInstanceOf(Transaction);

	transaction = new Transaction().configure("id", { key: "value" }, "", "2");
	expect(transaction).toBeInstanceOf(Transaction);
});

test("#id", () => {
	expect(new Transaction().configure("id", { key: "value" }, "").id()).toBe("id");
});

test("#data", () => {
	expect(new Transaction().configure("id", { key: "value" }, "").blockId()).toBe("blockId");
});

test("#sender", () => {
	expect(new Transaction().configure("id", { key: "value" }, "").sender()).toBe("sender");
});

test("#recipient", () => {
	expect(new Transaction().configure("id", { key: "value" }, "").recipient()).toBe("recipient");
});

test("#amount", () => {
	expect(new Transaction().configure("id", { key: "value" }, "").amount()).toBe(BigNumber.ZERO);
});

test("#fee", () => {
	expect(new Transaction().configure("id", { key: "value" }, "").fee()).toBe(BigNumber.ZERO);
});

test("#timestamp", () => {
	expect(new Transaction().configure("id", { key: "value" }, "").timestamp()).toEqual(DateTime.make(0));
});

test("#get", () => {
	expect(new Transaction().configure("id", { key: "value" }, "").get("key")).toBe("value");
});

test("#toString", () => {
	expect(new Transaction().configure("id", JSON.stringify({ key: "value" }), "").toString()).toMatchInlineSnapshot(
		`"{\\"key\\":\\"value\\"}"`,
	);
	expect(new Transaction().configure("id", { key: "value" }, "").toString()).toMatchInlineSnapshot(
		`"{\\"key\\":\\"value\\"}"`,
	);
});

test("#toObject", () => {
	expect(new Transaction().configure("id", { key: "value" }, "").toObject()).toMatchInlineSnapshot(`
		Object {
		  "amount": "0",
		  "broadcast": "",
		  "data": Object {
		    "key": "value",
		  },
		  "fee": "0",
		  "id": "id",
		  "recipient": "recipient",
		  "sender": "sender",
		  "timestamp": "1970-01-01T00:00:00.000Z",
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

	public timestamp(): DateTime {
		return DateTime.make(0);
	}
}
