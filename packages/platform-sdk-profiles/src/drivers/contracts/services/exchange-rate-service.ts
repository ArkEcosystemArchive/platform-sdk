import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { Profile } from "../profiles/profile";

export interface IExchangeRateService {
    syncAll(profile: Profile, currency: string): Promise<void>;
    exchange(currency: string, exchangeCurrency: string, date: DateTime, value: BigNumber): BigNumber;
    snapshot(): Promise<void>;
    restore(): Promise<void>;
}
