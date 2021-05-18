import { Contracts, Environment } from "@arkecosystem/platform-sdk-profiles";

import { ADA } from "@arkecosystem/platform-sdk-ada";
import { ARK } from "@arkecosystem/platform-sdk-ark";
// import { ATOM } from "@arkecosystem/platform-sdk-atom";
import { AVAX } from "@arkecosystem/platform-sdk-avax";
// import { BTC } from "@arkecosystem/platform-sdk-btc";
import { DOT } from "@arkecosystem/platform-sdk-dot";
import { EGLD } from "@arkecosystem/platform-sdk-egld";
import { TRX } from "@arkecosystem/platform-sdk-trx";
import { XLM } from "@arkecosystem/platform-sdk-xlm";
// import { XRP } from "@arkecosystem/platform-sdk-xrp";
import { Request } from "@arkecosystem/platform-sdk-http-got";
// import { EOS } from "@arkecosystem/platform-sdk-eos";
// import { ETH } from "@arkecosystem/platform-sdk-eth";
import { LSK } from "@arkecosystem/platform-sdk-lsk";
// import { NEO } from "@arkecosystem/platform-sdk-neo";
import { SOL } from "@arkecosystem/platform-sdk-sol";

import { ConfStorage } from "./storage";

export const useLogger = (): Console => console;

export const useEnvironment = async (): Promise<Environment> => {
	const env = new Environment({
		coins: {
			ADA,
			ARK,
			// ATOM,
			AVAX,
			// BTC,
			DOT,
			EGLD,
			// EOS,
			// ETH,
			LSK,
			// NEO,
			SOL,
			TRX,
			XLM,
			// XRP,
		},
		storage: new ConfStorage(),
		httpClient: new Request(),
	});

	await env.verify();
	await env.boot();

	return env;
};

export async function createProfile(env: Environment, name: string, password: string) {
	const findByName = env.profiles().findByName(name);
	if (findByName) {
		await env.profiles().forget(findByName.id());
	}
	const profile: Contracts.IProfile = env.profiles().create(name);
	profile.auth().setPassword(password);
	await env.persist();
	return profile;
}

export async function pollTransactionStatus(transactionId: string, wallet1: Contracts.IReadWriteWallet) {
	useLogger().info(`Transaction [${transactionId}] is awaiting confirmation.`);
	let awaitingConfirmation = true;
	while (awaitingConfirmation) {
		try {
			awaitingConfirmation = await wallet1.transaction().confirm(transactionId);
		} catch {
			awaitingConfirmation = false;
		}
	}
	useLogger().info(`Transaction [${transactionId}] is confirmed.`);
}
