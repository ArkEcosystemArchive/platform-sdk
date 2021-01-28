import "jest-extended";

import nock from "nock";

import { bootContainer } from "../../test/helpers";
import { PluginRegistry } from "./plugin-registry";

const createNetworkMocks = () => {
	nock("https://registry.npmjs.com")
		.get("/-/v1/search")
		.query(true)
		.once()
		.reply(200, require("../../test/fixtures/plugins/index.json"))
		.get("/-/v1/search")
		.query(true)
		.once()
		.reply(200, {});

	const plugins = require("../../test/fixtures/plugins/index.json").objects;

	for (const { package: plugin } of plugins) {
		if (plugin.links?.repository === undefined) {
			continue;
		}

		nock("https://raw.github.com")
			.get(`${plugin.links.repository.replace("https://github.com", "")}/master/package.json`)
			.reply(200, require("../../test/fixtures/plugins/github.json"));
	}
}

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

		// 22 because not all plugins link to a public repository.
		expect(result).toHaveLength(22);

		// Ensure that all properties are loaded correctly based on NPM and package.json data
		const pkg = result[0];
		expect(pkg.id()).toBe("@dated/transaction-export-plugin");
		expect(pkg.name()).toBe("@dated/transaction-export-plugin");
		expect(pkg.alias()).toBe("Transaction Export");
		expect(pkg.date()).toBe("2020-11-26T21:18:44.681Z");
		expect(pkg.version()).toBe("1.0.3");
		expect(pkg.description()).toBe("Export your wallet transaction history");
		expect(pkg.author()).toEqual({"email": "hello@dated.fun", "name": "Edgar Goetzendorff", "username": "dated"});
		expect(pkg.sourceProvider()).toEqual({"name": "github", "url": "https://github.com/dated/transaction-export-plugin"});
		expect(pkg.logo()).toBe("https://raw.githubusercontent.com/dated/transaction-export-plugin/master/logo.png");
		expect(pkg.images()).toEqual(["https://raw.githubusercontent.com/dated/transaction-export-plugin/master/images/preview-1.png", "https://raw.githubusercontent.com/dated/transaction-export-plugin/master/images/preview-2.png", "https://raw.githubusercontent.com/dated/transaction-export-plugin/master/images/preview-3.png"]);
		expect(pkg.categories()).toEqual(["utility"]);
		expect(pkg.permissions()).toEqual(["COMPONENTS", "ROUTES", "MENU_ITEMS", "UI_COMPONENTS", "PROFILE_CURRENT", "PEER_ALL", "HTTP", "UTILS", "STORAGE", "ALERTS", "DIALOGS"]);
		expect(pkg.urls()).toEqual(['^']);
		expect(pkg.minimumVersion()).toBe("2.9.1");
	});

	it("should get the size of the given plugin", async () => {
		createNetworkMocks();

		nock("https://registry.npmjs.com")
			.get("/@dated/transaction-export-plugin")
			.reply(200, require("../../test/fixtures/plugins/show.json"));

		await expect(subject.size((await subject.all())[0])).resolves.toBe(304275);
	});

	it("should get the download count of the given plugin", async () => {
		createNetworkMocks();

		nock("https://api.npmjs.org")
			.get(`/downloads/range/2005-01-01:${new Date().getFullYear() + 1}-01-01/@dated/transaction-export-plugin`)
			.reply(200, require("../../test/fixtures/plugins/downloads.json"));

		await expect(subject.downloads((await subject.all())[0])).resolves.toBe(446);
	});
});
