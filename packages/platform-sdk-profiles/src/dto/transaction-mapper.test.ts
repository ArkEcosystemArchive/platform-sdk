import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import nock from "nock";
import { v4 as uuidv4 } from "uuid";

import { TransactionDataCollection } from "../../../platform-sdk/dist/coins";
import { ClientPaginatorCursor, MetaPagination } from "../../../platform-sdk/src/contracts";
import { identity } from "../../test/fixtures/identity";
import { container } from "../environment/container";
import { Identifiers } from "../environment/container.models";
import { CoinService } from "../environment/services/coin-service";
import { Profile } from "../profiles/profile";
import { ProfileSetting } from "../profiles/profile.models";
import { Wallet } from "../wallets/wallet";
import {
	BridgechainRegistrationData,
	BridgechainResignationData,
	BridgechainUpdateData,
	BusinessRegistrationData,
	BusinessResignationData,
	BusinessUpdateData,
	DelegateRegistrationData,
	DelegateResignationData,
	EntityRegistrationData,
	EntityResignationData,
	EntityUpdateData,
	ExtendedTransactionData,
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
	[BridgechainRegistrationData, "isLegacyBridgechainRegistration"],
	[BridgechainResignationData, "isLegacyBridgechainResignation"],
	[BridgechainUpdateData, "isLegacyBridgechainUpdate"],
	[BusinessRegistrationData, "isLegacyBusinessRegistration"],
	[BusinessResignationData, "isLegacyBusinessResignation"],
	[BusinessUpdateData, "isLegacyBusinessUpdate"],
	[DelegateRegistrationData, "isDelegateRegistration"],
	[DelegateResignationData, "isDelegateResignation"],
	[EntityRegistrationData, "isEntityRegistration"],
	[EntityResignationData, "isEntityResignation"],
	[EntityUpdateData, "isEntityUpdate"],
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

describe("transaction-mapper", () => {
	let profile: Profile;
	let wallet: Wallet;

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

		container.set(Identifiers.HttpClient, new Request());
		container.set(Identifiers.CoinService, new CoinService());
		container.set(Identifiers.Coins, { ARK });

		profile = new Profile({ id: "profile-id" });
		profile.settings().set(ProfileSetting.Name, "John Doe");

		wallet = new Wallet(uuidv4(), profile);

		await wallet.setCoin("ARK", "ark.devnet");
		await wallet.setIdentity(identity.mnemonic);
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
		};
		// @ts-ignore
		const collection = new TransactionDataCollection(
			[
				{
					isLegacyBridgechainRegistration: () => true,
				},
			],
			pagination,
		);

		const transformedCollection = transformTransactionDataCollection(wallet, collection);
		expect(transformedCollection).toBeInstanceOf(ExtendedTransactionDataCollection);
		expect(transformedCollection.getPagination()).toBe(pagination);
	});
});
