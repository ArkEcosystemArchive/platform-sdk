import { AddressDataTransferObject, AddressService } from "./identity/address.contract";
import { ExtendedAddressDataTransferObject, ExtendedAddressService } from "./identity/extended-address.contract";
import { KeyPairDataTransferObject, KeyPairService } from "./identity/key-pair.contract";
import { PrivateKeyDataTransferObject, PrivateKeyService } from "./identity/private-key.contract";
import { PublicKeyDataTransferObject, PublicKeyService } from "./identity/public-key.contract";
import { WIFDataTransferObject, WIFService } from "./identity/wif.contract";
export * from "./identity/shared.contract";

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
