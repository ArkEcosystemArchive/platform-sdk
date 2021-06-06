/* istanbul ignore file */

import { inject, injectable } from "inversify";

import { CoinServices, CoinSpec, ConfigRepository } from "../coins";
import {
	AddressService,
	BigNumberService,
	ClientService,
	DataTransferObjectService,
	ExtendedAddressService,
	FeeService,
	KeyPairService,
	KnownWalletService,
	LedgerService,
	LinkService,
	MessageService,
	MultiSignatureService,
	PrivateKeyService,
	PublicKeyService,
	SignatoryService,
	TransactionService,
	WalletDiscoveryService,
	WIFService,
} from "../services";
import { Container } from "./container";
import { BindingType, ServiceList } from "./service-provider.contract";

@injectable()
export abstract class AbstractServiceProvider {
	readonly #coin!: CoinSpec;

	@inject(BindingType.ConfigRepository)
	protected readonly configRepository!: ConfigRepository;

	protected coin(): CoinSpec {
		return this.#coin;
	}

	protected config(): ConfigRepository {
		return this.configRepository;
	}

	protected async compose(services: ServiceList, container: Container): Promise<CoinServices> {
		const [
			address,
			client,
			dataTransferObject,
			extendedAddress,
			fee,
			keyPair,
			knownWallets,
			ledger,
			link,
			message,
			multiSignature,
			privateKey,
			publicKey,
			signatory,
			transaction,
			walletDiscovery,
			wif,
		] = await Promise.all<any>([
			container.resolve<AddressService>(services.AddressService),
			container.resolve<ClientService>(services.ClientService),
			container.resolve<DataTransferObjectService>(services.DataTransferObjectService),
			container.resolve<ExtendedAddressService>(services.ExtendedAddressService),
			container.resolve<FeeService>(services.FeeService),
			container.resolve<KeyPairService>(services.KeyPairService),
			container.resolve<KnownWalletService>(services.KnownWalletService),
			container.resolve<LedgerService>(services.LedgerService),
			container.resolve<LinkService>(services.LinkService),
			container.resolve<MessageService>(services.MessageService),
			container.resolve<MultiSignatureService>(services.MultiSignatureService),
			container.resolve<PrivateKeyService>(services.PrivateKeyService),
			container.resolve<PublicKeyService>(services.PublicKeyService),
			container.resolve<SignatoryService>(services.SignatoryService),
			container.resolve<TransactionService>(services.TransactionService),
			container.resolve<WalletDiscoveryService>(services.WalletDiscoveryService),
			container.resolve<WIFService>(services.WIFService),
		]);

		return {
			address,
			bigNumber: container.resolve(BigNumberService),
			client,
			dataTransferObject,
			extendedAddress,
			fee,
			keyPair,
			knownWallets,
			ledger,
			link,
			message,
			multiSignature,
			privateKey,
			publicKey,
			signatory,
			transaction,
			walletDiscovery,
			wif,
		};
	}
}
