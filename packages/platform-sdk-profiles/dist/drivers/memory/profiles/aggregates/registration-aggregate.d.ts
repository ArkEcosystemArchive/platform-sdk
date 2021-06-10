import { IProfile, IReadWriteWallet } from "../../../../contracts";
export declare class RegistrationAggregate implements RegistrationAggregate {
	#private;
	constructor(profile: IProfile);
	/** {@inheritDoc RegistrationAggregate.delegates} */
	delegates(): IReadWriteWallet[];
}
