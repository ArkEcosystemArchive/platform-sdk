import nock from "nock";
import { PeerDiscovery } from "../src/peer";
import { dummyPeersPublicApi, dummyPeersWalletApi, dummySeeds } from "./mocks/peers";

beforeEach(() => nock.cleanAll());

describe("PeerDiscovery", () => {
	describe("new instance", () => {
		it("should fail if no network or host is provided", async () => {
			await expect(
				PeerDiscovery.new({
					// @ts-ignore
					networkOrHost: undefined,
				}),
			).rejects.toThrowError(new Error("No network or host provided"));
		});

		describe("host", () => {
			it("should fetch peers", async () => {
				nock("http://127.0.0.1")
					.get("/api/v2/peers")
					.reply(200, {
						data: dummyPeersWalletApi,
					});

				const peerDiscovery: PeerDiscovery = await PeerDiscovery.new({
					networkOrHost: "http://127.0.0.1/api/v2/peers",
				});

				expect(peerDiscovery.getSeeds()).toEqual(
					dummyPeersWalletApi.map(peer => ({
						ip: peer.ip,
						port: 4140,
					})),
				);
			});

			it("should fetch peers and fallback to public api port", async () => {
				nock("http://127.0.0.1")
					.get("/api/v2/peers")
					.reply(200, {
						data: dummyPeersPublicApi,
					});

				const peerDiscovery: PeerDiscovery = await PeerDiscovery.new({
					networkOrHost: "http://127.0.0.1/api/v2/peers",
				});

				expect(peerDiscovery.getSeeds()).toEqual(
					dummyPeersPublicApi.map(peer => ({
						ip: peer.ip,
						port: 4103,
					})),
				);
			});

			it("should fail if the seed list is empty", async () => {
				nock("http://127.0.0.1")
					.get("/api/v2/peers")
					.reply(200, {
						data: [],
					});

				await expect(
					PeerDiscovery.new({
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

				const peerDiscovery: PeerDiscovery = await PeerDiscovery.new({ networkOrHost: "mainnet" });

				expect(peerDiscovery.getSeeds()).toEqual(dummySeeds.map(peer => ({ ip: peer.ip, port: 4003 })));
			});

			it("should fail if a 404 response is received", async () => {
				nock("https://raw.githubusercontent.com/ArkEcosystem/peers/master")
					.get("/failnet.json")
					.reply(404);

				await expect(
					PeerDiscovery.new({
						networkOrHost: "failnet",
					}),
				).rejects.toThrowError(new Error("Failed to discovery any peers."));
			});

			it("should fail if the seed list is empty", async () => {
				nock("https://raw.githubusercontent.com/ArkEcosystem/peers/master")
					.get("/mainnet.json")
					.reply(200, []);

				await expect(
					PeerDiscovery.new({
						networkOrHost: "mainnet",
					}),
				).rejects.toThrowError(new Error("No seeds found"));
			});
		});
	});

	describe("findPeers", () => {
		let peerDiscovery: PeerDiscovery;
		beforeEach(async () => {
			nock("http://127.0.0.1")
				.get("/api/v2/peers")
				.reply(200, {
					data: dummyPeersWalletApi,
				});

			peerDiscovery = await PeerDiscovery.new({ networkOrHost: "http://127.0.0.1/api/v2/peers" });
		});

		it("should find peers", async () => {
			nock(/.+/)
				.get("/api/v2/peers")
				.reply(200, {
					data: dummyPeersWalletApi,
				});

			await expect(peerDiscovery.findPeers()).resolves.toEqual(dummyPeersWalletApi);
		});

		it("should retry", async () => {
			nock(/.+/)
				.get("/api/v2/peers")
				.twice()
				.reply(500)
				.get("/api/v2/peers")
				.reply(200, {
					data: dummyPeersWalletApi,
				});

			const peers = await peerDiscovery.findPeers({
				retry: { limit: 3 },
			});

			expect(peers).toEqual(dummyPeersWalletApi);
		});

		it("should timeout", async () => {
			nock(/.+/)
				.get("/api/v2/peers")
				.delay(2000)
				.reply(200, {
					data: dummyPeersWalletApi,
				});

			await expect(
				peerDiscovery.findPeers({
					timeout: 1000,
				}),
			).rejects.toThrowError(new Error("Request timed out"));
		});

		it("should filter by version", async () => {
			nock(/.+/)
				.get("/api/v2/peers")
				.twice()
				.reply(200, {
					data: dummyPeersWalletApi,
				});

			await expect(peerDiscovery.withVersion("2.6.0").findPeers()).resolves.toEqual([dummyPeersWalletApi[1]]);

			await expect(peerDiscovery.withVersion(">=2.5.0").findPeers()).resolves.toEqual(dummyPeersWalletApi);
		});

		it("should filter by latency", async () => {
			nock(/.+/)
				.get("/api/v2/peers")
				.twice()
				.reply(200, {
					data: dummyPeersWalletApi,
				});

			await expect(peerDiscovery.withLatency(150).findPeers()).resolves.toEqual([dummyPeersWalletApi[1]]);

			await expect(peerDiscovery.withLatency(250).findPeers()).resolves.toEqual(dummyPeersWalletApi);
		});

		it("should sort by latency asc", async () => {
			nock(/.+/)
				.get("/api/v2/peers")
				.reply(200, {
					data: dummyPeersWalletApi,
				});

			await expect(peerDiscovery.sortBy("latency", "asc").findPeers()).resolves.toEqual([
				dummyPeersWalletApi[1],
				dummyPeersWalletApi[0],
			]);
		});

		it("should sort by version desc", async () => {
			nock(/.+/)
				.get("/api/v2/peers")
				.reply(200, {
					data: dummyPeersWalletApi,
				});

			await expect(peerDiscovery.sortBy("version", "desc").findPeers()).resolves.toEqual([
				dummyPeersWalletApi[1],
				dummyPeersWalletApi[0],
			]);
		});
	});

	describe("findPeersWithPlugin", () => {
		let peerDiscovery: PeerDiscovery;
		beforeEach(async () => {
			nock("http://127.0.0.1")
				.get("/api/v2/peers")
				.reply(200, {
					data: dummyPeersWalletApi,
				});

			peerDiscovery = await PeerDiscovery.new({ networkOrHost: "http://127.0.0.1/api/v2/peers" });
		});

		it("should find peers without the wallet api plugin", async () => {
			nock(/.+/)
				.get("/api/v2/peers")
				.reply(200, {
					data: dummyPeersPublicApi,
				});

			await expect(peerDiscovery.findPeersWithPlugin("core-wallet-api")).resolves.toEqual([]);
		});

		it("should find peers with the wallet api plugin", async () => {
			nock(/.+/)
				.get("/api/v2/peers")
				.reply(200, {
					data: dummyPeersWalletApi,
				});

			const validPeers = dummyPeersWalletApi.map(peer => ({ ip: peer.ip, port: 4140 }));
			await expect(peerDiscovery.findPeersWithPlugin("core-wallet-api")).resolves.toEqual(validPeers);
		});

		it("should get additional peer data", async () => {
			nock(/.+/)
				.get("/api/v2/peers")
				.reply(200, {
					data: dummyPeersWalletApi,
				});

			const validPeers = dummyPeersWalletApi.map(peer => ({ ip: peer.ip, port: 4140, version: peer.version }));
			await expect(peerDiscovery.findPeersWithPlugin("core-wallet-api", {
				additional: [
					"version",
				],
			})).resolves.toEqual(validPeers);
		});

		it("should ignore additional peer data that does not exist", async () => {
			nock(/.+/)
				.get("/api/v2/peers")
				.reply(200, {
					data: dummyPeersWalletApi,
				});

			const validPeers = dummyPeersWalletApi.map(peer => ({ ip: peer.ip, port: 4140 }));
			await expect(peerDiscovery.findPeersWithPlugin("core-wallet-api", {
				additional: [
					"fake",
				],
			})).resolves.toEqual(validPeers);
		});
	});

	describe("findPeersWithoutEstimates", () => {
		let peerDiscovery: PeerDiscovery;
		beforeEach(async () => {
			nock("http://127.0.0.1")
				.get("/api/v2/peers")
				.reply(200, {
					data: dummyPeersWalletApi,
				});

			peerDiscovery = await PeerDiscovery.new({ networkOrHost: "http://127.0.0.1/api/v2/peers" });
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

			const validPeers = dummyPeersPublicApi.map(peer => ({ ip: peer.ip, port: 4103 }));
			await expect(peerDiscovery.findPeersWithoutEstimates()).resolves.toEqual(validPeers);
		});
	});
});
