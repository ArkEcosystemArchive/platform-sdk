import "jest-extended";

import { DTO } from "@arkecosystem/platform-sdk";
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
	it("#wallet should succeed", async () => {
		nock(/.+/)
			.post("/")
			.reply(200, require(`${__dirname}/../../test/fixtures/client/transactions-0.json`))
			.post("/")
			.reply(200, require(`${__dirname}/../../test/fixtures/client/transactions-20.json`))
			.post("/")
			.reply(200, require(`${__dirname}/../../test/fixtures/client/utxos-aggregate.json`));

		const result = await subject.wallet(
			"aec30330deaecdd7503195a0d730256faef87027022b1bdda7ca0a61bca0a55e4d575af5a93bdf4905a3702fadedf451ea584791d233ade90965d608bac57304",
		);

		expect(result).toBeInstanceOf(WalletData);
		expect(result.address()).toBe(
			"aec30330deaecdd7503195a0d730256faef87027022b1bdda7ca0a61bca0a55e4d575af5a93bdf4905a3702fadedf451ea584791d233ade90965d608bac57304",
		);
		expect(result.balance().toString()).toEqual("2024831199");
	});

	it("#transactions", async () => {
		nock(/.+/)
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
		nock(/.+/)
			.post(/.*/)
			.reply(200, require(`${__dirname}/../../test/fixtures/client/transaction.json`));

		const result = await subject.transaction("35b40547f04963d3b41478fc27038948d74718802c486d9125f1884d8c83a31d");
		expect(result).toBeInstanceOf(TransactionData);
		expect(result.id()).toBe("35b40547f04963d3b41478fc27038948d74718802c486d9125f1884d8c83a31d");

		expect(result.blockId()).toBeUndefined();

		expect(result.timestamp()?.toISOString()).toBe("2021-02-05T15:04:16.000Z");

		expect(result.confirmations().toString()).toBe("0");

		expect(result.sender()).toBe(
			"addr_test1qrhvwtn8sa3duzkm93v5kjjxlv5lvg67j530wyeumngu23lk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s4s8xvh",
		);

		expect(result.recipient()).toBe(
			"addr_test1qzct2hsralem3fqn8fupu90v3jkelpg4rfp4zqx06zgevpachk6az8jcydma5a6vgsuw5c37v0c8j6rlclpqajn2vxsq3rz4th",
		);

		const actual = result.recipients();
		expect(actual[0].address).toBe(
			"addr_test1qzct2hsralem3fqn8fupu90v3jkelpg4rfp4zqx06zgevpachk6az8jcydma5a6vgsuw5c37v0c8j6rlclpqajn2vxsq3rz4th",
		);
		expect(actual[0].amount.toString()).toBe("25000000");
		expect(actual[1].address).toBe(
			"addr_test1qzfjfm724nv9qz6nfyagmj0j2uppr35gzv5qee8s7489wxlk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33scc4thv",
		);
		expect(actual[1].amount.toString()).toBe("4831199");

		const inputs = result.inputs();
		expect(inputs).toBeArrayOfSize(1);
		expect(inputs[0]).toBeInstanceOf(DTO.UnspentTransactionData);
		expect(inputs[0].id()).toBe("6bf76f4380da8a389ae0a7ecccf1922b74ae11d773ba8b1b761d84a1b4474a4f");
		expect(inputs[0].amount()).toEqual(BigNumber.make(30000000));
		expect(inputs[0].addresses()).toEqual([
			"addr_test1qrhvwtn8sa3duzkm93v5kjjxlv5lvg67j530wyeumngu23lk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s4s8xvh",
		]);

		const outputs = result.outputs();
		expect(outputs).toBeArrayOfSize(2);
		expect(outputs[0]).toBeInstanceOf(DTO.UnspentTransactionData);
		expect(outputs[0].amount().toString()).toBe("25000000");
		expect(outputs[0].addresses()).toEqual([
			"addr_test1qzct2hsralem3fqn8fupu90v3jkelpg4rfp4zqx06zgevpachk6az8jcydma5a6vgsuw5c37v0c8j6rlclpqajn2vxsq3rz4th",
		]);
		expect(outputs[1]).toBeInstanceOf(DTO.UnspentTransactionData);
		expect(outputs[1].amount().toString()).toBe("4831199");
		expect(outputs[1].addresses()).toEqual([
			"addr_test1qzfjfm724nv9qz6nfyagmj0j2uppr35gzv5qee8s7489wxlk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33scc4thv",
		]);

		expect(result.amount().toString()).toBe("25000000");

		expect(result.fee().toString()).toBe("168801");
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

		it.skip("#broadcast", async () => {
			await expect(subject.broadcast([])).rejects.toThrow(/is not implemented./);
		});

		it("#broadcastSpread", async () => {
			await expect(subject.broadcastSpread([], [])).rejects.toThrow(/is not implemented./);
		});
	});
});
