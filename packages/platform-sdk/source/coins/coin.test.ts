import "jest-extended";
import "reflect-metadata";

import { ARK } from "../../../platform-sdk-ark/source";
import { Request } from "../../../platform-sdk-http-got/source";
import { Network, NetworkRepository } from "../networks";
import { Coin } from "./coin";
import { CoinFactory } from "./coin-factory";
import { ConfigRepository } from "./config";
import { Manifest } from "./manifest";

let subject: Coin;

beforeEach(async () => {
	subject = CoinFactory.make(ARK, {
		network: "ark.devnet",
		httpClient: new Request(),
	});
});

test("#construct", async () => {
	expect(() => subject.address()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.bigNumber()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.client()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.dataTransferObject()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.extendedAddress()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.fee()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.keyPair()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.knownWallet()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.ledger()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.link()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.message()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.multiSignature()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.privateKey()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.publicKey()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.signatory()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.transaction()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.walletDiscovery()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.wif()).toThrow(/No matching bindings found for serviceIdentifier/);

	await subject.__construct();

	expect(() => subject.address()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.bigNumber()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.client()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.dataTransferObject()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.extendedAddress()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.fee()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.keyPair()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.knownWallet()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.ledger()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.link()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.message()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.multiSignature()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.privateKey()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.publicKey()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.signatory()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.transaction()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.walletDiscovery()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.wif()).not.toThrow(/No matching bindings found for serviceIdentifier/);
});

test("#__destruct", async () => {
	await subject.__construct();

	expect(() => subject.address()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.bigNumber()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.client()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.dataTransferObject()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.extendedAddress()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.fee()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.keyPair()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.knownWallet()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.ledger()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.link()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.message()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.multiSignature()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.privateKey()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.publicKey()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.signatory()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.transaction()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.walletDiscovery()).not.toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.wif()).not.toThrow(/No matching bindings found for serviceIdentifier/);

	await subject.__destruct();

	expect(() => subject.address()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.bigNumber()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.client()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.dataTransferObject()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.extendedAddress()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.fee()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.keyPair()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.knownWallet()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.ledger()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.link()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.message()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.multiSignature()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.privateKey()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.publicKey()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.signatory()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.transaction()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.walletDiscovery()).toThrow(/No matching bindings found for serviceIdentifier/);
	expect(() => subject.wif()).toThrow(/No matching bindings found for serviceIdentifier/);
});

test("#hasBeenSynchronized", async () => {
	expect(subject.hasBeenSynchronized()).toBeFalse();

	await subject.__construct();

	expect(subject.hasBeenSynchronized()).toBeTrue();

	await subject.__destruct();

	expect(subject.hasBeenSynchronized()).toBeFalse();
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
	expect(subject.config()).toBeInstanceOf(ConfigRepository);
});

describe.each([
	"address",
	"bigNumber",
	"client",
	"dataTransferObject",
	"extendedAddress",
	"fee",
	"keyPair",
	"knownWallet",
	"ledger",
	"link",
	"message",
	"multiSignature",
	"privateKey",
	"publicKey",
	"signatory",
	"transaction",
	"walletDiscovery",
	"wif",
])("#%s", () => {
	test("should throw if coin has not been fully set up", async () => {
		expect(() => subject.fee()).toThrow();
	});

	test("should not throw if coin has not been fully set up", async () => {
		await subject.__construct();

		expect(subject.fee()).toBeObject();
	});
});
