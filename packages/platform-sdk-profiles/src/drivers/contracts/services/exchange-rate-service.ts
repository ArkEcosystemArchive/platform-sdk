import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { MarketService } from "@arkecosystem/platform-sdk-markets";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { Profile } from "../profiles/profile";
import { ProfileSetting } from "../profiles/profile.models";
import { DataRepository } from "../repositories/data-repository";
import { ReadWriteWallet } from "../wallets/wallet.models";
import { container } from "../../../environment/container";
import { Identifiers } from "../../../environment/container.models";
import { Storage } from "../../../environment/env.models";

export interface IExchangeRateService {
    syncAll(profile: Profile, currency: string): Promise<void>;
    exchange(currency: string, exchangeCurrency: string, date: DateTime, value: BigNumber): BigNumber;
    snapshot(): Promise<void>;
    restore(): Promise<void>;
}
