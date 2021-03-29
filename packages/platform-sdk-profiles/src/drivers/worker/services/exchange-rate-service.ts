import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { MarketService } from "@arkecosystem/platform-sdk-markets";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { DataRepository } from "../../../repositories/data-repository";
import { container } from "../../../environment/container";
import { Identifiers } from "../../../environment/container.models";
import { Storage } from "../../../environment/env.models";
import { IExchangeRateService, IProfile, IReadWriteWallet, ProfileSetting } from "../../../contracts";

export class ExchangeRateService implements IExchangeRateService {
	//
}
