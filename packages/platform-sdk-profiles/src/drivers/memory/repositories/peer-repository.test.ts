import "jest-extended";
import "reflect-metadata";
import { bootContainer } from "../../../../test/helpers";
import { State } from "../../../environment/state";
import { Profile } from "../profiles/profile";

import { PeerRepository } from "./peer-repository";

let subject: PeerRepository;

beforeAll(() => {
	bootContainer()

	const profile = new Profile({ id: "uuid", name: "name", avatar: "avatar", data: "" });

	State.profile(profile);
});

beforeEach(() => (subject = new PeerRepository()));

describe("PeerRepository", () => {
	it("should restore a list of peers", async () => {
		subject.fill({
			1: {
				name: "Private 1",
				host: "https://devip:devport/api/1",
				isMultiSignature: false,
			},
			2: {
				name: "Private 2",
				host: "https://devip:devport/api/1",
				isMultiSignature: false,
			},
		});

		expect(subject.all()).toMatchInlineSnapshot(`
		Object {
		  "1": Object {
		    "host": "https://devip:devport/api/1",
		    "isMultiSignature": false,
		    "name": "Private 1",
		  },
		  "2": Object {
		    "host": "https://devip:devport/api/1",
		    "isMultiSignature": false,
		    "name": "Private 2",
		  },
		}
	`);
	});

	test("#all", async () => {
		subject.fill({
			1: {
				name: "Private 1",
				host: "https://devip:devport/api/1",
				isMultiSignature: false,
			},
			2: {
				name: "Private 2",
				host: "https://devip:devport/api/1",
				isMultiSignature: false,
			},
		});

		expect(subject.all()).toMatchInlineSnapshot(`
		Object {
		  "1": Object {
		    "host": "https://devip:devport/api/1",
		    "isMultiSignature": false,
		    "name": "Private 1",
		  },
		  "2": Object {
		    "host": "https://devip:devport/api/1",
		    "isMultiSignature": false,
		    "name": "Private 2",
		  },
		}
	`);
	});

	test("#keys", async () => {
		subject.fill({
			1: {
				name: "Private 1",
				host: "https://devip:devport/api/1",
				isMultiSignature: false,
			},
			2: {
				name: "Private 2",
				host: "https://devip:devport/api/1",
				isMultiSignature: false,
			},
		});

		expect(subject.keys()).toMatchInlineSnapshot(`
		Array [
		  "1",
		  "2",
		]
	`);
	});

	test("#values", async () => {
		subject.fill({
			1: {
				name: "Private 1",
				host: "https://devip:devport/api/1",
				isMultiSignature: false,
			},
			2: {
				name: "Private 2",
				host: "https://devip:devport/api/1",
				isMultiSignature: false,
			},
		});

		expect(subject.values()).toMatchInlineSnapshot(`
		Array [
		  Object {
		    "host": "https://devip:devport/api/1",
		    "isMultiSignature": false,
		    "name": "Private 1",
		  },
		  Object {
		    "host": "https://devip:devport/api/1",
		    "isMultiSignature": false,
		    "name": "Private 2",
		  },
		]
	`);
	});

	it("should push, get, list and forget any given peers", async () => {
		subject.create("ARK", "mainnet", {
			name: "Private",
			host: "https://ip:port/api",
			isMultiSignature: false,
		});

		expect(subject.has("ARK", "mainnet")).toBeTrue();

		subject.create("ARK", "devnet", {
			name: "Private 1",
			host: "https://devip:devport/api/1",
			isMultiSignature: false,
		});

		expect(subject.has("ARK", "devnet")).toBeTrue();

		subject.create("ARK", "devnet", {
			name: "Private 2",
			host: "https://devip:devport/api/2",
			isMultiSignature: false,
		});

		expect(subject.has("ARK", "devnet")).toBeTrue();

		subject.forget("ARK", "devnet", {
			name: "Private 1",
			host: "https://devip:devport/api/1",
			isMultiSignature: false,
		});

		subject.forget("ARK", "devnet", {
			name: "Private 2",
			host: "https://devip:devport/api/2",
			isMultiSignature: false,
		});

		expect(() => subject.get("ARK", "devnet")).toThrow("No peers found for");
	});

	it("should fail to forget a peer", async () => {
		subject.create("ARK", "devnet", {
			name: "Private",
			host: "https://ip:port/api",
			isMultiSignature: false,
		});

		expect(() =>
			subject.forget("ARK", "devnet", {
				name: "MuSig Updated",
				host: "https://muip:muport/api",
				isMultiSignature: true,
			}),
		).toThrow("Failed to find a peer with [https://muip:muport/api] as host.");
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

		expect(subject.toObject()).toMatchInlineSnapshot(`
		Object {
		  "ARK": Object {
		    "mainnet": Array [
		      Object {
		        "host": "https://ip:port/api",
		        "isMultiSignature": false,
		        "name": "Private",
		      },
		      Object {
		        "host": "https://muip:muport/api",
		        "isMultiSignature": true,
		        "name": "MuSig Updated",
		      },
		    ],
		  },
		}
	`);
	});

	it("should fail to update if the host does not exist at all", async () => {
		subject.create("ARK", "devnet", {
			name: "Private",
			host: "https://ip:port/api",
			isMultiSignature: false,
		});

		expect(() =>
			subject.update("ARK", "devnet", "https://muip:muport/api", {
				name: "MuSig Updated",
				host: "https://muip:muport/api",
				isMultiSignature: true,
			}),
		).toThrow("Failed to find a peer with [https://muip:muport/api] as host.");
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

	test("#getRelay", async () => {
		subject.create("ARK", "mainnet", {
			name: "Private",
			host: "https://ip:port/api",
			isMultiSignature: true,
		});

		expect(subject.getRelay("ARK", "mainnet")).toMatchInlineSnapshot(`undefined`);
	});

	test("#getRelays", async () => {
		subject.create("ARK", "mainnet", {
			name: "Private",
			host: "https://ip:port/api",
			isMultiSignature: false,
		});

		subject.create("ARK", "mainnet", {
			name: "Public",
			host: "https://ip:port/api",
			isMultiSignature: false,
		});

		expect(subject.getRelays("ARK", "mainnet")).toMatchInlineSnapshot(`
		Array [
		  Object {
		    "host": "https://ip:port/api",
		    "isMultiSignature": false,
		    "name": "Private",
		  },
		  Object {
		    "host": "https://ip:port/api",
		    "isMultiSignature": false,
		    "name": "Public",
		  },
		]
	`);
	});

	test("#getMultiSignature", async () => {
		subject.create("ARK", "mainnet", {
			name: "Private",
			host: "https://ip:port/api",
			isMultiSignature: true,
		});

		expect(subject.getMultiSignature("ARK", "mainnet")).toMatchInlineSnapshot(`
		Object {
		  "host": "https://ip:port/api",
		  "isMultiSignature": true,
		  "name": "Private",
		}
	`);
	});
});
