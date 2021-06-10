import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { IExchangeRateService, IProfile } from "../../../contracts";
export declare class ExchangeRateService implements IExchangeRateService {
	#private;
	/** {@inheritDoc IExchangeRateService.syncAll} */
	syncAll(profile: IProfile, currency: string): Promise<void>;
	/** {@inheritDoc IExchangeRateService.exchange} */
	exchange(currency: string, exchangeCurrency: string, date: DateTime, value: BigNumber): BigNumber;
	/** {@inheritDoc IExchangeRateService.generate} */
	snapshot(): Promise<void>;
	/** {@inheritDoc IExchangeRateService.generate} */
	restore(): Promise<void>;
}
