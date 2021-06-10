import { Contracts, Environment } from "@arkecosystem/platform-sdk-profiles";

export const useLogger = (): Console => console;

export async function createProfile(env: Environment, name: string, password: string) {
	const findByName = env.profiles().findByName(name);

	if (findByName) {
		env.profiles().forget(findByName.id());
	}

	const profile: Contracts.IProfile = env.profiles().create(name);

	profile.auth().setPassword(password);

	env.profiles().persist(profile);

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
