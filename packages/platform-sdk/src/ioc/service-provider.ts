/* istanbul ignore file */

import { inject, injectable } from "inversify";

import { CoinServices, CoinSpec, ConfigRepository } from "../coins";
import {
	ClientService,
	DataTransferObjectService,
	FeeService,
	IdentityService,
	KnownWalletService,
	LedgerService,
	LinkService,
	MessageService,
	MultiSignatureService,
	SignatoryService,
	TransactionService,
	WalletDiscoveryService,
} from "../services";
import { BigNumberService } from "../services/big-number.service";
import { Container } from "./container";
import { BINDING_TYPES, ServiceList } from "./service-provider.contract";

@injectable()
export abstract class AbstractServiceProvider {
	readonly #coin!: CoinSpec;

	@inject(BINDING_TYPES.ConfigRepository)
	private readonly configRepository!: ConfigRepository;

	protected coin(): CoinSpec {
		return this.#coin;
	}

	protected config(): ConfigRepository {
		return this.configRepository;
	}

	protected async compose(services: ServiceList, container: Container): Promise<CoinServices> {
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
			// @ts-ignore - @TODO: turn construct into a @postConstruct method
			container.resolve<ClientService>(services.ClientService).__construct(this.configRepository),
			// @ts-ignore - @TODO: turn construct into a @postConstruct method
			container
				.resolve<DataTransferObjectService>(services.DataTransferObjectService)
				.__construct(this.configRepository),
			// @ts-ignore - @TODO: turn construct into a @postConstruct method
			container.resolve<FeeService>(services.FeeService).__construct(this.configRepository),
			// @ts-ignore - @TODO: turn construct into a @postConstruct method
			container.resolve<IdentityService>(services.IdentityService).__construct(this.configRepository),
			// @ts-ignore - @TODO: turn construct into a @postConstruct method
			container.resolve<KnownWalletService>(services.KnownWalletService).__construct(this.configRepository),
			// @ts-ignore - @TODO: turn construct into a @postConstruct method
			container.resolve<LedgerService>(services.LedgerService).__construct(this.configRepository),
			// @ts-ignore - @TODO: turn construct into a @postConstruct method
			container.resolve<LinkService>(services.LinkService).__construct(this.configRepository),
			// @ts-ignore - @TODO: turn construct into a @postConstruct method
			container.resolve<MessageService>(services.MessageService).__construct(this.configRepository),
			// @ts-ignore - @TODO: turn construct into a @postConstruct method
			container.resolve<MultiSignatureService>(services.MultiSignatureService).__construct(this.configRepository),
			// @ts-ignore - @TODO: turn construct into a @postConstruct method
			container.resolve<SignatoryService>(services.SignatoryService).__construct(this.configRepository),
			// @ts-ignore - @TODO: turn construct into a @postConstruct method
			container.resolve<TransactionService>(services.TransactionService).__construct(this.configRepository),
			// @ts-ignore - @TODO: turn construct into a @postConstruct method
			container
				.resolve<WalletDiscoveryService>(services.WalletDiscoveryService)
				.__construct(this.configRepository),
		]);

		return {
			bigNumber: container.resolve(BigNumberService),
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
