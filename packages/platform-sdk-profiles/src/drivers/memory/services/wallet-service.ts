import { pqueueSettled } from "../../../helpers/queue";
import { IProfile, IWalletService } from "../../../contracts";
import { injectable } from "inversify";

@injectable()
export class WalletService implements IWalletService {
	/** {@inheritDoc IWalletFactory.generate} */
	public async syncByProfile(profile: IProfile): Promise<void> {
		const promises: (() => Promise<void>)[] = [];

		for (const wallet of profile.wallets().values()) {
			promises.push(() => wallet?.synchroniser().identity());
			promises.push(() => wallet?.synchroniser().votes());
		}

		await pqueueSettled(promises);
	}
}
