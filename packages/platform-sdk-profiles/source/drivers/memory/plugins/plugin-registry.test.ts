import "jest-extended";
import "reflect-metadata";

import nock from "nock";

import { bootContainer } from "../../../../test/mocking";
import { PluginRegistry } from "./plugin-registry";

const createNetworkMocks = () => {
	nock("https://raw.githubusercontent.com")
		.get("/ArkEcosystem/common/master/desktop-wallet/whitelist.json")
		.once()
		.reply(200, require("../../../../test/fixtures/plugins/whitelist.json"));

	nock("https://registry.npmjs.com")
		.get("/-/v1/search")
		.query(true)
		.once()
		.reply(200, require("../../../../test/fixtures/plugins/index.json"))
		.get("/-/v1/search")
		.query(true)
		.once()
		.reply(200, {});

	const plugins = require("../../../../test/fixtures/plugins/index.json").objects;

	for (const { package: plugin } of plugins) {
		if (plugin.links?.repository === undefined) {
			continue;
		}

		nock("https://raw.github.com")
			.get(`${plugin.links.repository.replace("https://github.com", "")}/master/package.json`)
			.reply(200, require("../../../../test/fixtures/plugins/github.json"));
	}
};

let subject: PluginRegistry;

beforeAll(() => {
	nock.disableNetConnect();

	bootContainer();
});

beforeEach(() => {
	subject = new PluginRegistry();
});

afterEach(() => nock.cleanAll());

describe("PluginRegistry", () => {
	it("should list all plugins", async () => {
		createNetworkMocks();

		const result = await subject.all();

		expect(result).toHaveLength(17);
		expect(result[0].toObject()).toMatchInlineSnapshot(`
		Object {
		  "alias": "Transaction Export",
		  "author": Object {
		    "name": "Switchain",
		  },
		  "categories": Array [
		    "utility",
		  ],
		  "date": "2020-03-17T08:27:19.488Z",
		  "description": "Switchain plugin on Ark Desktop Wallet",
		  "id": "@elevenyellow.com/ark-switchain-plugin",
		  "images": Array [
		    "https://raw.githubusercontent.com/dated/transaction-export-plugin/master/images/preview-1.png",
		    "https://raw.githubusercontent.com/dated/transaction-export-plugin/master/images/preview-2.png",
		    "https://raw.githubusercontent.com/dated/transaction-export-plugin/master/images/preview-3.png",
		  ],
		  "logo": "https://raw.githubusercontent.com/dated/transaction-export-plugin/master/logo.png",
		  "minimumVersion": "2.9.1",
		  "name": "@elevenyellow.com/ark-switchain-plugin",
		  "permissions": Array [
		    "COMPONENTS",
		    "ROUTES",
		    "MENU_ITEMS",
		    "UI_COMPONENTS",
		    "PROFILE_CURRENT",
		    "PEER_ALL",
		    "HTTP",
		    "UTILS",
		    "STORAGE",
		    "ALERTS",
		    "DIALOGS",
		  ],
		  "sourceProvider": Object {
		    "name": "github",
		    "url": "https://github.com/elevenyellow/ark-switchain-plugin",
		  },
		  "urls": Array [
		    "^",
		  ],
		  "version": "1.2.0",
		}
	`);
	});

	it("should get the size of the given plugin", async () => {
		createNetworkMocks();

		nock("https://registry.npmjs.com")
			.get("/@elevenyellow.com/ark-switchain-plugin")
			.reply(200, require("../../../../test/fixtures/plugins/show.json"));

		await expect(subject.size((await subject.all())[0])).resolves.toMatchInlineSnapshot(`605882`);
	});

	it("should get the download count of the given plugin", async () => {
		createNetworkMocks();

		nock("https://api.npmjs.org")
			.get(
				`/downloads/range/2005-01-01:${
					new Date().getFullYear() + 1
				}-01-01/@elevenyellow.com/ark-switchain-plugin`,
			)
			.reply(200, require("../../../../test/fixtures/plugins/downloads.json"));

		await expect(subject.downloads((await subject.all())[0])).resolves.toBe(446);
	});
});
