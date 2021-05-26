import { AddressDataTransferObject, AddressService } from "./address";
import { ExtendedAddressDataTransferObject, ExtendedAddressService } from "./address-list";
import { KeyPairDataTransferObject, KeyPairService } from "./key-pair";
import { PrivateKeyDataTransferObject, PrivateKeyService } from "./private-key";
import { PublicKeyDataTransferObject, PublicKeyService } from "./public-key";
import { WIFDataTransferObject, WIFService } from "./wif";
export * from "./shared";

export interface IdentityService {
	__destruct(): Promise<void>;

	address(): AddressService;

	extendedAddress(): ExtendedAddressService;

	keyPair(): KeyPairService;

	privateKey(): PrivateKeyService;

	publicKey(): PublicKeyService;

	wif(): WIFService;
}

export {
	AddressDataTransferObject,
	AddressService,
	ExtendedAddressDataTransferObject,
	ExtendedAddressService,
	KeyPairDataTransferObject,
	KeyPairService,
	PrivateKeyDataTransferObject,
	PublicKeyService,
	PublicKeyDataTransferObject,
	PrivateKeyService,
	WIFDataTransferObject,
	WIFService,
};
