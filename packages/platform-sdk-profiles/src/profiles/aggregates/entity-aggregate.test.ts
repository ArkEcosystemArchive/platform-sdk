import "jest-extended";

import nock from "nock";

import { bootContainer } from "../../../test/helpers";
import { ExtendedTransactionDataCollection } from "../../dto/transaction-collection";
import { EntitySubType, EntityType } from "../../enums";
import * as promiseHelpers from "../../helpers/promise";
import { Profile } from "../profile";

let profile: Profile;

const entityActionMap = {
	registrations: "register",
	updates: "update",
	resignations: "resign",
};

beforeAll(() => bootContainer());

beforeEach(async () => {
	nock.disableNetConnect();

	nock(/.+/)
		.get("/api/node/configuration/crypto")
		.reply(200, require("../../../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/node/configuration")
		.reply(200, require("../../../test/fixtures/client/configuration.json"))
		.get("/api/peers")
		.reply(200, require("../../../test/fixtures/client/peers.json"))
		.get("/api/node/syncing")
		.reply(200, require("../../../test/fixtures/client/syncing.json"))
		.get("/api/wallets/D5sRKWckH4rE1hQ9eeMeHAepgyC3cvJtwb")
		.reply(200, require("../../../test/fixtures/wallets/D5sRKWckH4rE1hQ9eeMeHAepgyC3cvJtwb.json"))
		.persist();

	profile = new Profile({ id: "uuid", name: "name", avatar: "avatar", data: "" });
	const address = "D5sRKWckH4rE1hQ9eeMeHAepgyC3cvJtwb";

	await profile.wallets().importByAddress(address, "ARK", "ark.devnet");
});

afterAll(() => nock.enableNetConnect());

describe("EntityAggregate", () => {
	describe.each(["registrations", "updates", "resignations"])("%s", (method: string) => {
		it("should have more", async () => {
			nock.cleanAll();
			nock(/.+/)
				.get("/api/transactions")
				.query(true)
				.reply(200, require("../../../test/fixtures/client/registrations/business.json"));

			const results = await profile.entityAggregate()[method](EntityType.Business, EntitySubType.None);
			expect(results).toBeInstanceOf(ExtendedTransactionDataCollection);
			expect(results.items()).toHaveLength(1);
			expect(profile.entityAggregate().hasMore(`0.0.${entityActionMap[method]}`)).toBeTrue();
		});

		it("should have no more", async () => {
			nock.cleanAll();
			nock(/.+/)
				.get("/api/transactions")
				.query(true)
				.reply(200, require("../../../test/fixtures/client/registrations/no-more.json"));

			const results = await profile.entityAggregate()[method](EntityType.Business, EntitySubType.None);
			expect(results).toBeInstanceOf(ExtendedTransactionDataCollection);
			expect(results.items()).toHaveLength(1);
			expect(profile.entityAggregate().hasMore(`0.0.${entityActionMap[method]}`)).toBeFalse();
		});

		it("should skip empty results for processing", async () => {
			nock.cleanAll();
			nock(/.+/)
				.get("/api/transactions")
				.query(true)
				.reply(200, require("../../../test/fixtures/client/registrations/business.json"));

			const firstPage = await profile.entityAggregate()[method](EntityType.Business, EntitySubType.None);
			expect(firstPage.findById("df520b0a278314e998dc93be1e20c72b8313950c19da23967a9db60eb4e990da")).toBeTruthy();

			nock.cleanAll();
			nock(/.+/).get("/api/transactions").query(true).reply(200, { meta: {}, data: [] });

			profile.entityAggregate().flush();
			const nextPage = await profile.entityAggregate()[method](EntityType.Business, EntitySubType.None);
			expect(nextPage.items()).toHaveLength(0);
		});

		it("should fetch once and then stop", async () => {
			nock.cleanAll();
			nock(/.+/)
				.get("/api/transactions")
				.query(true)
				.reply(200, require("../../../test/fixtures/client/registrations/business.json"))
				.get("/api/transactions")
				.query(true)
				.reply(200, require("../../../test/fixtures/client/registrations/business.json"))
				.get("/api/transactions")
				.query(true)
				.reply(200, require("../../../test/fixtures/client/registrations/no-more.json"));

			const firstPage = await profile.entityAggregate()[method](EntityType.Business, EntitySubType.None);
			expect(firstPage.items()).toHaveLength(1);
			expect(profile.entityAggregate().hasMore(`0.0.${entityActionMap[method]}`)).toBeTrue();

			const secondPage = await profile.entityAggregate()[method](EntityType.Business, EntitySubType.None);
			expect(secondPage.items()).toHaveLength(1);
			expect(profile.entityAggregate().hasMore(`0.0.${entityActionMap[method]}`)).toBeTrue();

			const thirdPage = await profile.entityAggregate()[method](EntityType.Business, EntitySubType.None);
			expect(thirdPage.items()).toHaveLength(1);
			expect(profile.entityAggregate().hasMore(`0.0.${entityActionMap[method]}`)).toBeFalse();
		});

		it("should fetch until there are no more", async () => {
			nock.cleanAll();
			nock(/.+/)
				.get("/api/transactions")
				.query(true)
				.reply(200, require("../../../test/fixtures/client/registrations/business.json"))
				.get("/api/transactions")
				.query(true)
				.reply(200, require("../../../test/fixtures/client/registrations/business.json"))
				.get("/api/transactions")
				.query(true)
				.reply(200, require("../../../test/fixtures/client/registrations/no-more.json"))
				.get("/api/transactions")
				.query(true);

			const firstPage = await profile.entityAggregate()[method](EntityType.Business, EntitySubType.None);
			expect(firstPage.items()).toHaveLength(1);
			expect(profile.entityAggregate().hasMore(`0.0.${entityActionMap[method]}`)).toBeTrue();

			const secondPage = await profile.entityAggregate()[method](EntityType.Business, EntitySubType.None);
			expect(secondPage.items()).toHaveLength(1);
			expect(profile.entityAggregate().hasMore(`0.0.${entityActionMap[method]}`)).toBeTrue();

			const thirdPage = await profile.entityAggregate()[method](EntityType.Business, EntitySubType.None);
			expect(thirdPage.items()).toHaveLength(1);
			expect(profile.entityAggregate().hasMore(`0.0.${entityActionMap[method]}`)).toBeFalse();

			const fourth = await profile.entityAggregate()[method](EntityType.Business, EntitySubType.None);
			expect(fourth.items()).toHaveLength(0);
			expect(profile.entityAggregate().hasMore(`0.0.${entityActionMap[method]}`)).toBeFalse();
		});

		it("should flush the history", async () => {
			nock.cleanAll();
			nock(/.+/)
				.get("/api/transactions")
				.query(true)
				.reply(200, require("../../../test/fixtures/client/registrations/business.json"));

			profile.entityAggregate().flush();
			expect(profile.entityAggregate().hasMore(`0.0.${entityActionMap[method]}`)).toBeFalse();
			await profile.entityAggregate()[method](EntityType.Business, EntitySubType.None);

			expect(profile.entityAggregate().hasMore(`0.0.${entityActionMap[method]}`)).toBeTrue();
		});

		it("should handle undefined  promiseAllSettledByKey responses in aggregate", async () => {
			nock(/.+/)
				.get("/api/transactions")
				.query(true)
				.reply(200, require("../../../test/fixtures/client/registrations/business.json"));

			const promiseAllSettledByKeyMock = jest
				.spyOn(promiseHelpers, "promiseAllSettledByKey")
				//@ts-ignore
				.mockImplementation(() => {
					return Promise.resolve(undefined);
				});

			const results = await profile.entityAggregate()[method](EntityType.Business, EntitySubType.None);
			expect(results).toBeInstanceOf(ExtendedTransactionDataCollection);
			promiseAllSettledByKeyMock.mockRestore();
		});
	});
});
