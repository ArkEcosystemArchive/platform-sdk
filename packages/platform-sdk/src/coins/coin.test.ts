import "jest-extended";

import { ValidatorSchema } from "@arkecosystem/platform-sdk-support";
import { injectable } from "inversify";

import { ARK } from "../../../platform-sdk-ark/src";
import { Network, NetworkRepository } from "../networks";
import { BigNumberService } from "../services";
import { Coin } from "./coin";
import { Config } from "./config";
import { Manifest } from "./manifest";
import { CoinFactory } from "./coin-factory";
import { AbstractClientService } from "../services";
import { Request } from "../../../platform-sdk-http-got/src";

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
	signatory: { __construct: jest.fn(), __destruct: jest.fn() },
	// @ts-ignore
	transaction: { __construct: jest.fn(), __destruct: jest.fn() },
	// @ts-ignore
	walletDiscovery: { __construct: jest.fn(), __destruct: jest.fn() },
};

@injectable()
class ServiceProvider {
	public make() {
		services.client.__construct();
		services.dataTransferObject.__construct();
		services.fee.__construct();
		services.identity.__construct();
		services.knownWallets.__construct();
		services.ledger.__construct();
		services.link.__construct();
		services.message.__construct();
		services.multiSignature.__construct();
		services.signatory.__construct();
		services.transaction.__construct();
		services.walletDiscovery.__construct();

		return {
			bigNumber: new BigNumberService(
				// @ts-ignore
				new Config(
					{ network: "ark.mainnet" },
					ValidatorSchema.object({
						network: ValidatorSchema.string().valid("ark.mainnet", "ark.devnet"),
					}),
				),
			),
			client: services.client,
			dataTransferObject: services.dataTransferObject,
			fee: services.fee,
			identity: services.identity,
			knownWallets: services.knownWallets,
			ledger: services.ledger,
			link: services.link,
			message: services.message,
			multiSignature: services.multiSignature,
			signatory: services.signatory,
			transaction: services.transaction,
			walletDiscovery: services.walletDiscovery,
		};
	}
}

beforeEach(async () => {
	// subject = new Coin({
	// 	networks: new NetworkRepository(ARK.manifest.networks),
	// 	manifest: new Manifest(ARK.manifest),
	// 	// @ts-ignore
	// 	config: new Config(
	// 		{ network: "ark.mainnet" },
	// 		ValidatorSchema.object({
	// 			network: ValidatorSchema.string().valid("ark.mainnet", "ark.devnet"),
	// 		}),
	// 	),
	// 	specification: {
	// 		manifest: ARK.manifest,
	// 		schema: ARK.schema,
	// 		ServiceProvider,
	// 	},
	// });

	subject = CoinFactory.make(ARK, {
		network: "ark.devnet",
		// @ts-ignore
		httpClient: new Request(),
	});
});

test("#construct", async () => {
	expect(() => subject.client()).toThrow(/being called first/);
	expect(() => subject.dataTransferObject()).toThrow(/being called first/);
	expect(() => subject.fee()).toThrow(/being called first/);
	expect(() => subject.identity()).toThrow(/being called first/);
	expect(() => subject.knownWallets()).toThrow(/being called first/);
	expect(() => subject.ledger()).toThrow(/being called first/);
	expect(() => subject.link()).toThrow(/being called first/);
	expect(() => subject.message()).toThrow(/being called first/);
	expect(() => subject.multiSignature()).toThrow(/being called first/);
	expect(() => subject.signatory()).toThrow(/being called first/);
	expect(() => subject.transaction()).toThrow(/being called first/);
	expect(() => subject.walletDiscovery()).toThrow(/being called first/);

	await subject.__construct();

	expect(() => subject.client()).not.toThrow(/being called first/);
	expect(() => subject.dataTransferObject()).not.toThrow(/being called first/);
	expect(() => subject.fee()).not.toThrow(/being called first/);
	expect(() => subject.identity()).not.toThrow(/being called first/);
	expect(() => subject.knownWallets()).not.toThrow(/being called first/);
	expect(() => subject.ledger()).not.toThrow(/being called first/);
	expect(() => subject.link()).not.toThrow(/being called first/);
	expect(() => subject.message()).not.toThrow(/being called first/);
	expect(() => subject.multiSignature()).not.toThrow(/being called first/);
	expect(() => subject.signatory()).not.toThrow(/being called first/);
	expect(() => subject.transaction()).not.toThrow(/being called first/);
	expect(() => subject.walletDiscovery()).not.toThrow(/being called first/);
});

