/* istanbul ignore file */

import { inject, injectable } from "inversify";
import { CoinServices, CoinSpec, Config } from "../coins";
import { BigNumberService } from "../services/big-number.service";
import { Container } from "./container";
import { ServiceKeys, ServiceList } from "./service-provider.contract";

@injectable()
export abstract class AbstractServiceProvider {
	readonly #coin!: CoinSpec;

	@inject("config")
	private readonly _config!: Config;

	// public constructor(coin: CoinSpec, config: Config) {
	// 	this.#coin = coin;
	// 	this._config = config;
	// }

	public abstract make(container: Container): Promise<CoinServices>;

	protected coin(): CoinSpec {
		return this.#coin;
	}

	protected config(): Config {
		return this._config;
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
			services.ClientService.__construct(this._config),
			services.DataTransferObjectService.__construct(this._config),
			services.FeeService.__construct(this._config),
			services.IdentityService.__construct(this._config),
			services.KnownWalletService.__construct(this._config),
			services.LedgerService.__construct(this._config),
			services.LinkService.__construct(this._config),
			services.MessageService.__construct(this._config),
			services.MultiSignatureService.__construct(this._config),
			services.SignatoryService.__construct(this._config),
			services.TransactionService.__construct(this._config),
			services.WalletDiscoveryService.__construct(this._config),
		]);

		return {
			bigNumber: new BigNumberService(this._config),
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
		};

		for (const [key, value] of Object.entries(bindings)) {
			if (container.has(key)) {
				container.unbind(key);
			}

			container.constant(key, value);
		}
	}
}
