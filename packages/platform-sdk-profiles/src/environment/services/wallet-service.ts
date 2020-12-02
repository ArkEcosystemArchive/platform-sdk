import { pqueue } from "../../helpers/queue";
import { Profile } from "../../profiles/profile";
import { ProfileRepository } from "../../repositories/profile-repository";
import { container } from "../container";
import { Identifiers } from "../container.models";

export class WalletService {
	public async syncAll(): Promise<void> {
		const promises: (() => Promise<void>)[] = [];

		for (const profile of container.get<ProfileRepository>(Identifiers.ProfileRepository).values()) {
			for (const wallet of profile.wallets().values()) {
				promises.push(() => wallet?.syncIdentity());
				promises.push(() => wallet?.syncVotes());
			}
		}

		await pqueue(promises);
	}

	public async syncByProfile(profile: Profile): Promise<void> {
		const promises: (() => Promise<void>)[] = [];

		for (const wallet of profile.wallets().values()) {
			promises.push(() => wallet?.syncIdentity());
			promises.push(() => wallet?.syncVotes());
		}

		await pqueue(promises);
	}
}
