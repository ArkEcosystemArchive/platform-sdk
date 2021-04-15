import { State } from "../../../../environment/state";

export class CountAggregate implements CountAggregate {
	public contacts(): number {
		return State.profile().contacts().count();
	}

	public notifications(): number {
		return State.profile().notifications().count();
	}

	public wallets(): number {
		return State.profile().wallets().count();
	}
}