test("#destruct", async () => {
	await subject.__construct();

	const clientSpy = jest.spyOn(subject.client(), '__destruct').mockImplementation(async () => {});
	const dataTransferObjectSpy = jest.spyOn(subject.dataTransferObject(), '__destruct').mockImplementation(async () => {});
	const feeSpy = jest.spyOn(subject.fee(), '__destruct').mockImplementation(async () => {});
	const identitySpy = jest.spyOn(subject.identity(), '__destruct').mockImplementation(async () => {});
	const knownWalletsSpy = jest.spyOn(subject.knownWallets(), '__destruct').mockImplementation(async () => {});
	const ledgerSpy = jest.spyOn(subject.ledger(), '__destruct').mockImplementation(async () => {});
	const linkSpy = jest.spyOn(subject.link(), '__destruct').mockImplementation(async () => {});
	const messageSpy = jest.spyOn(subject.message(), '__destruct').mockImplementation(async () => {});
	const multiSignatureSpy = jest.spyOn(subject.multiSignature(), '__destruct').mockImplementation(async () => {});
	const signatorySpy = jest.spyOn(subject.signatory(), '__destruct').mockImplementation(async () => {});
	const transactionSpy = jest.spyOn(subject.transaction(), '__destruct').mockImplementation(async () => {});

	await subject.__destruct();

	expect(clientSpy).toHaveBeenCalledTimes(1);
	expect(dataTransferObjectSpy).toHaveBeenCalledTimes(1);
	expect(feeSpy).toHaveBeenCalledTimes(1);
	expect(identitySpy).toHaveBeenCalledTimes(1);
	expect(knownWalletsSpy).toHaveBeenCalledTimes(1);
	expect(ledgerSpy).toHaveBeenCalledTimes(1);
	expect(linkSpy).toHaveBeenCalledTimes(1);
	expect(messageSpy).toHaveBeenCalledTimes(1);
	expect(multiSignatureSpy).toHaveBeenCalledTimes(1);
	expect(signatorySpy).toHaveBeenCalledTimes(1);
	expect(transactionSpy).toHaveBeenCalledTimes(1);
});

test("#destruct with throw", async () => {
	await expect(subject.__destruct()).rejects.toThrow();
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

test("#bigNumber", async () => {
	await subject.__construct();

	expect(subject.bigNumber()).toBeObject();
});

test("#bigNumber with throw", async () => {
	expect(() => subject.bigNumber()).toThrow();
});

test("#client", async () => {
	await subject.__construct();

	expect(subject.client()).toBeObject();
});

test("#client with throw", async () => {
	expect(() => subject.client()).toThrow();
});

test("#dataTransferObject", async () => {
	await subject.__construct();

	expect(subject.dataTransferObject()).toBeObject();
});

test("#dataTransferObject with throw", async () => {
	expect(() => subject.dataTransferObject()).toThrow();
});

test("#fee", async () => {
	await subject.__construct();

	expect(subject.fee()).toBeObject();
});

test("#fee with throw", async () => {
	expect(() => subject.fee()).toThrow();
});

test("#identity", async () => {
	await subject.__construct();

	expect(subject.identity()).toBeObject();
});

test("#identity with throw", async () => {
	expect(() => subject.identity()).toThrow();
});

test("#knownWallets", async () => {
	await subject.__construct();

	expect(subject.knownWallets()).toBeObject();
});

test("#knownWallets with throw", async () => {
	expect(() => subject.knownWallets()).toThrow();
});

test("#ledger", async () => {
	await subject.__construct();

	expect(subject.ledger()).toBeObject();
});

test("#ledger with throw", async () => {
	expect(() => subject.ledger()).toThrow();
});

test("#link", async () => {
	await subject.__construct();

	expect(subject.link()).toBeObject();
});

test("#link with throw", async () => {
	expect(() => subject.link()).toThrow();
});

test("#message", async () => {
	await subject.__construct();

	expect(subject.message()).toBeObject();
});

test("#message with throw", async () => {
	expect(() => subject.message()).toThrow();
});

test("#multiSignature", async () => {
	await subject.__construct();

	expect(subject.multiSignature()).toBeObject();
});

test("#multiSignature with throw", async () => {
	expect(() => subject.multiSignature()).toThrow();
});

test("#signatory", async () => {
	await subject.__construct();

	expect(subject.signatory()).toBeObject();
});

test("#signatory with throw", async () => {
	expect(() => subject.signatory()).toThrow();
});

test("#transaction", async () => {
	await subject.__construct();

	expect(subject.transaction()).toBeObject();
});

test("#transaction with throw", async () => {
	expect(() => subject.transaction()).toThrow();
});

test("#walletDiscovery", async () => {
	await subject.__construct();

	expect(subject.walletDiscovery()).toBeObject();
});

test("#walletDiscovery with throw", async () => {
	expect(() => subject.walletDiscovery()).toThrow();
});
