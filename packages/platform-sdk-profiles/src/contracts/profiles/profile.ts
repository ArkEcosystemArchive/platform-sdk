/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { IPluginRepository } from "../plugins/plugin-repository";
import { IContactRepository } from "../repositories/contact-repository";
import { IDataRepository } from "../repositories/data-repository";
import { INotificationRepository } from "../repositories/notification-repository";
import { IPeerRepository } from "../repositories/peer-repository";
import { ISettingRepository } from "../repositories/setting-repository";
import { IWalletRepository } from "../repositories/wallet-repository";
import { ICoinService } from "../services";
import { IWalletStruct } from "../wallets";
import { ICountAggregate } from "./aggregates/count-aggregate";
import { IRegistrationAggregate } from "./aggregates/registration-aggregate";
import { ITransactionAggregate } from "./aggregates/transaction-aggregate";
import { IWalletAggregate } from "./aggregates/wallet-aggregate";
import { IAuthenticator } from "./authenticator";
import { IPortfolio } from "./portfolio";

export interface IProfileStruct {
	id: string;
	wallets: Record<string, IWalletStruct>;
	contacts: Record<string, any>;
	peers: Record<string, any>;
	plugins: Record<string, any>;
	notifications: Record<string, any>;
	data: Record<string, any>;
	settings: Record<string, any>;
}

export interface IProfileInput {
	id: string;
	name: string;
	avatar?: string;
	password?: string;
	data: string;
}

export interface IWalletExportOptions {
	excludeEmptyWallets: boolean;
	excludeLedgerWallets: boolean;
	addNetworkInformation: boolean;
}

export interface IProfileExportOptions extends IWalletExportOptions {
	saveGeneralSettings: boolean;
}

export interface IProfile {
	coins(): ICoinService;

	id(): string;
	name(): string;
	avatar(): string;
	balance(): BigNumber;
	convertedBalance(): BigNumber;
	portfolio(): IPortfolio;
	contacts(): IContactRepository;
	data(): IDataRepository;
	notifications(): INotificationRepository;
	peers(): IPeerRepository;
	plugins(): IPluginRepository;
	settings(): ISettingRepository;
	wallets(): IWalletRepository;
	flush(): void;
	countAggregate(): ICountAggregate;
	registrationAggregate(): IRegistrationAggregate;
	transactionAggregate(): ITransactionAggregate;
	walletAggregate(): IWalletAggregate;
	auth(): IAuthenticator;
	usesPassword(): boolean;
	usesCustomPeer(): boolean;
	usesMultiPeerBroadcasting(): boolean;
	toObject(options?: IProfileExportOptions): IProfileStruct;
	dump(): IProfileInput;
	restore(password?: string): Promise<void>;
	sync(): Promise<void>;
	initializeSettings(): void;
	getRawData(): IProfileInput;
	setRawData(data: IProfileInput): void;
	setRawDataKey(key: keyof IProfileInput, value: string): void;
	save(password?: string): void;
	export(password?: string, options?: IProfileExportOptions): string;
	hasBeenPartiallyRestored(): boolean;
}
