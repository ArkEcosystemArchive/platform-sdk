import "jest-extended";

import { ValidatorSchema } from "@arkecosystem/platform-sdk-support";

import { ARK } from "../../../platform-sdk-ark/src";
import { Coin } from "./coin";
import { Config } from "./config";
import { Manifest } from "./manifest";
import { Network } from "./network";
import { NetworkRepository } from "./network-repository";

let subject: Coin;

const services = {
	// @ts-ignore
	client: { __construct: jest.fn(), __destruct: jest.fn() },
	// @ts-ignore
	dataTransferObject: { __construct: jest.fn(), __destruct: jest.fn() },
	// @ts-ignore
	fee: { __construct: jest.fn(), __destruct: jest.fn() },
	// @ts-ignore
	identity: { __construct: jest.fn(), __destruct: jest.fn() },
	// @ts-ignore
	knownWallets: { __construct: jest.fn(), __destruct: jest.fn() },
	// @ts-ignore
	ledger: { __construct: jest.fn(), __destruct: jest.fn() },
	// @ts-ignore
	link: { __construct: jest.fn(), __destruct: jest.fn() },
	// @ts-ignore
	message: { __construct: jest.fn(), __destruct: jest.fn() },
	// @ts-ignore
	multiSignature: { __construct: jest.fn(), __destruct: jest.fn() },
	// @ts-ignore
	peer: { __construct: jest.fn(), __destruct: jest.fn() },
	// @ts-ignore
	transaction: { __construct: jest.fn(), __destruct: jest.fn() },
};

beforeEach(async () => {
	subject = new Coin({
		networks: new NetworkRepository(ARK.manifest.networks),
		manifest: new Manifest(ARK.manifest),
		// @ts-ignore
		config: new Config(
			{ network: "ark.mainnet" },
			ValidatorSchema.object({
				network: ValidatorSchema.string().valid("ark.mainnet", "ark.devnet"),
			}),
		),
		specification: {
			manifest: undefined,
			schema: undefined,
			ServiceProvider: {
				make: () => {
					services.client.__construct();
					services.dataTransferObject.__construct();
					services.fee.__construct();
					services.identity.__construct();
					services.knownWallets.__construct();
					services.ledger.__construct();
					services.link.__construct();
					services.message.__construct();
					services.multiSignature.__construct();
					services.peer.__construct();
					services.transaction.__construct();

					return {
						client: services.client,
						dataTransferObject: services.dataTransferObject,
						fee: services.fee,
						identity: services.identity,
						knownWallets: services.knownWallets,
						ledger: services.ledger,
						link: services.link,
						message: services.message,
						multiSignature: services.multiSignature,
						peer: services.peer,
						transaction: services.transaction,
					};
				},
			},
		},
	});
});

test("#construct", async () => {
	await subject.__construct();

	expect(services.client.__construct).toHaveBeenCalledTimes(1);
	expect(services.dataTransferObject.__construct).toHaveBeenCalledTimes(1);
	expect(services.fee.__construct).toHaveBeenCalledTimes(1);
	expect(services.identity.__construct).toHaveBeenCalledTimes(1);
	expect(services.knownWallets.__construct).toHaveBeenCalledTimes(1);
	expect(services.ledger.__construct).toHaveBeenCalledTimes(1);
	expect(services.link.__construct).toHaveBeenCalledTimes(1);
	expect(services.message.__construct).toHaveBeenCalledTimes(1);
	expect(services.multiSignature.__construct).toHaveBeenCalledTimes(1);
	expect(services.peer.__construct).toHaveBeenCalledTimes(1);
	expect(services.transaction.__construct).toHaveBeenCalledTimes(1);
});

test("#destruct", async () => {
	await subject.__construct();
	await subject.__destruct();

	expect(services.client.__destruct).toHaveBeenCalledTimes(1);
	expect(services.dataTransferObject.__destruct).toHaveBeenCalledTimes(1);
	expect(services.fee.__destruct).toHaveBeenCalledTimes(1);
	expect(services.identity.__destruct).toHaveBeenCalledTimes(1);
	expect(services.knownWallets.__destruct).toHaveBeenCalledTimes(1);
	expect(services.ledger.__destruct).toHaveBeenCalledTimes(1);
	expect(services.link.__destruct).toHaveBeenCalledTimes(1);
	expect(services.message.__destruct).toHaveBeenCalledTimes(1);
	expect(services.multiSignature.__destruct).toHaveBeenCalledTimes(1);
	expect(services.peer.__destruct).toHaveBeenCalledTimes(1);
	expect(services.transaction.__destruct).toHaveBeenCalledTimes(1);
});

test("#network", () => {
	expect(subject.network()).toBeInstanceOf(Network);
});

test("#networks", () => {
	expect(subject.networks()).toBeInstanceOf(NetworkRepository);
});

test("#manifest", () => {
	expect(subject.manifest()).toBeInstanceOf(Manifest);
});

test("#config", () => {
	expect(subject.config()).toBeInstanceOf(Config);
});

test("#client", async () => {
	await subject.__construct();

	expect(subject.client()).toBeObject();
});

test("#dataTransferObject", async () => {
	await subject.__construct();

	expect(subject.dataTransferObject()).toBeObject();
});

test("#fee", async () => {
	await subject.__construct();

	expect(subject.fee()).toBeObject();
});

test("#identity", async () => {
	await subject.__construct();

	expect(subject.identity()).toBeObject();
});

test("#knownWallets", async () => {
	await subject.__construct();

	expect(subject.knownWallets()).toBeObject();
});

test("#ledger", async () => {
	await subject.__construct();

	expect(subject.ledger()).toBeObject();
});

test("#link", async () => {
	await subject.__construct();

	expect(subject.link()).toBeObject();
});

test("#message", async () => {
	await subject.__construct();

	expect(subject.message()).toBeObject();
});

test("#multiSignature", async () => {
	await subject.__construct();

	expect(subject.multiSignature()).toBeObject();
});

test("#peer", async () => {
	await subject.__construct();

	expect(subject.peer()).toBeObject();
});

test("#transaction", async () => {
	await subject.__construct();

	expect(subject.transaction()).toBeObject();
});
