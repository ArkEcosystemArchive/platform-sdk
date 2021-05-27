import "jest-extended";
import "reflect-metadata";

import { Contracts } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import nock from "nock";

import { identity } from "../../test/fixtures/identity";
import { bootContainer, importByMnemonic } from "../../test/helpers";
import { IExchangeRateService, IProfile, IReadWriteWallet, ProfileSetting } from "../contracts";
import { Profile } from "../drivers/memory/profiles/profile";
import { container } from "../environment/container";
import { Identifiers } from "../environment/container.models";
import {
	DelegateRegistrationData,
	DelegateResignationData,
	HtlcClaimData,
	HtlcLockData,
	HtlcRefundData,
	IpfsData,
	MultiPaymentData,
	MultiSignatureData,
	SecondSignatureData,
	TransactionData,
	TransferData,
	VoteData,
} from "./transaction";

const createSubject = (wallet, properties, klass) => {
	let meta: Contracts.TransactionDataMeta = "some meta";

	return new klass(wallet, {
		id: () => "transactionId",
		blockId: () => "transactionBlockId",
		bridgechainId: () => "bridgechainId",
		type: () => "some type",
		timestamp: () => undefined,
		confirmations: () => BigNumber.make(20),
		sender: () => "sender",
		recipient: () => "recipient",
		memo: () => "memo",
		recipients: () => [],
		amount: () => BigNumber.make(18).times(1e8),
		fee: () => BigNumber.make(2).times(1e8),
		asset: () => ({}),
		inputs: () => [],
		outputs: () => [],
		isSent: () => true,
		toObject: () => ({}),
		getMeta: (): Contracts.TransactionDataMeta => meta,
		setMeta: (key: string, value: Contracts.TransactionDataMeta): void => {
			meta = value;
		},
		...(properties || {}),
	});
};

let subject: any;
let profile: IProfile;
let wallet: IReadWriteWallet;

let liveSpy: jest.SpyInstance;
let testSpy: jest.SpyInstance;

beforeAll(async () => {
	bootContainer();

	nock.disableNetConnect();

	nock(/.+/)
		.get("/api/node/configuration")
		.reply(200, require("../../test/fixtures/client/configuration.json"))
		.get("/api/peers")
		.reply(200, require("../../test/fixtures/client/peers.json"))
		.get("/api/node/configuration/crypto")
		.reply(200, require("../../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/node/syncing")
		.reply(200, require("../../test/fixtures/client/syncing.json"))
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require("../../test/fixtures/client/wallet.json"))
		.get("/api/delegates")
		.reply(200, require("../../test/fixtures/client/delegates-1.json"))
		.get("/api/delegates?page=2")
		.reply(200, require("../../test/fixtures/client/delegates-2.json"))
		.get("/api/ipfs/QmR45FmbVVrixReBwJkhEKde2qwHYaQzGxu4ZoDeswuF9c")
		.reply(200, { data: "ipfs-content" })
		// CryptoCompare
		.get("/data/dayAvg")
		.query(true)
		.reply(200, { BTC: 0.00005048, ConversionType: { type: "direct", conversionSymbol: "" } })
		.get("/data/histoday")
		.query(true)
		.reply(200, require("../../test/fixtures/markets/cryptocompare/historical.json"))
		.persist();
});

beforeEach(async () => {
	profile = new Profile({ id: "profile-id", name: "name", avatar: "avatar", data: "" });

	profile.settings().set(ProfileSetting.Name, "John Doe");
	profile.settings().set(ProfileSetting.ExchangeCurrency, "BTC");
	profile.settings().set(ProfileSetting.MarketProvider, "cryptocompare");

	wallet = await importByMnemonic(profile, identity.mnemonic, "ARK", "ark.devnet");

	liveSpy = jest.spyOn(wallet.network(), "isLive").mockReturnValue(true);
	testSpy = jest.spyOn(wallet.network(), "isTest").mockReturnValue(false);
});

