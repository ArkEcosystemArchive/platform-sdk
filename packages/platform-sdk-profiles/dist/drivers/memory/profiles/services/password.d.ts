import { IPasswordManager } from "../../../../contracts/profiles/services/password";
export declare class PasswordManager implements IPasswordManager {
	#private;
	/** {@inheritDoc IPasswordManager.get} */
	get(): string;
	/** {@inheritDoc IPasswordManager.set} */
	set(password: string): void;
	/** {@inheritDoc IPasswordManager.exists} */
	exists(): boolean;
	/** {@inheritDoc IPasswordManager.forget} */
	forget(): void;
}
