import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import nock from "nock";
import { v4 as uuidv4 } from "uuid";

import { identity } from "../../test/fixtures/identity";
import { container } from "../environment/container";
import { Identifiers } from "../environment/container.models";
import { CoinService } from "../environment/services/coin-service";
import { Profile } from "../profiles/profile";
import { ProfileSetting } from "../profiles/profile.models";
import { Wallet } from "../wallets/wallet";
import { TransactionData } from "./transaction";

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
		.get("/api/delegates?page=1")
		.reply(200, require("../../test/fixtures/client/delegates-1.json"))
		.get("/api/delegates?page=2")
		.reply(200, require("../../test/fixtures/client/delegates-2.json"))
		.persist();

	container.set(Identifiers.HttpClient, new Request());
	container.set(Identifiers.CoinService, new CoinService());
	container.set(Identifiers.Coins, { ARK });

	profile = new Profile("profile-id");
	profile.settings().set(ProfileSetting.Name, "John Doe");

	wallet = new Wallet(uuidv4(), profile);

	await wallet.setCoin("ARK", "ark.devnet");
	await wallet.setIdentity(identity.mnemonic);
});

beforeEach(() => {
	// @ts-ignore
	subject = new TransactionData(wallet, {
		id: () => "transactionId",
		blockId: () => "transactionBlockId",
	});
})

it("should have an explorer link", async () => {
	expect(subject.explorerLink()).toBe("https://dexplorer.ark.io/transaction/transactionId");
});

it("should have an explorer block link", async () => {
	expect(subject.explorerLinkForBlock()).toBe("https://dexplorer.ark.io/block/transactionBlockId");
});
