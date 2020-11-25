import "jest-extended";

import { Profile } from "../profiles/profile";
import { PeerRepository } from "./peer-repository";

let subject: PeerRepository;

beforeEach(() => (subject = new PeerRepository()));

describe("PeerRepository", () => {
	it("should push, get, list and forget any given peers", async () => {
		subject.create("ARK", "mainnet", {
			name: "Private",
			host: "https://ip:port/api",
			isMultiSignature: false,
		});

		expect(subject.has("ARK", "mainnet")).toBeTrue();

		subject.create("ARK", "devnet", {
			name: "Private",
			host: "https://devip:devport/api",
			isMultiSignature: false,
		});

		expect(subject.has("ARK", "devnet")).toBeTrue();

		subject.forget("ARK", "devnet", {
			name: "Private",
			host: "https://devip:devport/api",
			isMultiSignature: false,
		});

		expect(() => subject.get("ARK", "devnet")).toThrow("No peer found for");
	});

	it("should update a peer", async () => {
		subject.create("ARK", "mainnet", {
			name: "Private",
			host: "https://ip:port/api",
			isMultiSignature: false,
		});

		subject.create("ARK", "mainnet", {
			name: "MuSig",
			host: "https://muip:muport/api",
			isMultiSignature: true,
		});

		expect(subject.has("ARK", "mainnet")).toBeTrue();

		subject.update("ARK", "mainnet", "https://muip:muport/api", {
			name: "MuSig Updated",
			host: "https://muip:muport/api",
			isMultiSignature: true,
		});

		expect(subject.toObject()).toEqual({
			ARK: {
				mainnet: [
					{
						host: "https://ip:port/api",
						isMultiSignature: false,
						name: "Private",
					},
					{
						host: "https://muip:muport/api",
						isMultiSignature: true,
						name: "MuSig Updated",
					},
				],
			},
		});
	});

	it("should store multiple peers with different types for the same network", async () => {
		subject.create("ARK", "mainnet", {
			name: "Private",
			host: "https://ip:port/api",
			isMultiSignature: false,
		});

		subject.create("ARK", "mainnet", {
			name: "MuSig",
			host: "https://muip:muport/api",
			isMultiSignature: true,
		});

		expect(subject.toObject()).toEqual({
			ARK: {
				mainnet: [
					{
						host: "https://ip:port/api",
						isMultiSignature: false,
						name: "Private",
					},
					{
						host: "https://muip:muport/api",
						isMultiSignature: true,
						name: "MuSig",
					},
				],
			},
		});
	});

	it("should turn all peers into an object", async () => {
		subject.create("ARK", "mainnet", {
			name: "Private",
			host: "https://ip:port/api",
			isMultiSignature: false,
		});

		expect(subject.toObject()).toEqual({
			ARK: {
				mainnet: [
					{
						host: "https://ip:port/api",
						isMultiSignature: false,
						name: "Private",
					},
				],
			},
		});
	});
});
