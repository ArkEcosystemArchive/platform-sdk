/* eslint-disable */

import "jest-extended";
import "reflect-metadata";

import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { WalletBalance } from "../contracts";
import { AbstractWalletData } from "./wallet";

test("#address", () => {
	expect(new Wallet({ key: "value" }).address()).toBe("address");
});

test("#publicKey", () => {
	expect(new Wallet({ key: "value" }).publicKey()).toBe("publicKey");
});

test("#balance", () => {
	expect(new Wallet({ key: "value" }).balance()).toBeObject();
});

test("#nonce", () => {
	expect(new Wallet({ key: "value" }).nonce()).toBe(BigNumber.ZERO);
});

test("#secondPublicKey", () => {
	expect(new Wallet({ key: "value" }).secondPublicKey()).toBe("secondPublicKey");
});

test("#username", () => {
	expect(new Wallet({ key: "value" }).username()).toBe("username");
});

test("#rank", () => {
	expect(new Wallet({ key: "value" }).rank()).toBe(5);
});

test("#votes", () => {
	expect(new Wallet({ key: "value" }).votes()).toBe(BigNumber.ZERO);
});

test("#isDelegate", () => {
	expect(new Wallet({ key: "value" }).isDelegate()).toBeFalse();
});

test("#isMultiSignature", () => {
	expect(new Wallet({ key: "value" }).isMultiSignature()).toBeFalse();
});

test("#isSecondSignature", () => {
	expect(new Wallet({ key: "value" }).isSecondSignature()).toBeFalse();
});

test("#toObject", () => {
	expect(new Wallet({ key: "value" }).toObject()).toMatchInlineSnapshot(`
		Object {
		  "address": "address",
		  "balance": Object {
		    "available": BigNumber {},
		    "fees": BigNumber {},
		  },
		  "isDelegate": false,
		  "isMultiSignature": false,
		  "isResignedDelegate": false,
		  "isSecondSignature": false,
		  "nonce": BigNumber {},
		  "publicKey": "publicKey",
		  "rank": 5,
		  "username": "username",
		  "votes": BigNumber {},
		}
	`);
});

test("#raw", () => {
	expect(new Wallet({ key: "value" }).raw()).toMatchInlineSnapshot(`
		Object {
		  "key": "value",
		}
	`);
});

test("#hasPassed", () => {
	expect(new Wallet({ key: "value" }).hasPassed()).toBeTrue();
	expect(new Wallet({}).hasPassed()).toBeFalse();
});

test("#hasFailed", () => {
	expect(new Wallet({}).hasFailed()).toBeTrue();
	expect(new Wallet({ key: "value" }).hasFailed()).toBeFalse();
});

class Wallet extends AbstractWalletData {
	// @ts-ignore
	public primaryKey(): string {
		return "address";
	}

	// @ts-ignore
	public address(): string {
		return "address";
	}

	// @ts-ignore
	public publicKey(): string | undefined {
		return "publicKey";
	}

	// @ts-ignore
	public balance(): WalletBalance {
		return {
			available: BigNumber.ZERO,
			fees: BigNumber.ZERO,
		};
	}

	// @ts-ignore
	public nonce(): BigNumber {
		return BigNumber.ZERO;
	}

	// @ts-ignore
	public secondPublicKey(): string | undefined {
		return "secondPublicKey";
	}

	// @ts-ignore
	public username(): string | undefined {
		return "username";
	}

	// @ts-ignore
	public rank(): number | undefined {
		return 5;
	}

	// @ts-ignore
	public votes(): BigNumber | undefined {
		return BigNumber.ZERO;
	}

	// @ts-ignore
	public isDelegate(): boolean {
		return false;
	}

	// @ts-ignore
	public isResignedDelegate(): boolean {
		return false;
	}

	// @ts-ignore
	public isMultiSignature(): boolean {
		return false;
	}

	// @ts-ignore
	public isSecondSignature(): boolean {
		return false;
	}
}
