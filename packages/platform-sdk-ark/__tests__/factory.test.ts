import "jest-extended";
import nock from "nock";

import { Factory } from "../src/factory";

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

describe("Factory", function () {
	it("should construct and destruct", async () => {
		nock("https://dexplorer.ark.io/api")
			.get("/peers")
			.reply(200, require(`${__dirname}/__fixtures__/client/peers.json`))
			.get("/node/configuration/crypto")
			.reply(200, require(`${__dirname}/__fixtures__/client/cryptoConfiguration.json`))
			.get("/node/syncing")
			.reply(200, require(`${__dirname}/__fixtures__/client/syncing.json`));

		const result = await Factory.construct({
			network: "test",
			peer: "https://dexplorer.ark.io/api",
			services: {
				client: {},
				fee: {},
				identity: {},
				ledger: {},
				link: {},
				message: {},
				peer: {},
				transaction: {},
			},
		});

		expect(result).toBeInstanceOf(Factory);

		await expect(result.destruct()).resolves.toBeUndefined();
	});
});
