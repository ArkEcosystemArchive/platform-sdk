/* istanbul ignore file */

import { AddressDataTransferObject, AddressService } from "./address.contract";
import { ExtendedAddressDataTransferObject, ExtendedAddressService } from "./extended-address.contract";
import { KeyPairDataTransferObject, KeyPairService } from "./key-pair.contract";
import { PrivateKeyDataTransferObject, PrivateKeyService } from "./private-key.contract";
import { PublicKeyDataTransferObject, PublicKeyService } from "./public-key.contract";
import { WIFDataTransferObject, WIFService } from "./wif.contract";

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