afterEach(() => {
	liveSpy.mockRestore();
	testSpy.mockRestore();
});

describe("Transaction", () => {
	beforeEach(() => (subject = createSubject(wallet, undefined, DelegateRegistrationData)));

	it("should have an explorer link", () => {
		expect(subject.explorerLink()).toBe("https://dexplorer.ark.io/transaction/transactionId");
	});

	it("should have an explorer block link", () => {
		expect(subject.explorerLinkForBlock()).toBe("https://dexplorer.ark.io/block/transactionBlockId");
	});

	it("should have an explorer block link for undefined block", () => {
		subject = createSubject(
			wallet,
			{
				...subject,
				blockId: () => undefined,
			},
			DelegateRegistrationData,
		);

		expect(subject.explorerLinkForBlock()).toBeUndefined();
	});

	it("should have a type", () => {
		expect(subject.type()).toBe("some type");
	});

	it("should have a timestamp", () => {
		expect(subject.timestamp()).toBeUndefined();
	});

	it("should have confirmations", () => {
		expect(subject.confirmations()).toStrictEqual(BigNumber.make(20));
	});

	it("should have a sender", () => {
		expect(subject.sender()).toBe("sender");
	});

	it("should have a recipient", () => {
		expect(subject.recipient()).toBe("recipient");
	});

	it("should have a recipients", () => {
		expect(subject.recipients()).toBeInstanceOf(Array);
		expect(subject.recipients().length).toBe(0);
	});

	it("should have an amount", () => {
		expect(subject.amount()).toStrictEqual(BigNumber.make(18));
	});

	it("should have a converted amount", async () => {
		subject = createSubject(
			wallet,
			{
				timestamp: () => DateTime.make(),
				amount: () => BigNumber.make(10e8),
			},
			TransferData,
		);

		await container.get<IExchangeRateService>(Identifiers.ExchangeRateService).syncAll(profile, "DARK");

		expect(subject.convertedAmount().toNumber()).toBe(0.0005048);
	});

	it("should have a default converted amount", () => {
		expect(subject.convertedAmount().toNumber()).toStrictEqual(0);
	});

	it("should have a fee", () => {
		expect(subject.fee().toNumber()).toStrictEqual(2e8);
	});

	it("should have a converted fee", async () => {
		subject = createSubject(
			wallet,
			{
				timestamp: () => DateTime.make(),
				fee: () => BigNumber.make(10e8),
			},
			TransferData,
		);

		await container.get<IExchangeRateService>(Identifiers.ExchangeRateService).syncAll(profile, "DARK");

		expect(subject.convertedFee().toNumber()).toBe(0.0005048);
	});

	it("should have a default converted fee", () => {
		expect(subject.convertedFee().toNumber()).toStrictEqual(0);
	});

	test("#toObject", () => {
		subject = createSubject(
			wallet,
			{
				toObject: () => ({
					key: "value",
				}),
			},
			TransactionData,
		);

		expect(subject.toObject()).toMatchInlineSnapshot(`
		Object {
		  "key": "value",
		}
	`);
	});

	test("#memo", () => {
		subject = createSubject(
			wallet,
			{
				memo: () => "memo",
			},
			TransactionData,
		);

		expect(subject.memo()).toBe("memo");
	});

	test("#inputs", () => {
		subject = createSubject(
			wallet,
			{
				inputs: () => [{}, {}, {}],
			},
			TransactionData,
		);

		expect(subject.inputs()).toHaveLength(3);
	});

	test("#outputs", () => {
		subject = createSubject(
			wallet,
			{
				outputs: () => [{}, {}, {}],
			},
			TransactionData,
		);

		expect(subject.outputs()).toHaveLength(3);
	});

	test("should not throw if transaction type does not have memo", () => {
		const subject = createSubject(
			wallet,
			{
				memo: undefined,
			},
			TransactionData,
		);

		expect(() => subject.memo()).not.toThrow();
		expect(subject.memo()).toBeUndefined();
	});

	test("#hasPassed", () => {
		subject = createSubject(
			wallet,
			{
				hasPassed: () => true,
			},
			TransactionData,
		);

		expect(subject.hasPassed()).toBeTrue();
	});

	test("coin", () => {
		expect(subject.coin()).toBe(wallet.coin());
	});

	test("#hasFailed", () => {
		subject = createSubject(
			wallet,
			{
				hasFailed: () => true,
			},
			TransactionData,
		);

		expect(subject.hasFailed()).toBeTrue();
	});

	test("#getMeta | #setMeta", () => {
		const getMeta = jest.fn();
		const setMeta = jest.fn();

		subject = createSubject(wallet, { getMeta, setMeta }, TransactionData);

		subject.getMeta("key");
		subject.setMeta("key", "value");

		expect(getMeta).toHaveBeenCalled();
		expect(setMeta).toHaveBeenCalled();
	});

	it("should not have a memo", () => {
		expect(subject.memo()).toBe("memo");
	});

	it("should have a total for sent", () => {
		expect(subject.total().toNumber()).toStrictEqual(20e8);
	});

	it("should have a total for unsent", () => {
		// @ts-ignore
		subject = new DelegateRegistrationData(wallet, {
			amount: () => BigNumber.make(18),
			fee: () => BigNumber.make(2),
			isSent: () => false,
		});
		expect(subject.total().toNumber()).toStrictEqual(18);
	});

	it("should have a converted total", async () => {
		subject = createSubject(
			wallet,
			{
				timestamp: () => DateTime.make(),
				amount: () => BigNumber.make(10e8),
				fee: () => BigNumber.make(5e8),
			},
			TransferData,
		);

		await container.get<IExchangeRateService>(Identifiers.ExchangeRateService).syncAll(profile, "DARK");

		expect(subject.convertedTotal().toNumber()).toBe(0.0007572);
	});

	it("should have a default converted total", () => {
		expect(subject.convertedTotal().toNumber()).toStrictEqual(0);
	});

	it("should have meta", () => {
		expect(subject.getMeta("someKey")).toStrictEqual("some meta");
	});

	it("should change meta", () => {
		subject.setMeta("someKey", "another meta");
		expect(subject.getMeta("someKey")).toStrictEqual("another meta");
	});

	const data = [
		["isMagistrate"],
		["isDelegateRegistration"],
		["isDelegateResignation"],
		["isHtlcClaim"],
		["isHtlcLock"],
		["isHtlcRefund"],
		["isIpfs"],
		["isMultiPayment"],
		["isMultiSignature"],
		["isSecondSignature"],
		["isTransfer"],
		["isVote"],
		["isUnvote"],
		["hasPassed"],
		["hasFailed"],
		["isConfirmed"],
		["isSent"],
		["isReceived"],
		["isTransfer"],
		["isVoteCombination"],
	];

	const dummyTransactionData = {
		isMagistrate: () => false,
		isDelegateRegistration: () => false,
		isDelegateResignation: () => false,
		isHtlcClaim: () => false,
		isHtlcLock: () => false,
		isHtlcRefund: () => false,
		isIpfs: () => false,
		isMultiPayment: () => false,
		isMultiSignature: () => false,
		isSecondSignature: () => false,
		isTransfer: () => false,
		isVote: () => false,
		isUnvote: () => false,
		hasPassed: () => false,
	};

	it.each(data)(`should delegate %p correctly`, (functionName) => {
		// @ts-ignore
		const transactionData = new TransactionData(wallet, {
			...dummyTransactionData,
			[String(functionName)]: () => true,
		});
		expect(transactionData[functionName.toString()]()).toBeTruthy();
	});
});

