/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Base64, PBKDF2 } from "@arkecosystem/platform-sdk-crypto";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import Joi from "joi";

import { MemoryPassword } from "../helpers/password";
import { pqueue } from "../helpers/queue";
import { PluginRepository } from "../plugins/plugin-repository";
import { ContactRepository } from "../repositories/contact-repository";
import { DataRepository } from "../repositories/data-repository";
import { NotificationRepository } from "../repositories/notification-repository";
import { PeerRepository } from "../repositories/peer-repository";
import { SettingRepository } from "../repositories/setting-repository";
import { WalletRepository } from "../repositories/wallet-repository";
import { Avatar } from "../services/avatar";
import { ReadWriteWallet } from "../wallets/wallet.models";
import { CountAggregate } from "./aggregates/count-aggregate";
import { RegistrationAggregate } from "./aggregates/registration-aggregate";
import { TransactionAggregate } from "./aggregates/transaction-aggregate";
import { WalletAggregate } from "./aggregates/wallet-aggregate";
import { Authenticator } from "./authenticator";
import { Migrator } from "./migrator";
import { ProfileContract, ProfileExportOptions, ProfileInput, ProfileSetting, ProfileStruct } from "./profile.models";

export interface IProfile {
    id(): string;
    name(): string;
    avatar(): string;
    balance(): BigNumber;
    convertedBalance(): BigNumber;
    contacts(): ContactRepository;
    data(): DataRepository;
    notifications(): NotificationRepository;
    peers(): PeerRepository;
    plugins(): PluginRepository;
    settings(): SettingRepository;
    wallets(): WalletRepository;
    flush(): void;
    countAggregate(): CountAggregate;
    registrationAggregate(): RegistrationAggregate;
    transactionAggregate(): TransactionAggregate;
    walletAggregate(): WalletAggregate;
    auth(): Authenticator;
    usesPassword(): boolean;
    usesMultiPeerBroadcasting(): boolean;
    toObject(options: ProfileExportOptions): ProfileStruct;
    dump(): ProfileInput;
    restore(password: string): Promise<void>;
    initializeSettings(): void;
    migrate(migrations: object, versionToMigrate: string): Promise<void>;
    getRawData(): ProfileInput;
    setRawData(data: ProfileInput): void;
    setRawDataKey(key: keyof ProfileInput, value: string): void;
    save(password: string): void;
    export(password: string, options: ProfileExportOptions): string;
}
