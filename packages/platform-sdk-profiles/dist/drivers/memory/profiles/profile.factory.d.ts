import { IProfile, IProfileFactory } from "../../../contracts";
export declare class ProfileFactory implements IProfileFactory {
	/** {@inheritDoc IProfileFactory.fromName} */
	static fromName(name: string): IProfile;
}
