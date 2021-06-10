import { IProfile, IProfileData } from "../../../contracts";
import { IProfileEncrypter } from "../../../contracts/profiles/profile.encrypter";
export declare class ProfileEncrypter implements IProfileEncrypter {
	#private;
	constructor(profile: IProfile);
	/** {@inheritDoc IProfileEncrypter.encrypt} */
	encrypt(unencrypted: string, password?: string): string;
	/** {@inheritDoc IProfileEncrypter.decrypt} */
	decrypt(password: string): IProfileData;
}
