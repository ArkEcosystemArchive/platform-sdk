import { State } from "../../../../environment/state";

export class CountAggregate implements CountAggregate {
	/** {@inheritDoc CountAggregate.contacts} */
	public contacts(): number {
		return State.profile().contacts().count();
	}

	/** {@inheritDoc CountAggregate.notifications} */
	public notifications(): number {
		return State.profile().notifications().count();
	}

	/** {@inheritDoc CountAggregate.wallets} */
	public wallets(): number {
		return State.profile().wallets().count();
	}
}
