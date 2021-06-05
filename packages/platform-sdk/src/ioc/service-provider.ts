/* istanbul ignore file */

import { inject, injectable } from "inversify";

import { CoinServices, CoinSpec, ConfigRepository } from "../coins";
import { BigNumberService } from "../services/big-number.service";
import { Container } from "./container";
import { BINDING_TYPES, ServiceList } from "./service-provider.contract";

@injectable()
export abstract class AbstractServiceProvider {
	readonly #coin!: CoinSpec;

	@inject(BINDING_TYPES.ConfigRepository)
	private readonly configRepository!: ConfigRepository;

	public abstract make(container: Container): Promise<CoinServices>;

	protected coin(): CoinSpec {
		return this.#coin;
	}

	protected config(): ConfigRepository {
		return this.configRepository;
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
			services.ClientService.__construct(this.configRepository),
			services.DataTransferObjectService.__construct(this.configRepository),
			services.FeeService.__construct(this.configRepository),
			services.IdentityService.__construct(this.configRepository),
			services.KnownWalletService.__construct(this.configRepository),
			services.LedgerService.__construct(this.configRepository),
			services.LinkService.__construct(this.configRepository),
			services.MessageService.__construct(this.configRepository),
			services.MultiSignatureService.__construct(this.configRepository),
			services.SignatoryService.__construct(this.configRepository),
			services.TransactionService.__construct(this.configRepository),
			services.WalletDiscoveryService.__construct(this.configRepository),
		]);

		return {
			bigNumber: new BigNumberService(this.configRepository),
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
