import "jest-extended";

import nock from "nock";

import { createConfig } from "../../test/helpers";
import { TransactionData, WalletData } from "../dto";
import { ClientService } from "./client";

let subject: ClientService;

beforeEach(async () => (subject = await ClientService.__construct(createConfig())));

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

describe("ClientService", function () {
	it("#wallet should succeed", async () => {
		nock("http://localhost:8090")
			.get("/v2/wallets/98c83431e94407bc0889e09953461fe5cecfdf18")
			.reply(200, require(`${__dirname}/../../test/fixtures/client/wallet.json`));

		const result = await subject.wallet("98c83431e94407bc0889e09953461fe5cecfdf18");

		expect(result).toBeInstanceOf(WalletData);
		expect(result.address()).toBe("98c83431e94407bc0889e09953461fe5cecfdf18");
		expect(result.balance().toString()).toEqual("2000000000");
	});

	it("#transactions", async () => {
		nock("http://localhost:8090")
			.get("/v2/wallets/98c83431e94407bc0889e09953461fe5cecfdf18/transactions")
			.reply(200, require(`${__dirname}/../../test/fixtures/client/transactions.json`));

		const result = await subject.transactions({
			walletId: "98c83431e94407bc0889e09953461fe5cecfdf18",
		});

		expect(result).toBeObject();
		expect(result.items()).toBeArrayOfSize(5);
		expect(result.items()[0]).toBeInstanceOf(TransactionData);
	});

	it("#transaction", async () => {
		nock("http://localhost:8090")
			.get(
				"/v2/wallets/98c83431e94407bc0889e09953461fe5cecfdf18/transactions/35b40547f04963d3b41478fc27038948d74718802c486d9125f1884d8c83a31d",
			)
			.reply(200, require(`${__dirname}/../../test/fixtures/client/transaction.json`));

		const result = await subject.transaction("35b40547f04963d3b41478fc27038948d74718802c486d9125f1884d8c83a31d", {
			walletId: "98c83431e94407bc0889e09953461fe5cecfdf18",
		});
		expect(result).toBeInstanceOf(TransactionData);
	});

	describe("unimplemented methods", () => {
		it("#wallets", async () => {
			await expect(subject.wallets({})).rejects.toThrow(/is not implemented./);
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
