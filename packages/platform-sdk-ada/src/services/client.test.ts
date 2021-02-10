import "jest-extended";

import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import nock from "nock";

import { createConfig } from "../../test/helpers";
import { TransactionData, WalletData } from "../dto";
import { ClientService } from "./client";

let subject: ClientService;

beforeEach(async () => (subject = await ClientService.__construct(createConfig())));

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

describe("ClientService", function () {
	describe("#wallet", () => {
		it("should succeed", async () => {
			nock("http://localhost:8090")
				.get("/v2/wallets/98c83431e94407bc0889e09953461fe5cecfdf18")
				.reply(200, require(`${__dirname}/../../test/fixtures/client/wallet.json`));

			const result = await subject.wallet("98c83431e94407bc0889e09953461fe5cecfdf18");

			expect(result).toBeInstanceOf(WalletData);
			expect(result.address()).toBe("98c83431e94407bc0889e09953461fe5cecfdf18");
			expect(result.balance().toString()).toEqual("2000000000");
		});
	});

	describe("#transactions", () => {
		it("#transactions", async () => {
			nock("http://localhost:8090")
				.get("/v2/wallets/98c83431e94407bc0889e09953461fe5cecfdf18/transactions")
				.reply(200, require(`${__dirname}/../../test/fixtures/client/transactions.json`));

			const result = await subject.transactions({
				address: "98c83431e94407bc0889e09953461fe5cecfdf18",
			});

			expect(result).toBeObject();
			expect(result.items()).toBeArrayOfSize(5);
			expect(result.items()[0]).toBeInstanceOf(TransactionData);
			expect(result.items()[0].id()).toBe("35b40547f04963d3b41478fc27038948d74718802c486d9125f1884d8c83a31d");
			expect(result.items()[0].amount()).toEqual(BigNumber.make(25168801));
			expect(result.items()[0].fee()).toEqual(BigNumber.make(168801));
			expect(result.items()[0].timestamp()).toEqual(DateTime.make("2021-02-05T15:04:16.000Z"));
			expect(result.items()[0].isSent()).toBe(true);
			expect(result.items()[0].isReceived()).toBe(false);
			expect(result.items()[0].sender()).toBe('addr_test1qrhvwtn8sa3duzkm93v5kjjxlv5lvg67j530wyeumngu23lk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s4s8xvh');
			expect(result.items()[0].recipient()).toBe('addr_test1qzct2hsralem3fqn8fupu90v3jkelpg4rfp4zqx06zgevpachk6az8jcydma5a6vgsuw5c37v0c8j6rlclpqajn2vxsq3rz4th');
			expect(result.items()[0].recipients()).toEqual([
				'addr_test1qzct2hsralem3fqn8fupu90v3jkelpg4rfp4zqx06zgevpachk6az8jcydma5a6vgsuw5c37v0c8j6rlclpqajn2vxsq3rz4th',
				'addr_test1qzfjfm724nv9qz6nfyagmj0j2uppr35gzv5qee8s7489wxlk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33scc4thv',
			]);
			expect(result.items()[1].isSent()).toBe(false);
			expect(result.items()[1].isReceived()).toBe(true);
		});
	});

	describe("unimplemented methods", () => {
		it("#wallets", async () => {
			await expect(subject.wallets({})).rejects.toThrow(/is not implemented./);
		});
		it("#transaction", async () => {
			await expect(subject.transaction("")).rejects.toThrow(/is not implemented./);
		});
		it("#delegate", async () => {
			await expect(subject.delegate("")).rejects.toThrow(/is not implemented./);
		});
		it("#delegates", async () => {
			await expect(subject.delegates({})).rejects.toThrow(/is not implemented./);
		});
		it("#votes", async () => {
			await expect(subject.votes("")).rejects.toThrow(/is not implemented./);
		});
		it("#voters", async () => {
			await expect(subject.voters("", {})).rejects.toThrow(/is not implemented./);
		});
		it("#syncing", async () => {
			await expect(subject.syncing()).rejects.toThrow(/is not implemented./);
		});
		it("#broadcast", async () => {
			await expect(subject.broadcast([])).rejects.toThrow(/is not implemented./);
		});
		it("#broadcastSpread", async () => {
			await expect(subject.broadcastSpread([], [])).rejects.toThrow(/is not implemented./);
		});
	});
});
