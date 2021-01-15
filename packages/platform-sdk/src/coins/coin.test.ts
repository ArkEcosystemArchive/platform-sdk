import "jest-extended";

import { ARK } from "@arkecosystem/platform-sdk-ark";
import { ValidatorSchema } from "@arkecosystem/platform-sdk-support";

import { Coin } from "./coin";
import { Config } from "./config";
import { Manifest } from "./manifest";
import { Network } from "./network";
import { NetworkRepository } from "./network-repository";

let subject: Coin;

const services = {
	// @ts-ignore
	client: { destruct: jest.fn() },
	// @ts-ignore
	dataTransferObject: { destruct: jest.fn() },
	// @ts-ignore
	fee: { destruct: jest.fn() },
	// @ts-ignore
	identity: { destruct: jest.fn() },
	// @ts-ignore
	knownWallets: { destruct: jest.fn() },
	// @ts-ignore
	ledger: { destruct: jest.fn() },
	// @ts-ignore
	link: { destruct: jest.fn() },
	// @ts-ignore
	message: { destruct: jest.fn() },
	// @ts-ignore
	multiSignature: { destruct: jest.fn() },
	// @ts-ignore
	peer: { destruct: jest.fn() },
	// @ts-ignore
	transaction: { destruct: jest.fn() },
};

beforeEach(
	() =>
		(subject = new Coin({
			networks: new NetworkRepository(ARK.manifest.networks),
			manifest: new Manifest(ARK.manifest),
			// @ts-ignore
			config: new Config(
				{ network: "ark.mainnet" },
				ValidatorSchema.object({
					network: ValidatorSchema.string().valid("ark.mainnet", "ark.devnet"),
				}),
			),
			// @ts-ignore
			services,
		})),
);

test("#destruct", async () => {
	await subject.destruct();

	expect(services.client.destruct).toHaveBeenCalledTimes(1);
	expect(services.fee.destruct).toHaveBeenCalledTimes(1);
	expect(services.identity.destruct).toHaveBeenCalledTimes(1);
	expect(services.knownWallets.destruct).toHaveBeenCalledTimes(1);
	expect(services.ledger.destruct).toHaveBeenCalledTimes(1);
	expect(services.link.destruct).toHaveBeenCalledTimes(1);
	expect(services.message.destruct).toHaveBeenCalledTimes(1);
	expect(services.multiSignature.destruct).toHaveBeenCalledTimes(1);
	expect(services.peer.destruct).toHaveBeenCalledTimes(1);
	expect(services.transaction.destruct).toHaveBeenCalledTimes(1);
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

test("#client", () => {
	expect(subject.client()).toBeObject();
});

test("#fee", () => {
	expect(subject.fee()).toBeObject();
});

test("#identity", () => {
	expect(subject.identity()).toBeObject();
});

test("#knownWallets", () => {
	expect(subject.knownWallets()).toBeObject();
});

test("#ledger", () => {
	expect(subject.ledger()).toBeObject();
});

test("#link", () => {
	expect(subject.link()).toBeObject();
});

test("#message", () => {
	expect(subject.message()).toBeObject();
});

test("#multiSignature", () => {
	expect(subject.multiSignature()).toBeObject();
});

test("#peer", () => {
	expect(subject.peer()).toBeObject();
});

test("#transaction", () => {
	expect(subject.transaction()).toBeObject();
});
