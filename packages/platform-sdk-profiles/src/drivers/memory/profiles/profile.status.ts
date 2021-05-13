import { IProfileStatus } from "../../../contracts";

export class ProfileStatus implements IProfileStatus {
	#isRestored: boolean;

	public constructor() {
		this.#isRestored = false;
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
	}
}
