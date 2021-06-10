import { IProfileStatus } from "../../../contracts";
export declare class ProfileStatus implements IProfileStatus {
	#private;
	constructor();
	/** {@inheritDoc IAuthenticator.markAsDirty} */
	markAsDirty(): void;
	/** {@inheritDoc IAuthenticator.isDirty} */
	isDirty(): boolean;
	/** {@inheritDoc IAuthenticator.markAsRestored} */
	markAsRestored(): void;
	/** {@inheritDoc IAuthenticator.isRestored} */
	isRestored(): boolean;
	/** {@inheritDoc IAuthenticator.reset} */
	reset(): void;
	/** {@inheritDoc IAuthenticator.markAsClean} */
	markAsClean(): void;
}
