import "jest-extended";

import { ValidatorSchema } from "@arkecosystem/platform-sdk-support";

import { Config, ConfigKey } from "./config";

let subject: Config;

beforeEach(
	() =>
		(subject = new Config(
			{
				network: "ark.mainnet",
			},
			ValidatorSchema.object({
				network: ValidatorSchema.string().valid("ark.mainnet", "ark.devnet").required(),
			}),
		)),
);

test("#constructor", () => {
	expect(
		() =>
			new Config(
				{
					network: "invalid",
				},
				ValidatorSchema.object({
					network: ValidatorSchema.string().valid("ark.mainnet", "ark.devnet").required(),
				}),
			),
	).toThrow('Failed to validate the configuration: "network" must be one of [ark.mainnet, ark.devnet]');
});

test("#all", () => {
	expect(subject.all()).toMatchInlineSnapshot(`
		Object {
		  "network": "ark.mainnet",
		}
	`);
});

test("#get | #set", () => {
	expect(subject.get("network")).toBe("ark.mainnet");

	subject.set("network", "ark.devnet");

	expect(subject.get("network")).toBe("ark.devnet");

	expect(() => subject.get("key")).toThrow("The [key] is an unknown configuration value.");
});

test("#getLoose", () => {
	expect(() => subject.getLoose("hello.world")).not.toThrow("The [key] is an unknown configuration value.");
});

test("#has", () => {
	expect(subject.has("key")).toBeFalse();

	subject.set("key", "value");

	expect(subject.has("key")).toBeTrue();
});

test("#missing", () => {
	expect(subject.missing("key")).toBeTrue();

	subject.set("key", "value");

	expect(subject.missing("key")).toBeFalse();
});

test("ConfigKey", () => {
	expect(ConfigKey).toMatchInlineSnapshot(`
		Object {
		  "Bech32": "network.constants.bech32",
		  "CurrencyDecimals": "network.currency.decimals",
		  "CurrencyTicker": "network.currency.ticker",
		  "HttpClient": "httpClient",
		  "KnownWallets": "network.knownWallets",
		  "Network": "network",
		  "NetworkId": "network.id",
		  "Slip44": "network.constants.slip44",
		}
	`);
});
