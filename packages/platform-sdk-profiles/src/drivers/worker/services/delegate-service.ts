import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { pqueueSettled } from "../../../helpers/queue";
import { DataRepository } from "../../../repositories/data-repository";
import { ReadOnlyWallet } from "../wallets/read-only-wallet";
import { container } from "../../../environment/container";
import { makeCoin } from "../../../environment/container.helpers";
import { Identifiers } from "../../../environment/container.models";
import { CoinService } from "./coin-service";
import { IDelegateService, IReadOnlyWallet, IReadWriteWallet } from "../../../contracts";

export class DelegateService implements IDelegateService {
	//
}
