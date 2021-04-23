import { IReadWriteWallet } from "../../../../contracts";
import { State } from "../../../../environment/state";

export class RegistrationAggregate implements RegistrationAggregate {
	/** {@inheritDoc RegistrationAggregate.delegates} */
	public delegates(): IReadWriteWallet[] {
		return State.profile()
			.wallets()
			.values()
			.filter((wallet: IReadWriteWallet) => wallet.hasSyncedWithNetwork() && wallet.isDelegate());
	}
}
