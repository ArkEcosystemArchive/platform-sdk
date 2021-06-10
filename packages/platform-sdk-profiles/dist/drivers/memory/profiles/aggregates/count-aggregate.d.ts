import { IProfile } from "../../../../contracts";
export declare class CountAggregate implements CountAggregate {
	#private;
	constructor(profile: IProfile);
	/** {@inheritDoc CountAggregate.contacts} */
	contacts(): number;
	/** {@inheritDoc CountAggregate.notifications} */
	notifications(): number;
	/** {@inheritDoc CountAggregate.wallets} */
	wallets(): number;
}
