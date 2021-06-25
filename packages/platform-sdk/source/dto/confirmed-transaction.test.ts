/* eslint-disable */

import "jest-extended";
import "reflect-metadata";

import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { MultiPaymentRecipient, UnspentTransactionData } from "../contracts";
import { AbstractConfirmedTransactionData } from "./confirmed-transaction";

test("#withDecimals", () => {
	expect(new Transaction().configure({ key: "value" }).withDecimals(2)).toBeInstanceOf(Transaction);
	expect(new Transaction().configure({ key: "value" }).withDecimals("2")).toBeInstanceOf(Transaction);
});

test("#id", () => {
	expect(new Transaction().configure({ key: "value" }).id()).toBe("id");
});

test("#blockId", () => {
	expect(new Transaction().configure({ key: "value" }).blockId()).toBe("blockId");
});

test("#type", () => {
	const subject = new Transaction().configure({ key: "value" });

	expect(subject.type()).toBe("transfer");

	jest.spyOn(subject, "isMagistrate").mockReturnValue(true);

	expect(subject.type()).toBe("magistrate");
});

test("#timestamp", () => {
	expect(new Transaction().configure({ key: "value" }).timestamp()).toBeUndefined();
});

test("#confirmations", () => {
	expect(new Transaction().configure({ key: "value" }).confirmations()).toBe(BigNumber.ZERO);
});

test("#sender", () => {
	expect(new Transaction().configure({ key: "value" }).sender()).toBe("sender");
});

test("#recipient", () => {
	expect(new Transaction().configure({ key: "value" }).recipient()).toBe("recipient");
});

test("#recipients", () => {
	expect(new Transaction().configure({ key: "value" }).recipients()).toEqual([]);
});

test("#amount", () => {
	expect(new Transaction().configure({ key: "value" }).amount()).toBe(BigNumber.ZERO);
});

test("#fee", () => {
	expect(new Transaction().configure({ key: "value" }).fee()).toBe(BigNumber.ZERO);
});

test("#memo", () => {
	expect(new Transaction().configure({ key: "value" }).memo()).toBe("memo");
	expect(new Transaction().configure({ memo: "" }).memo()).toBeUndefined();
	expect(new Transaction().configure({ memo: "pedo" }).memo()).toBe("****");
	expect(new Transaction().configure({ memo: "pedophile" }).memo()).toBe("*********");
	expect(new Transaction().configure({ memo: "zyva.org" }).memo()).toBeUndefined();
});

test("#asset", () => {
	expect(new Transaction().configure({ key: "value" }).asset()).toEqual({});
});

test("#isConfirmed", () => {
	expect(new Transaction().configure({ key: "value" }).isConfirmed()).toBeFalse();
});

test("#isSent", () => {
	expect(new Transaction().configure({ key: "value" }).isSent()).toBeFalse();
});

test("#isReceived", () => {
	expect(new Transaction().configure({ key: "value" }).isReceived()).toBeFalse();
});

test("#isTransfer", () => {
	expect(new Transaction().configure({ key: "value" }).isTransfer()).toBeFalse();
});

test("#isSecondSignature", () => {
	expect(new Transaction().configure({ key: "value" }).isSecondSignature()).toBeFalse();
});

test("#isDelegateRegistration", () => {
	expect(new Transaction().configure({ key: "value" }).isDelegateRegistration()).toBeFalse();
});

test("#isVoteCombination", () => {
	expect(new Transaction().configure({ key: "value" }).isVoteCombination()).toBeFalse();
});

test("#isVote", () => {
	expect(new Transaction().configure({ key: "value" }).isVote()).toBeFalse();
});

test("#isUnvote", () => {
	expect(new Transaction().configure({ key: "value" }).isUnvote()).toBeFalse();
});

test("#isMultiSignatureRegistration", () => {
	expect(new Transaction().configure({ key: "value" }).isMultiSignatureRegistration()).toBeFalse();
});

