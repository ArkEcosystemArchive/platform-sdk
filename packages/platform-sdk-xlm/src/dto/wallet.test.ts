import { BigNumber } from "@arkecosystem/platform-sdk-support";

import Fixture from "../../test/fixtures/client/wallet.json";
import { WalletData } from "./wallet";

let subject: WalletData;

describe("WalletData", function () {
	const subject = new WalletData(Fixture);
	const implementedMethods = {
		address: "GD42RQNXTRIW6YR3E2HXV5T2AI27LBRHOERV2JIYNFMXOBA234SWLQQB",
		balance: BigNumber.make("17491629"),
		publicKey: "GD42RQNXTRIW6YR3E2HXV5T2AI27LBRHOERV2JIYNFMXOBA234SWLQQB",
		entities: [],
		nonce: BigNumber.make(24242),
	};

	it("#address", () => {
		expect(subject.address()).toEqual("GD42RQNXTRIW6YR3E2HXV5T2AI27LBRHOERV2JIYNFMXOBA234SWLQQB");
	});

	it("#publicKey", () => {
		expect(subject.publicKey()).toEqual("GD42RQNXTRIW6YR3E2HXV5T2AI27LBRHOERV2JIYNFMXOBA234SWLQQB");
	});

	it("#balance", () => {
		expect(subject.balance()).toEqual(BigNumber.make("17491629"));
	});

	it("#entities", () => {
		expect(subject.entities()).toHaveLength(0);
	});

	it("#nonce", () => {
		expect(subject.nonce()).toEqual(BigNumber.make(24242));
	});

	it("#secondPublicKey", () => {
		expect(() => subject.secondPublicKey()).toThrow(/not implemented/);
	});

	it("#username", () => {
		expect(() => subject.username()).toThrow(/not implemented/);
	});

	it("#rank", () => {
		expect(() => subject.rank()).toThrow(/not implemented/);
	});

	it("#votes", () => {
		expect(() => subject.votes()).toThrow(/not implemented/);
	});

	it("#multiSignature", () => {
		expect(() => subject.multiSignature()).toThrow(/not implemented/);
	});

	it("#isMultiSignature", () => {
		expect(() => subject.isMultiSignature()).toBeFalse();
	});

	it("#isDelegate", () => {
		expect(() => subject.isDelegate()).toBeFalse();
	});

	it("#isSecondSignature", () => {
		expect(() => subject.isSecondSignature()).toBeFalse();
	});

	it("#isResignedDelegate", () => {
		expect(() => subject.isResignedDelegate()).toBeFalse();
	});
});