describe("DelegateRegistrationData", () => {
	beforeEach(() => {
		subject = createSubject(
			wallet,
			{
				username: () => "username",
			},
			DelegateRegistrationData,
		);
	});

	test("#username", () => {
		expect(subject.username()).toBe("username");
	});
});

describe("DelegateResignationData", () => {
	beforeEach(() => (subject = createSubject(wallet, undefined, DelegateResignationData)));

	test("#id", () => {
		expect(subject.id()).toBe("transactionId");
	});
});

describe("HtlcClaimData", () => {
	beforeEach(() => {
		subject = createSubject(
			wallet,
			{
				lockTransactionId: () => "lockTransactionId",
				unlockSecret: () => "unlockSecret",
			},
			HtlcClaimData,
		);
	});

	test("#lockTransactionId", () => {
		expect(subject.lockTransactionId()).toBe("lockTransactionId");
	});

	test("#unlockSecret", () => {
		expect(subject.unlockSecret()).toBe("unlockSecret");
	});
});

describe("HtlcLockData", () => {
	beforeEach(() => {
		subject = createSubject(
			wallet,
			{
				secretHash: () => "secretHash",
				expirationType: () => 5,
				expirationValue: () => 3,
			},
			HtlcLockData,
		);
	});

	test("#secretHash", () => {
		expect(subject.secretHash()).toBe("secretHash");
	});

	test("#expirationType", () => {
		expect(subject.expirationType()).toBe(5);
	});

	test("#expirationValue", () => {
		expect(subject.expirationValue()).toBe(3);
	});
});

