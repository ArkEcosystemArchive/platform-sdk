import { Contracts } from "@arkecosystem/platform-sdk";

import { pqueue } from "../../../helpers/queue";
import { container } from "../../../environment/container";
import { Identifiers } from "../../../environment/container.models";
import { CoinService } from "./coin-service";
import { IKnownWalletService } from "../../../contracts";

type KnownWalletRegistry = Record<string, Contracts.KnownWallet[]>;

export class KnownWalletService implements IKnownWalletService {
	//
}
