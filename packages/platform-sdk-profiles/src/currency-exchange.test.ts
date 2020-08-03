import "jest-extended";

import { Request } from "@arkecosystem/platform-sdk-http-got";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import nock from "nock";

import { container } from "./container";
import { Identifiers } from "./container.models";
import { CurrencyExchange } from "./currency-exchange";

let subject: CurrencyExchange;

beforeEach(async () => {
	nock.cleanAll();

	nock(/.+/)
		.get("/data/dayAvg")
		.query(true)
		.reply(200, { BTC: 0.00005048, ConversionType: { type: "direct", conversionSymbol: "" } })
		.persist();

	container.set(Identifiers.HttpClient, new Request());

	subject = new CurrencyExchange("cryptocompare");
});

beforeAll(() => nock.disableNetConnect());

it("should convert from ARK to BTC", async () => {
	await expect(subject.from("ARK").to("BTC").convert(BigNumber.make(10))).resolves.toEqual(
		BigNumber.make(10).times(0.00005048),
	);
});
