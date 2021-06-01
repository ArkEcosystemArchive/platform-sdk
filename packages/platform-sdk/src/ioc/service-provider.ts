/* istanbul ignore file */

import { CoinServices, CoinSpec, Config } from "../coins";
import { Container } from "./container";

export type ServiceList = Record<string, { __construct: Function }>;

export const ServiceKeys = {
	ClientService: Symbol("ClientService"),
	DataTransferObjectService: Symbol("DataTransferObjectService"),
	FeeService: Symbol("FeeService"),
	IdentityService: Symbol("IdentityService"),
	KnownWalletService: Symbol("KnownWalletService"),
	LedgerService: Symbol("LedgerService"),
	LinkService: Symbol("LinkService"),
	MessageService: Symbol("MessageService"),
	MultiSignatureService: Symbol("MultiSignatureService"),
	SignatoryService: Symbol("SignatoryService"),
	TransactionService: Symbol("TransactionService"),
	WalletDiscoveryService: Symbol("WalletDiscoveryService"),
};

export abstract class AbstractServiceProvider {
	readonly #coin: CoinSpec;
	readonly #config: Config;

	public constructor(coin: CoinSpec, config: Config) {
		this.#coin = coin;
		this.#config = config;
	}

	public abstract make(): Promise<CoinServices>;

	protected coin(): CoinSpec {
		return this.#coin;
	}

	protected config(): Config {
		return this.#config;
	}

	protected async compose(serviceList: ServiceList, container: Container): Promise<CoinServices> {
		const services: CoinServices = await this.makeServices(serviceList);

		this.bindServices(services, container);

		return services;
	}

	protected async makeServices(services: ServiceList): Promise<CoinServices> {
		const [
			client,
			dataTransferObject,
			fee,
			identity,
			knownWallets,
			ledger,
			link,
			message,
			multiSignature,
			signatory,
			transaction,
			walletDiscovery,
		] = await Promise.all<any>([
			services.ClientService.__construct(this.#config),
			services.DataTransferObjectService.__construct(this.#config),
			services.FeeService.__construct(this.#config),
			services.IdentityService.__construct(this.#config),
			services.KnownWalletService.__construct(this.#config),
			services.LedgerService.__construct(this.#config),
			services.LinkService.__construct(this.#config),
			services.MessageService.__construct(this.#config),
			services.MultiSignatureService.__construct(this.#config),
			services.SignatoryService.__construct(this.#config),
			services.TransactionService.__construct(this.#config),
			services.WalletDiscoveryService.__construct(this.#config),
		]);

		return {
			client,
			dataTransferObject,
			fee,
			identity,
			knownWallets,
			ledger,
			link,
			message,
			multiSignature,
			signatory,
			transaction,
			walletDiscovery,
		};
	}

	protected bindServices(services: CoinServices, container: Container): void {
		container.constant(ServiceKeys.ClientService, services.client);
		container.constant(ServiceKeys.DataTransferObjectService, services.dataTransferObject);
		container.constant(ServiceKeys.FeeService, services.fee);
		container.constant(ServiceKeys.IdentityService, services.identity);
		container.constant(ServiceKeys.KnownWalletService, services.knownWallets);
		container.constant(ServiceKeys.LedgerService, services.ledger);
		container.constant(ServiceKeys.LinkService, services.link);
		container.constant(ServiceKeys.MessageService, services.message);
		container.constant(ServiceKeys.MultiSignatureService, services.multiSignature);
		container.constant(ServiceKeys.SignatoryService, services.signatory);
		container.constant(ServiceKeys.TransactionService, services.transaction);
		container.constant(ServiceKeys.WalletDiscoveryService, services.walletDiscovery);
	}
}
