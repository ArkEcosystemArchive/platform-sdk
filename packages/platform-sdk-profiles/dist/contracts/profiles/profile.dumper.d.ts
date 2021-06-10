import { IProfileInput } from "./profile";
export interface IProfileDumper {
	/**
	 * Dumps the profile into a standardised object.
	 *
	 * @return {IProfileInput}
	 * @memberof ProfileDumper
	 */
	dump(): IProfileInput;
}
