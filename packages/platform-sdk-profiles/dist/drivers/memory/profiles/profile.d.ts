import { BigNumber } from "@arkecosystem/platform-sdk-support";
import {
	IContactRepository,
	IPortfolio,
	ICountAggregate,
	IDataRepository,
	INotificationRepository,
	IPeerRepository,
	IPluginRepository,
	IProfile,
	IProfileInput,
	IRegistrationAggregate,
	ISettingRepository,
	ITransactionAggregate,
	IWalletAggregate,
	IWalletRepository,
	ICoinService,
	IAuthenticator,
	IWalletFactory,
	IProfileStatus,
} from "../../../contracts";
import { AttributeBag } from "../../../helpers/attribute-bag";
import { IPasswordManager } from "../../../contracts/profiles/services/password";
export declare class Profile implements IProfile {
	#private;
	constructor(data: IProfileInput);
	/** {@inheritDoc IProfile.id} */
	id(): string;
	/** {@inheritDoc IProfile.name} */
	name(): string;
	/** {@inheritDoc IProfile.avatar} */
	avatar(): string;
	/** {@inheritDoc IProfile.theme} */
	theme(): string;
	/** {@inheritDoc IProfile.balance} */
	balance(): BigNumber;
	/** {@inheritDoc IProfile.convertedBalance} */
	convertedBalance(): BigNumber;
	/** {@inheritDoc IProfile.flush} */
	flush(): void;
	/** {@inheritDoc IProfile.initialiseSettings} */
	flushSettings(): void;
	/** {@inheritDoc IProfile.coins} */
	coins(): ICoinService;
	/** {@inheritDoc IProfile.portfolio} */
	portfolio(): IPortfolio;
	/** {@inheritDoc IProfile.contacts} */
	contacts(): IContactRepository;
	/** {@inheritDoc IProfile.data} */
	data(): IDataRepository;
	/** {@inheritDoc IProfile.notifications} */
	notifications(): INotificationRepository;
	/** {@inheritDoc IProfile.peers} */
	peers(): IPeerRepository;
	/** {@inheritDoc IProfile.plugins} */
	plugins(): IPluginRepository;
	/** {@inheritDoc IProfile.settings} */
	settings(): ISettingRepository;
	/** {@inheritDoc IProfile.wallets} */
	wallets(): IWalletRepository;
	/** {@inheritDoc IProfile.walletFactory} */
	walletFactory(): IWalletFactory;
	/** {@inheritDoc IProfile.countAggregate} */
	countAggregate(): ICountAggregate;
	/** {@inheritDoc IProfile.registrationAggregate} */
	registrationAggregate(): IRegistrationAggregate;
	/** {@inheritDoc IProfile.transactionAggregate} */
	transactionAggregate(): ITransactionAggregate;
	/** {@inheritDoc IProfile.walletAggregate} */
	walletAggregate(): IWalletAggregate;
	/** {@inheritDoc IProfile.auth} */
	auth(): IAuthenticator;
	/** {@inheritDoc IProfile.password} */
	password(): IPasswordManager;
	/** {@inheritDoc IProfile.status} */
	status(): IProfileStatus;
	/** {@inheritDoc IProfile.usesPassword} */
	usesPassword(): boolean;
	/** {@inheritDoc IProfile.hasBeenPartiallyRestored} */
	hasBeenPartiallyRestored(): boolean;
	/** {@inheritDoc IProfile.getAttributes} */
	getAttributes(): AttributeBag<IProfileInput>;
	/** {@inheritDoc IProfile.async} */
	sync(): Promise<void>;
	/** {@inheritDoc IProfile.markIntroductoryTutorialAsComplete} */
	markIntroductoryTutorialAsComplete(): void;
	/** {@inheritDoc IProfile.hasCompletedIntroductoryTutorial} */
	hasCompletedIntroductoryTutorial(): boolean;
	/** {@inheritDoc IProfile.markManualInstallationDisclaimerAsAccepted} */
	markManualInstallationDisclaimerAsAccepted(): void;
	/** {@inheritDoc IProfile.hasAcceptedManualInstallationDisclaimer} */
	hasAcceptedManualInstallationDisclaimer(): boolean;
}
