/* istanbul ignore file */

import { CoinServices, CoinSpec, Config } from "../coins";
import { BigNumberService } from "../services/big-number.service";
import { Container } from "./container";
import { ServiceKeys, ServiceList } from "./service-provider.contract";

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
			bigNumber: new BigNumberService(this.#config),
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
		const bindings: Record<symbol, any> = {
			[ServiceKeys.BigNumberService]: services.bigNumber,
			[ServiceKeys.ClientService]: services.client,
			[ServiceKeys.DataTransferObjectService]: services.dataTransferObject,
			[ServiceKeys.FeeService]: services.fee,
			[ServiceKeys.IdentityService]: services.identity,
			[ServiceKeys.KnownWalletService]: services.knownWallets,
			[ServiceKeys.LedgerService]: services.ledger,
			[ServiceKeys.LinkService]: services.link,
			[ServiceKeys.MessageService]: services.message,
			[ServiceKeys.MultiSignatureService]: services.multiSignature,
			[ServiceKeys.SignatoryService]: services.signatory,
			[ServiceKeys.TransactionService]: services.transaction,
			[ServiceKeys.WalletDiscoveryService]: services.walletDiscovery,
		}

		for (const [key, value] of Object.entries(bindings)) {
			if (container.missing(key)) {
				container.constant(key, value);
			}
		}
	}
}
