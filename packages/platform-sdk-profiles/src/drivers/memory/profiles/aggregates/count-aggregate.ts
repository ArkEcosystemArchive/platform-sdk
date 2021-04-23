import { State } from "../../../../environment/state";

export class CountAggregate implements CountAggregate {
	/** {@inheritDoc IWalletFactory.generate} */
	public contacts(): number {
		return State.profile().contacts().count();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public notifications(): number {
		return State.profile().notifications().count();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public wallets(): number {
		return State.profile().wallets().count();
	}
}
