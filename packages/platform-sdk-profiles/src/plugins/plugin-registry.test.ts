import "jest-extended";

import nock from "nock";

import { bootContainer } from "../../test/helpers";
import { PluginRegistry } from "./plugin-registry";
import { ExpandedRegistryPlugin } from "./plugin-registry.models";

const pluginNames: string[] = [
	"@alessiodf/bold-ninja",
	"@alessiodf/connect-4",
	"@alessiodf/match-3",
	"@alessiodf/minesweeper-flags",
	"@alessiodf/t-grexx",
	"@alessiodf/universal-delegate-monitor",
	"@arkecosystem/additional-avatars",
	"@arkecosystem/desktop-wallet-explorer",
	"@arkecosystem/desktop-wallet-sound-notifications",
	"@arkecosystem/desktop-wallet-theme-dark-contrast",
	"@azure-infinity/beyond-infinity",
	"@azure-infinity/cyberpunk-theme",
	"@azure-infinity/infinite-universe",
	"@borismar/ark-desktop-wallet-theme-one",
	"@breno.polanski/animal-avatars-ark-wallet",
	"@breno.polanski/brazilian-portuguese-language-plugin",
	"@breno.polanski/dracula-theme-ark-wallet",
	"@cambot1088/cyj-theme_2",
	"@dancingleprechaun/green-wallet-template",
	"@dancingleprechaun/troll-plugin",
	"@daniel.barta/lively-wallet-template",
	"@dated/delegate-calculator-plugin",
	"@dated/italian-language-plugin",
	"@dated/transaction-export-plugin",
	"@doubled1c3/youtube-demo-theme",
	"@dvnc/dvnc-wallet-theme-template",
	"@elevenyellow.com/ark-switchain-plugin",
	"@giliam/ark-breeze",
	"@giliam/ark-pro",
	"@giliam/ark-pure",
	"@jarunik/german-language-plugin",
	"@khlilo58/captivating-theme-template",
	"@marcow/desktop-wallet-theme",
	"@pieface/avfc-theme",
	"@ross121/red-snow-theme",
	"cn-ark-plugin",
];

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
		nock("https://registry.npmjs.com")
			.get("/-/v1/search")
			.query(true)
			.once()
			.reply(200, require("../../test/fixtures/plugins/index.json"))
			.get("/-/v1/search")
			.query(true)
			.once()
			.reply(200, {});

		await expect(subject.all()).resolves.toHaveLength(22); // 22 because not all plugins link to a repository.
	});

	it("should expand the information for the given partial plugin", async () => {
		nock("https://registry.npmjs.com")
			.get("/-/v1/search")
			.query(true)
			.once()
			.reply(200, require("../../test/fixtures/plugins/index.json"))
			.get("/-/v1/search")
			.query(true)
			.once()
			.reply(200, {});

		const partial = (await subject.all())[0];

		nock("https://registry.npmjs.com")
			.get(`/${partial.id()}`)
			.reply(200, require("../../test/fixtures/plugins/show.json"));

		nock("https://api.npmjs.org")
			.get(`/downloads/range/2005-01-01:${new Date().getFullYear() + 1}-01-01/${partial.id()}`)
			.reply(200, require("../../test/fixtures/plugins/downloads.json"));

		await expect(subject.expand(partial)).resolves.toBeInstanceOf(ExpandedRegistryPlugin);
	});
});
