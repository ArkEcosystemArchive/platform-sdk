import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import nock from "nock";
import { v4 as uuidv4 } from "uuid";

import { identity } from "../../test/fixtures/identity";
import { container } from "../environment/container";
import { Identifiers } from "../environment/container.models";
import { CoinService } from "../environment/services/coin-service";
import { Profile } from "../profiles/profile";
import { ProfileSetting } from "../profiles/profile.models";
import { Wallet } from "../wallets/wallet";
import { BridgechainRegistrationData, TransactionData } from "./transaction";

describe("transaction", () => {
	let subject: TransactionData;
	let profile: Profile;
	let wallet: Wallet;

	beforeAll(async () => {
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
			.persist();

		container.set(Identifiers.HttpClient, new Request());
		container.set(Identifiers.CoinService, new CoinService());
		container.set(Identifiers.Coins, { ARK });

		profile = new Profile({ id: "profile-id" });
		profile.settings().set(ProfileSetting.Name, "John Doe");

		wallet = new Wallet(uuidv4(), profile);

		await wallet.setCoin("ARK", "ark.devnet");
		await wallet.setIdentity(identity.mnemonic);
	});

	beforeEach(() => {
		// @ts-ignore
		subject = new BridgechainRegistrationData(wallet, {
			id: () => "transactionId",
			blockId: () => "transactionBlockId",
			bridgechainId: () => "bridgechainId",
			type: () => "some type",
			timestamp: () => undefined,
			confirmations: () => BigNumber.make(20),
			sender: () => "sender",
			recipient: () => "recipient",
			recipients: () => [],
			amount: () => BigNumber.make(18),
			fee: () => BigNumber.make(2),
		});
	});

	it("should have an explorer link", () => {
		expect(subject.explorerLink()).toBe("https://dexplorer.ark.io/transaction/transactionId");
	});

	it("should have an explorer block link", () => {
		expect(subject.explorerLinkForBlock()).toBe("https://dexplorer.ark.io/block/transactionBlockId");
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

	it("should have a converted amount", () => {
		expect(subject.convertedAmount().toNumber()).toStrictEqual(0);
	});

	it("should have a fee", () => {
		expect(subject.fee().toNumber()).toStrictEqual(2);
	});

	const data = [
		["isLegacyBridgechainRegistration"],
		["isLegacyBridgechainResignation"],
		["isLegacyBridgechainUpdate"],
		["isLegacyBusinessRegistration"],
		["isLegacyBusinessResignation"],
		["isLegacyBusinessUpdate"],
		["isDelegateRegistration"],
		["isDelegateResignation"],
		["isEntityRegistration"],
		["isEntityResignation"],
		["isEntityUpdate"],
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
		["isBusinessEntityRegistration"],
		["isBusinessEntityResignation"],
		["isBusinessEntityUpdate"],
		["isProductEntityRegistration"],
		["isProductEntityResignation"],
		["isProductEntityUpdate"],
		["isPluginEntityRegistration"],
		["isPluginEntityResignation"],
		["isPluginEntityUpdate"],
		["isModuleEntityRegistration"],
		["isModuleEntityResignation"],
		["isModuleEntityUpdate"],
		["isDelegateEntityRegistration"],
		["isDelegateEntityResignation"],
		["isDelegateEntityUpdate"],
	];

	const dummyTransactionData = {
		isLegacyBridgechainRegistration: () => false,
		isLegacyBridgechainResignation: () => false,
		isLegacyBridgechainUpdate: () => false,
		isLegacyBusinessRegistration: () => false,
		isLegacyBusinessResignation: () => false,
		isLegacyBusinessUpdate: () => false,
		isDelegateRegistration: () => false,
		isDelegateResignation: () => false,
		isEntityRegistration: () => false,
		isEntityResignation: () => false,
		isEntityUpdate: () => false,
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

describe("TransactionData", () => {
	//
});

describe("BridgechainRegistrationData", () => {
	//
});

describe("BridgechainResignationData", () => {
	//
});

describe("BridgechainUpdateData", () => {
	//
});

describe("BusinessRegistrationData", () => {
	//
});

describe("BusinessResignationData", () => {
	//
});

describe("BusinessUpdateData", () => {
	//
});

describe("DelegateRegistrationData", () => {
	//
});

describe("DelegateResignationData", () => {
	//
});

describe("EntityRegistrationData", () => {
	//
});

describe("EntityResignationData", () => {
	//
});

describe("EntityUpdateData", () => {
	//
});

describe("HtlcClaimData", () => {
	//
});

describe("HtlcLockData", () => {
	//
});

describe("HtlcRefundData", () => {
	//
});

describe("IpfsData", () => {
	//
});

describe("MultiPaymentData", () => {
	//
});

describe("MultiSignatureData", () => {
	//
});

describe("SecondSignatureData", () => {
	//
});

describe("TransferData", () => {
	//
});

describe("VoteData", () => {
	//
});
