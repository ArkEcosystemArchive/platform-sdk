import "reflect-metadata";

import { ARK } from "@arkecosystem/platform-sdk-ark";
import { BTC } from "@arkecosystem/platform-sdk-btc";
import { ETH } from "@arkecosystem/platform-sdk-eth";
import { Request } from "@arkecosystem/platform-sdk-http-got";

import { container } from "../environment/container";
import { DriverFactory } from "./driver.factory";
import { StubStorage } from "../../test/stubs/storage";

it("should create a new driver instance", () => {
	expect(() => DriverFactory.make("memory", container, { coins: { ARK, BTC, ETH }, httpClient: new Request(), storage: new StubStorage() })).not.toThrow();
});

it("should fail to create a new driver instance", () => {
	expect(() => DriverFactory.make("404", container, { coins: { ARK, BTC, ETH }, httpClient: new Request(), storage: new StubStorage() })).toThrow();
});
