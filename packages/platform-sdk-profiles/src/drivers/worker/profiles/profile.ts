/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Base64, PBKDF2 } from "@arkecosystem/platform-sdk-crypto";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import Joi from "joi";
import { IProfileStruct, IProfileExportOptions, IContactRepository, ICountAggregate, IDataRepository, INotificationRepository, IPeerRepository, IPluginRepository, IProfile, IProfileInput, IRegistrationAggregate, ISettingRepository, ITransactionAggregate, IWalletAggregate, IWalletRepository, ProfileSetting, IReadWriteWallet } from "../../../contracts";

import { MemoryPassword } from "../../../helpers/password";
import { pqueue } from "../../../helpers/queue";
import { PluginRepository } from "../plugins/plugin-repository";
import { ContactRepository } from "../repositories/contact-repository";
import { DataRepository } from "../../../repositories/data-repository";
import { NotificationRepository } from "../repositories/notification-repository";
import { PeerRepository } from "../repositories/peer-repository";
import { SettingRepository } from "../repositories/setting-repository";
import { WalletRepository } from "../repositories/wallet-repository";
import { Avatar } from "../../../helpers/avatar";
import { CountAggregate } from "./aggregates/count-aggregate";
import { RegistrationAggregate } from "./aggregates/registration-aggregate";
import { TransactionAggregate } from "./aggregates/transaction-aggregate";
import { WalletAggregate } from "./aggregates/wallet-aggregate";
import { Authenticator } from "./authenticator";
import { Migrator } from "./migrator";

export class Profile implements IProfile {
	//
}
