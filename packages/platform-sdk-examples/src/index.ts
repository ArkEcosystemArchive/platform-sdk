import { Contracts } from "@arkecosystem/platform-sdk-profiles";
import { createProfile } from "./commands";
import { useEnvironment, useLogger } from "./helpers";

export const main = async (): Promise<void> => {
	const logger = useLogger();
	const env = await useEnvironment();

	const name: string = 'my-profile-name';
	const password: string = 'password';

	const profile: Contracts.IProfile = await createProfile(env, name, password);
};
