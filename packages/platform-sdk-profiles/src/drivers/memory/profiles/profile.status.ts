import { IProfileStatus } from "../../../contracts";

export class ProfileStatus implements IProfileStatus {
	#isRestored: boolean;
	#isDirty: boolean;

	public constructor() {
		this.#isRestored = false;
		this.#isDirty = false;
	}

	/** {@inheritDoc IAuthenticator.markAsDirty} */
	public markAsDirty(): void {
		this.#isDirty = true;
	}

	/** {@inheritDoc IAuthenticator.isDirty} */
	public isDirty(): boolean {
		return this.#isDirty;
	}

	/** {@inheritDoc IAuthenticator.markAsRestored} */
	public markAsRestored(): void {
		this.#isRestored = true;
	}

	/** {@inheritDoc IAuthenticator.isRestored} */
	public isRestored(): boolean {
		return this.#isRestored;
	}

	/** {@inheritDoc IAuthenticator.reset} */
	public reset(): void {
		this.#isRestored = false;
		this.#isDirty = false;
	}

	/** {@inheritDoc IAuthenticator.resetDirty} */
	public resetDirty(): void {
		this.#isDirty = false;
	}
}
