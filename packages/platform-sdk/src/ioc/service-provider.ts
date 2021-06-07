/* istanbul ignore file */

import { inject, injectable } from "inversify";

import { ConfigRepository } from "../coins";
import {
	AbstractAddressService,
	AbstractClientService,
	AbstractDataTransferObjectService,
	AbstractExtendedAddressService,
	AbstractFeeService,
	AbstractKeyPairService,
	AbstractKnownWalletService,
	AbstractLedgerService,
	AbstractLinkService,
	AbstractMessageService,
	AbstractMultiSignatureService,
	AbstractPrivateKeyService,
	AbstractPublicKeyService,
	AbstractSignatoryService,
	AbstractTransactionService,
	AbstractWalletDiscoveryService,
	AbstractWIFService,
	BigNumberService,
} from "../services";
import { Container } from "./container";
import { BindingType, ServiceList } from "./service-provider.contract";

@injectable()
export abstract class AbstractServiceProvider {
	@inject(BindingType.ConfigRepository)
	protected readonly configRepository!: ConfigRepository;

	protected async compose(services: ServiceList, container: Container): Promise<void> {
		container.singleton(BindingType.BigNumberService, BigNumberService);

		container.singleton(BindingType.AddressService, services.AddressService || AbstractAddressService);
		container.singleton(BindingType.ClientService, services.ClientService || AbstractClientService);
		container.singleton(
			BindingType.DataTransferObjectService,
			services.DataTransferObjectService || AbstractDataTransferObjectService,
		);
		container.singleton(
			BindingType.ExtendedAddressService,
			services.ExtendedAddressService || AbstractExtendedAddressService,
		);
		container.singleton(BindingType.FeeService, services.FeeService || AbstractFeeService);
		container.singleton(BindingType.KeyPairService, services.KeyPairService || AbstractKeyPairService);
		container.singleton(BindingType.KnownWalletService, services.KnownWalletService || AbstractKnownWalletService);
		container.singleton(BindingType.LedgerService, services.LedgerService || AbstractLedgerService);
		container.singleton(BindingType.LinkService, services.LinkService || AbstractLinkService);
		container.singleton(BindingType.MessageService, services.MessageService || AbstractMessageService);
		container.singleton(
			BindingType.MultiSignatureService,
			services.MultiSignatureService || AbstractMultiSignatureService,
		);
		container.singleton(BindingType.PrivateKeyService, services.PrivateKeyService || AbstractPrivateKeyService);
		container.singleton(BindingType.PublicKeyService, services.PublicKeyService || AbstractPublicKeyService);
		container.singleton(BindingType.SignatoryService, services.SignatoryService || AbstractSignatoryService);
		container.singleton(BindingType.TransactionService, services.TransactionService || AbstractTransactionService);
		container.singleton(
			BindingType.WalletDiscoveryService,
			services.WalletDiscoveryService || AbstractWalletDiscoveryService,
		);
		container.singleton(BindingType.WIFService, services.WIFService || AbstractWIFService);
	}
}
