/* istanbul ignore file */

import { inject, injectable } from "inversify";

import { CoinServices, CoinSpec, ConfigRepository } from "../coins";
import { BigNumberService } from "../services/big-number.service";
import { Container } from "./container";
import { ServiceList } from "./service-provider.contract";

@injectable()
export abstract class AbstractServiceProvider {
	readonly #coin!: CoinSpec;

	@inject("config")
	private readonly _config!: ConfigRepository;

	public abstract make(container: Container): Promise<CoinServices>;

	protected coin(): CoinSpec {
		return this.#coin;
	}

	protected config(): ConfigRepository {
		return this._config;
	}

	protected async compose(services: ServiceList): Promise<CoinServices> {
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
}