describe("HtlcRefundData", () => {
	beforeEach(() => {
		subject = createSubject(
			wallet,
			{
				lockTransactionId: () => "lockTransactionId",
			},
			HtlcRefundData,
		);
	});

	test("#lockTransactionId", () => {
		expect(subject.lockTransactionId()).toBe("lockTransactionId");
	});
});

describe("IpfsData", () => {
	beforeEach(() => {
		subject = createSubject(
			wallet,
			{
				hash: () => "hash",
			},
			IpfsData,
		);
	});

	test("#hash", () => {
		expect(subject.hash()).toBe("hash");
	});
});

describe("MultiPaymentData", () => {
	beforeEach(() => {
		subject = createSubject(
			wallet,
			{
				payments: () => [{ recipient: "recipient", amount: "1000" }],
			},
			MultiPaymentData,
		);
	});

	test("#payments", () => {
		expect(subject.payments()).toEqual([{ recipient: "recipient", amount: "1000" }]);
	});
});

describe("MultiSignatureData", () => {
	beforeEach(() => {
		subject = createSubject(
			wallet,
			{
				publicKeys: () => ["1", "2", "3"],
				min: () => 5,
			},
			MultiSignatureData,
		);
	});

	test("#publicKeys", () => {
		expect(subject.publicKeys()).toEqual(["1", "2", "3"]);
	});

	test("#min", () => {
		expect(subject.min()).toBe(5);
	});
});

describe("SecondSignatureData", () => {
	beforeEach(() => {
		subject = createSubject(
			wallet,
			{
				secondPublicKey: () => "secondPublicKey",
			},
			SecondSignatureData,
		);
	});

	test("#secondPublicKey", () => {
		expect(subject.secondPublicKey()).toBe("secondPublicKey");
	});
});

describe("TransferData", () => {
	beforeEach(() => {
		subject = createSubject(
			wallet,
			{
				memo: () => "memo",
			},
			TransferData,
		);
	});

	test("#memo", () => {
		expect(subject.memo()).toBe("memo");
	});
});

describe("VoteData", () => {
	beforeEach(() => {
		subject = createSubject(
			wallet,
			{
				votes: () => ["vote"],
				unvotes: () => ["unvote"],
			},
			VoteData,
		);
	});

	test("#votes", () => {
		expect(subject.votes()).toEqual(["vote"]);
	});

	test("#unvotes", () => {
		expect(subject.unvotes()).toEqual(["unvote"]);
	});
});

describe("Type Specific", () => {
	beforeEach(() => {
		subject = createSubject(
			wallet,
			{
				asset: () => ({ key: "value" }),
			},
			VoteData,
		);
	});

	it("should return the asset", () => {
		expect(subject.asset()).toEqual({ key: "value" });
	});
});
