import "jest-extended";

import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { SignedTransactionData } from "./signed-transaction";

let subject: SignedTransactionData;
beforeEach(
	() =>
		(subject = new SignedTransactionData("id", {
			sender: "sender",
			recipient: "recipient",
			amount: BigNumber.ONE,
			fee: BigNumber.ONE,
			isMultiSignature: false,
			isMultiSignatureRegistration: false,
		})),
);

it("#sender", async () => {
	expect(subject.sender()).toBe("sender");
});

it("#recipient", async () => {
	expect(subject.recipient()).toBe("recipient");
});

it("#amount", async () => {
	expect(subject.amount()).toEqual(BigNumber.ONE);
});

it("#fee", async () => {
	expect(subject.fee()).toEqual(BigNumber.ONE);
});

it("#isMultiSignature", async () => {
	expect(subject.isMultiSignature()).toBeFalse();
});

it("#isMultiSignatureRegistration", async () => {
	expect(subject.isMultiSignatureRegistration()).toBeFalse();
});
