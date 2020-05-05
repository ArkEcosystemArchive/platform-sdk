import nock from "nock";

import { PeerService } from "../../src/services/peer";
import { dummyPeersPublicApi, dummyPeersWalletApi, dummySeeds } from "./mocks/peers";

beforeEach(() => nock.cleanAll());

describe("PeerService", () => {
	describe("new instance", () => {
		it("should fail if no network or host is provided", async () => {
			await expect(
				PeerService.construct({
					// @ts-ignore
					networkOrHost: undefined,
				}),
			).rejects.toThrowError(new Error("No network or host provided"));
		});

		describe("host", () => {
			it("should fetch peers", async () => {
				nock("http://127.0.0.1").get("/api/v2/peers").reply(200, {
					data: dummyPeersWalletApi,
				});

				const peerService: PeerService = await PeerService.construct({
					networkOrHost: "http://127.0.0.1/api/v2/peers",
				});

				expect(peerService.getSeeds()).toEqual(
					dummyPeersWalletApi.map((peer) => ({
						ip: peer.ip,
						port: 4140,
					})),
				);
			});

			it("should fetch peers and fallback to public api port", async () => {
				nock("http://127.0.0.1").get("/api/v2/peers").reply(200, {
					data: dummyPeersPublicApi,
				});

				const peerService: PeerService = await PeerService.construct({
					networkOrHost: "http://127.0.0.1/api/v2/peers",
				});

				expect(peerService.getSeeds()).toEqual(
					dummyPeersPublicApi.map((peer) => ({
						ip: peer.ip,
						port: 4103,
					})),
				);
			});

			it("should fail if the seed list is empty", async () => {
				nock("http://127.0.0.1").get("/api/v2/peers").reply(200, {
					data: [],
				});

				await expect(
					PeerService.construct({
						networkOrHost: "http://127.0.0.1/api/v2/peers",
					}),
				).rejects.toThrowError(new Error("No seeds found"));
			});
		});

		describe("github", () => {
			it("should fetch peers", async () => {
				nock("https://raw.githubusercontent.com/ArkEcosystem/peers/master")
					.get("/mainnet.json")
					.reply(200, dummySeeds);

				const peerService: PeerService = await PeerService.construct({ networkOrHost: "mainnet" });

				expect(peerService.getSeeds()).toEqual(dummySeeds.map((peer) => ({ ip: peer.ip, port: 4003 })));
			});

			it("should fail if a 404 response is received", async () => {
				nock("https://raw.githubusercontent.com/ArkEcosystem/peers/master").get("/failnet.json").reply(404);

				await expect(
					PeerService.construct({
						networkOrHost: "failnet",
					}),
				).rejects.toThrowError(new Error("Failed to discovery any peers."));
			});

			it("should fail if the seed list is empty", async () => {
				nock("https://raw.githubusercontent.com/ArkEcosystem/peers/master").get("/mainnet.json").reply(200, []);

				await expect(
					PeerService.construct({
						networkOrHost: "mainnet",
					}),
				).rejects.toThrowError(new Error("No seeds found"));
			});
		});
	});

	describe("search", () => {
		let peerService: PeerService;
		beforeEach(async () => {
			nock("http://127.0.0.1").get("/api/v2/peers").reply(200, {
				data: dummyPeersWalletApi,
			});

			peerService = await PeerService.construct({ networkOrHost: "http://127.0.0.1/api/v2/peers" });
		});

		it("should find peers", async () => {
			nock(/.+/).get("/api/v2/peers").reply(200, {
				data: dummyPeersWalletApi,
			});

			await expect(peerService.search()).resolves.toEqual(dummyPeersWalletApi);
		});

		it("should retry", async () => {
			nock(/.+/).get("/api/v2/peers").twice().reply(500).get("/api/v2/peers").reply(200, {
				data: dummyPeersWalletApi,
			});

			const peers = await peerService.search({
				retry: { limit: 3 },
			});

			expect(peers).toEqual(dummyPeersWalletApi);
		});

		it("should timeout", async () => {
			nock(/.+/).get("/api/v2/peers").delay(2000).reply(200, {
				data: dummyPeersWalletApi,
			});

			await expect(
				peerService.search({
					timeout: 1000,
				}),
			).rejects.toThrowError(new Error("Request timed out"));
		});

		it("should filter by version", async () => {
			nock(/.+/).get("/api/v2/peers").twice().reply(200, {
				data: dummyPeersWalletApi,
			});

			await expect(peerService.search({ filters: { version: "2.6.0" } })).resolves.toEqual([
				dummyPeersWalletApi[1],
			]);

			await expect(peerService.search({ filters: { version: ">=2.5.0" } })).resolves.toEqual(dummyPeersWalletApi);
		});

		it("should filter by latency", async () => {
			nock(/.+/).get("/api/v2/peers").twice().reply(200, {
				data: dummyPeersWalletApi,
			});

			await expect(peerService.search({ filters: { latency: 150 } })).resolves.toEqual([dummyPeersWalletApi[1]]);

			await expect(peerService.search({ filters: { latency: 250 } })).resolves.toEqual(dummyPeersWalletApi);
		});

		it("should sort by latency asc", async () => {
			nock(/.+/).get("/api/v2/peers").reply(200, {
				data: dummyPeersWalletApi,
			});

			await expect(peerService.search({ orderBy: ["latency", "asc"] })).resolves.toEqual([
				dummyPeersWalletApi[1],
				dummyPeersWalletApi[0],
			]);
		});

		it("should sort by version desc", async () => {
			nock(/.+/).get("/api/v2/peers").reply(200, {
				data: dummyPeersWalletApi,
			});

			await expect(peerService.search({ orderBy: ["version", "desc"] })).resolves.toEqual([
				dummyPeersWalletApi[1],
				dummyPeersWalletApi[0],
			]);
		});
	});

	describe("searchWithPlugin", () => {
		let peerService: PeerService;
		beforeEach(async () => {
			nock("http://127.0.0.1").get("/api/v2/peers").reply(200, {
				data: dummyPeersWalletApi,
			});

			peerService = await PeerService.construct({ networkOrHost: "http://127.0.0.1/api/v2/peers" });
		});

		it("should find peers without the wallet api plugin", async () => {
			nock(/.+/).get("/api/v2/peers").reply(200, {
				data: dummyPeersPublicApi,
			});

			await expect(peerService.searchWithPlugin("core-wallet-api")).resolves.toEqual([]);
		});

		it("should find peers with the wallet api plugin", async () => {
			nock(/.+/).get("/api/v2/peers").reply(200, {
				data: dummyPeersWalletApi,
			});

			const validPeers = dummyPeersWalletApi.map((peer) => ({ ip: peer.ip, port: 4140 }));
			await expect(peerService.searchWithPlugin("core-wallet-api")).resolves.toEqual(validPeers);
		});

		it("should get additional peer data", async () => {
			nock(/.+/).get("/api/v2/peers").reply(200, {
				data: dummyPeersWalletApi,
			});

			const validPeers = dummyPeersWalletApi.map((peer) => ({ ip: peer.ip, port: 4140, version: peer.version }));
			await expect(
				peerService.searchWithPlugin("core-wallet-api", {
					additional: ["version"],
				}),
			).resolves.toEqual(validPeers);
		});

		it("should ignore additional peer data that does not exist", async () => {
			nock(/.+/).get("/api/v2/peers").reply(200, {
				data: dummyPeersWalletApi,
			});

			const validPeers = dummyPeersWalletApi.map((peer) => ({ ip: peer.ip, port: 4140 }));
			await expect(
				peerService.searchWithPlugin("core-wallet-api", {
					additional: ["fake"],
				}),
			).resolves.toEqual(validPeers);
		});
	});

	describe("searchWithoutEstimates", () => {
		let peerService: PeerService;
		beforeEach(async () => {
			nock("http://127.0.0.1").get("/api/v2/peers").reply(200, {
				data: dummyPeersWalletApi,
			});

			peerService = await PeerService.construct({ networkOrHost: "http://127.0.0.1/api/v2/peers" });
		});

		it("should find peers without estimates", async () => {
			nock(/.+/)
				.get("/api/v2/peers")
				.reply(200, {
					data: dummyPeersPublicApi,
				})
				.persist()
				.get("/api/v2/blocks?limit=1")
				.reply(200, {
					meta: {
						totalCountIsEstimate: false,
					},
				});

			const validPeers = dummyPeersPublicApi.map((peer) => ({ ip: peer.ip, port: 4103 }));
			await expect(peerService.searchWithoutEstimates()).resolves.toEqual(validPeers);
		});
	});
});
