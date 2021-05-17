import nock from "nock";

import { createConfig } from "../../test/helpers";
import { dummyPeersPublicApi, dummyPeersWalletApi } from "../../test/mocks/peers";
import { PeerService } from "./peer";

beforeEach(() => {
	nock.cleanAll();

	nock("http://127.0.0.1")
		.get("/api/node/configuration")
		.reply(200, require("../../test/fixtures/client/configuration.json"))
		.persist();
});

describe("PeerService", () => {
	describe("#search", () => {
		let peerService: PeerService;
		beforeEach(async () => {
			nock("http://127.0.0.1").get("/api/peers").reply(200, {
				data: dummyPeersWalletApi,
			});

			peerService = await PeerService.__construct(createConfig({ peer: "http://127.0.0.1/api" }));
		});

		it("should find peers", async () => {
			nock(/.+/).get("/api/peers").reply(200, {
				data: dummyPeersWalletApi,
			});

			await expect(peerService.search()).resolves.toEqual(dummyPeersWalletApi);
		});

		it("should filter by version", async () => {
			nock(/.+/).get("/api/peers").twice().reply(200, {
				data: dummyPeersWalletApi,
			});

			await expect(peerService.search({ filters: { version: "2.6.0" } })).resolves.toEqual([
				dummyPeersWalletApi[1],
			]);

			await expect(peerService.search({ filters: { version: ">=2.5.0" } })).resolves.toEqual(dummyPeersWalletApi);
		});

		it("should filter by latency", async () => {
			nock(/.+/).get("/api/peers").twice().reply(200, {
				data: dummyPeersWalletApi,
			});

			await expect(peerService.search({ filters: { latency: 150 } })).resolves.toEqual([dummyPeersWalletApi[1]]);

			await expect(peerService.search({ filters: { latency: 250 } })).resolves.toEqual(dummyPeersWalletApi);
		});

		it("should sort by latency asc", async () => {
			nock(/.+/).get("/api/peers").reply(200, {
				data: dummyPeersWalletApi,
			});

			await expect(peerService.search({ orderBy: ["latency", "asc"] })).resolves.toEqual([
				dummyPeersWalletApi[1],
				dummyPeersWalletApi[0],
			]);
		});

		it("should sort by version desc", async () => {
			nock(/.+/).get("/api/peers").reply(200, {
				data: dummyPeersWalletApi,
			});

			await expect(peerService.search({ orderBy: ["version", "desc"] })).resolves.toEqual([
				dummyPeersWalletApi[1],
				dummyPeersWalletApi[0],
			]);
		});
	});
});
