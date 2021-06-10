import { IProfile } from "../profiles/profile";
/**
 * Defines the implementation contract for the wallet service.
 *
 * @export
 * @interface IWalletService
 */
export interface IWalletService {
	/**
	 * Synchronise all wallets for the given profile.
	 *
	 * @param {IProfile} profile
	 * @return {Promise<void>}
	 * @memberof IWalletService
	 */
	syncByProfile(profile: IProfile): Promise<void>;
}
