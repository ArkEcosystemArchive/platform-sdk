import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { IProfile } from "../profiles/profile";

/**
 * Defines the implementation contract for the exchange rate service.
 *
 * @export
 * @interface IExchangeRateService
 */
export interface IExchangeRateService {
	/**
	 * Synchronise the exchange rates for all wallets.
	 *
	 * @param {IProfile} profile
	 * @param {string} currency
	 * @return {Promise<void>}
	 * @memberof IExchangeRateService
	 */
	syncAll(profile: IProfile, currency: string): Promise<void>;

	/**
	 * Exchange the source currency to the target currency for the given date.
	 *
	 * @param {string} currency
	 * @param {string} exchangeCurrency
	 * @param {DateTime} date
	 * @param {BigNumber} value
	 * @return {BigNumber}
	 * @memberof IExchangeRateService
	 */
	exchange(currency: string, exchangeCurrency: string, date: DateTime, value: BigNumber): BigNumber;

	/**
	 * Take a snapshot of the current data.
	 *
	 * @return {Promise<void>}
	 * @memberof IExchangeRateService
	 */
	snapshot(): Promise<void>;

	/**
	 * Restore data from a snapshot.
	 *
	 * @return {Promise<void>}
	 * @memberof IExchangeRateService
	 */
	restore(): Promise<void>;
}