test("#isIpfs", () => {
	expect(new Transaction().configure({ key: "value" }).isIpfs()).toBeFalse();
});

test("#isMultiPayment", () => {
	expect(new Transaction().configure({ key: "value" }).isMultiPayment()).toBeFalse();
});

test("#isDelegateResignation", () => {
	expect(new Transaction().configure({ key: "value" }).isDelegateResignation()).toBeFalse();
});

test("#isHtlcLock", () => {
	expect(new Transaction().configure({ key: "value" }).isHtlcLock()).toBeFalse();
});

test("#isHtlcClaim", () => {
	expect(new Transaction().configure({ key: "value" }).isHtlcClaim()).toBeFalse();
});

test("#isHtlcRefund", () => {
	expect(new Transaction().configure({ key: "value" }).isHtlcRefund()).toBeFalse();
});

test("#isMagistrate", () => {
	expect(new Transaction().configure({ key: "value" }).isMagistrate()).toBeFalse();
});

test("#toObject", () => {
	expect(new Transaction().configure({ key: "value" }).toObject()).toMatchInlineSnapshot(`
		Object {
		  "amount": BigNumber {},
		  "asset": Object {},
		  "confirmations": BigNumber {},
		  "fee": BigNumber {},
		  "id": "id",
		  "recipient": "recipient",
		  "sender": "sender",
		  "timestamp": undefined,
		  "type": "transfer",
		}
	`);
});

test("#raw", () => {
	expect(new Transaction().configure({ key: "value" }).raw()).toMatchInlineSnapshot(`
		Object {
		  "key": "value",
		}
	`);
});

test("#hasPassed", () => {
	expect(new Transaction().configure({ key: "value" }).hasPassed()).toBeTrue();
	expect(new Transaction().configure({}).hasPassed()).toBeFalse();
});

test("#hasFailed", () => {
	expect(new Transaction().configure({}).hasFailed()).toBeTrue();
	expect(new Transaction().configure({ key: "value" }).hasFailed()).toBeFalse();
});

test("#getMeta | #setMeta", () => {
	const subject = new Transaction().configure({});

	expect(subject.getMeta("key")).toBeUndefined();

	subject.setMeta("key", "value");

	expect(subject.getMeta("key")).toBe("value");
});

class Transaction extends AbstractConfirmedTransactionData {
	// @ts-ignore
	public id(): string {
		return "id";
	}

	// @ts-ignore
	public blockId(): string | undefined {
		return "blockId";
	}

	// @ts-ignore
	public timestamp(): DateTime | undefined {
		return undefined;
	}

	// @ts-ignore
	public confirmations(): BigNumber {
		return BigNumber.ZERO;
	}

	// @ts-ignore
	public sender(): string {
		return "sender";
	}

	// @ts-ignore
	public recipient(): string {
		return "recipient";
	}

	// @ts-ignore
	public recipients(): MultiPaymentRecipient[] {
		return [];
	}

	// @ts-ignore
	public amount(): BigNumber {
		return BigNumber.ZERO;
	}

	// @ts-ignore
	public fee(): BigNumber {
		return BigNumber.ZERO;
	}

	// @ts-ignore
	public memo(): string | undefined {
		if (this.data.hasOwnProperty("memo")) {
			return this.censorMemo(this.data.memo);
		}

		return this.censorMemo("memo");
	}

	// @ts-ignore
	public asset(): Record<string, unknown> {
		return {};
	}

	// @ts-ignore
	public inputs(): UnspentTransactionData[] {
		return [];
	}

	// @ts-ignore
	public outputs(): UnspentTransactionData[] {
		return [];
	}

	// @ts-ignore
	public isConfirmed(): boolean {
		return false;
	}

	// @ts-ignore
	public isSent(): boolean {
		return false;
	}

	// @ts-ignore
	public isReceived(): boolean {
		return false;
	}

	// @ts-ignore
	public isTransfer(): boolean {
		return false;
	}
}
