import { Contracts, Environment } from "@arkecosystem/platform-sdk-profiles";

export const createProfile = async (env: Environment, name: string, password?: string): Promise<Contracts.IProfile> => {

	const profile = env.profiles().create(name);

	if (password) {
		profile.auth().setPassword(password);
	}

	await env.persist();
	return profile;
};
