import { IAuthenticator, IProfile } from "../../../contracts";
export declare class Authenticator implements IAuthenticator {
	#private;
	constructor(profile: IProfile);
	/** {@inheritDoc IAuthenticator.setPassword} */
	setPassword(password: string): void;
	/** {@inheritDoc IAuthenticator.verifyPassword} */
	verifyPassword(password: string): boolean;
	/** {@inheritDoc IAuthenticator.changePassword} */
	changePassword(oldPassword: string, newPassword: string): void;
}
