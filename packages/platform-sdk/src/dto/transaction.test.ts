import "jest-extended";
import "reflect-metadata";

import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { MultiPaymentRecipient, UnspentTransactionData } from "../contracts";
import { AbstractTransactionData } from "./transaction";

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

test("#isMultiSignature", () => {
	expect(new Transaction().configure({ key: "value" }).isMultiSignature()).toBeFalse();
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

class Transaction extends AbstractTransactionData {
	public id(): string {
		return "id";
	}

	public blockId(): string | undefined {
		return "blockId";
	}

	public timestamp(): DateTime | undefined {
		return undefined;
	}

	public confirmations(): BigNumber {
		return BigNumber.ZERO;
	}

	public sender(): string {
		return "sender";
	}

	public recipient(): string {
		return "recipient";
	}

	public recipients(): MultiPaymentRecipient[] {
		return [];
	}

	public amount(): BigNumber {
		return BigNumber.ZERO;
	}

	public fee(): BigNumber {
		return BigNumber.ZERO;
	}

	public memo(): string | undefined {
		if (this.data.hasOwnProperty("memo")) {
			return this.censorMemo(this.data.memo);
		}

		return this.censorMemo("memo");
	}

	public asset(): Record<string, unknown> {
		return {};
	}

	public inputs(): UnspentTransactionData[] {
		return [];
	}

	public outputs(): UnspentTransactionData[] {
		return [];
	}

	public isConfirmed(): boolean {
		return false;
	}

	public isSent(): boolean {
		return false;
	}

	public isReceived(): boolean {
		return false;
	}

	public isTransfer(): boolean {
		return false;
	}

	public isSecondSignature(): boolean {
		return false;
	}

	public isDelegateRegistration(): boolean {
		return false;
	}

	public isVoteCombination(): boolean {
		return false;
	}

	public isVote(): boolean {
		return false;
	}

	public isUnvote(): boolean {
		return false;
	}

	public isMultiSignature(): boolean {
		return false;
	}

	public isIpfs(): boolean {
		return false;
	}

	public isMultiPayment(): boolean {
		return false;
	}

	public isDelegateResignation(): boolean {
		return false;
	}

	public isHtlcLock(): boolean {
		return false;
	}

	public isHtlcClaim(): boolean {
		return false;
	}

	public isHtlcRefund(): boolean {
		return false;
	}

	public isMagistrate(): boolean {
		return false;
	}
}
