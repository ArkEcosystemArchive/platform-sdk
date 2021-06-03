import "reflect-metadata";

import { Collections } from "@arkecosystem/platform-sdk";
import nock from "nock";
import { v4 as uuidv4 } from "uuid";

import { identity } from "../../test/fixtures/identity";
import { bootContainer } from "../../test/helpers";
import { IProfile, IReadWriteWallet, ProfileSetting } from "../contracts";
import { Profile } from "../drivers/memory/profiles/profile";
import { Wallet } from "../drivers/memory/wallets/wallet";
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
import { ExtendedTransactionDataCollection } from "./transaction-collection";
import { transformTransactionData, transformTransactionDataCollection } from "./transaction-mapper";

const data = [
	[DelegateRegistrationData, "isDelegateRegistration"],
	[DelegateResignationData, "isDelegateResignation"],
	[HtlcClaimData, "isHtlcClaim"],
	[HtlcLockData, "isHtlcLock"],
	[HtlcRefundData, "isHtlcRefund"],
	[IpfsData, "isIpfs"],
	[MultiPaymentData, "isMultiPayment"],
	[MultiSignatureData, "isMultiSignature"],
	[SecondSignatureData, "isSecondSignature"],
	[TransferData, "isTransfer"],
	[VoteData, "isVote"],
	[VoteData, "isUnvote"],
	[TransactionData, "isOther"],
];

beforeAll(() => bootContainer());

describe("transaction-mapper", () => {
	let profile: IProfile;
	let wallet: IReadWriteWallet;

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
	};

	beforeAll(async () => {
		nock.disableNetConnect();

		nock(/.+/)
			.get("/api/peers")
			.reply(200, require("../../test/fixtures/client/peers.json"))
			.get("/api/node/configuration/crypto")
			.reply(200, require("../../test/fixtures/client/cryptoConfiguration.json"))
			.get("/api/node/syncing")
			.reply(200, require("../../test/fixtures/client/syncing.json"))
			.persist();

		profile = new Profile({ id: "profile-id", name: "name", avatar: "avatar", data: "" });

		profile.settings().set(ProfileSetting.Name, "John Doe");

		wallet = new Wallet(uuidv4(), {}, profile);

		await wallet.mutator().coin("ARK", "ark.devnet");
		await wallet.mutator().identity(identity.mnemonic);
	});

	it.each(data)(`should map %p correctly`, (className, functionName) => {
		expect(
			// @ts-ignore
			transformTransactionData(wallet, {
				...dummyTransactionData,
				[String(functionName)]: () => true,
			}),
		).toBeInstanceOf(className);
	});

	it("should map collection correctly", () => {
		const pagination = {
			prev: "before",
			self: "now",
			next: "after",
			last: "last",
		};

		// @ts-ignore
		const transactionData = new TransactionData(wallet, {
			isMagistrate: () => true,
		});

		const collection = new Collections.TransactionDataCollection([transactionData], pagination);

		const transformedCollection = transformTransactionDataCollection(wallet, collection);
		expect(transformedCollection).toBeInstanceOf(ExtendedTransactionDataCollection);
		expect(transformedCollection.getPagination()).toBe(pagination);
	});
});
