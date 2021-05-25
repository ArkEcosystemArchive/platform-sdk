import { AddressService } from "./address";
import { AddressListService } from "./address-list";
import { KeyPairService } from "./key-pair";
import { PrivateKeyService } from "./private-key";
import { PublicKeyService } from "./public-key";
import { WIFService } from "./wif";
export * from "./shared";

export interface IdentityService {
    __destruct(): Promise<void>;

    address(): AddressService;

    addressList(): AddressListService;

    keys(): KeyPairService;

    privateKey(): PrivateKeyService;

    publicKey(): PublicKeyService;

    wif(): WIFService;
}

export {
    AddressService,
    AddressListService,
    KeyPairService,
    PublicKeyService,
    PrivateKeyService,
    WIFService,
}
