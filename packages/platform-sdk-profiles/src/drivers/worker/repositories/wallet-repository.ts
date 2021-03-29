import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { sortBy, sortByDesc } from "@arkecosystem/utils";
import retry from "p-retry";
import { v4 as uuidv4 } from "uuid";

import { container } from "../../../environment/container";
import { Identifiers } from "../../../environment/container.models";
import { CoinService } from "../services/coin-service";
import { Profile } from "../profiles/profile";
import { Wallet } from "../wallets/wallet";
import { WalletFactory } from "../wallets/wallet.factory";
import { DataRepository } from "../../../repositories/data-repository";
import { IDataRepository, IProfile, IReadWriteWallet, IWalletFactory, IWalletRepository, IWalletExportOptions } from "../../../contracts";

export class WalletRepository implements IWalletRepository {
	//
}
