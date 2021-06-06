/* istanbul ignore file */

import { BindingType, inject, injectable } from "../ioc";
import {
	MnemonicSignatory,
	MultiMnemonicSignatory,
	MultiSignatureSignatory,
	PrivateKeySignatory,
	SecondaryMnemonicSignatory,
	SecondaryWIFSignatory,
	SenderPublicKeySignatory,
	Signatory,
	SignatureSignatory,
	WIFSignatory,
} from "../signatories";
import { AddressService } from "./address.contract";
import { ExtendedAddressService } from "./extended-address.contract";
import { KeyPairService } from "./key-pair.contract";
import { PrivateKeyService } from "./private-key.contract";
import { PublicKeyService } from "./public-key.contract";
import { WIFService } from "./wif.contract";
import { IdentityOptions } from "./shared.contract";
import { SignatoryService } from "./signatory.contract";

@injectable()
export class AbstractSignatoryService implements SignatoryService {
	@inject(BindingType.AddressService)
	private readonly addressService!: AddressService;

	@inject(BindingType.ExtendedAddressService)
	private readonly extendedAddressService!: ExtendedAddressService;

	@inject(BindingType.KeyPairService)
	private readonly keyPairService!: KeyPairService;

	@inject(BindingType.PrivateKeyService)
	private readonly privateKeyService!: PrivateKeyService;

	@inject(BindingType.PublicKeyService)
	private readonly publicKeyService!: PublicKeyService;

	@inject(BindingType.WIFService)
	private readonly wifService!: WIFService;

	public async mnemonic(mnemonic: string, options?: IdentityOptions): Promise<Signatory> {
		return new Signatory(
			new MnemonicSignatory({
				signingKey: mnemonic,
				address: (await this.addressService.fromMnemonic(mnemonic, options)).address,
				publicKey: (await this.publicKeyService.fromMnemonic(mnemonic, options)).publicKey,
				privateKey: (await this.privateKeyService.fromMnemonic(mnemonic, options)).privateKey,
			}),
		);
	}

	public async secondaryMnemonic(
		signingKey: string,
		confirmKey: string,
		options?: IdentityOptions,
	): Promise<Signatory> {
		return new Signatory(
			new SecondaryMnemonicSignatory({
				signingKey,
				confirmKey,
				address: (await this.addressService.fromMnemonic(signingKey, options)).address,
				publicKey: (await this.publicKeyService.fromMnemonic(signingKey, options)).publicKey,
				privateKey: (await this.privateKeyService.fromMnemonic(signingKey, options)).privateKey,
			}),
		);
	}

	public async multiMnemonic(mnemonics: string[]): Promise<Signatory> {
		return new Signatory(
			new MultiMnemonicSignatory(
				mnemonics,
				(
					await Promise.all(
						mnemonics.map((mnemonic: string) => this.publicKeyService.fromMnemonic(mnemonic)),
					)
				).map(({ publicKey }) => publicKey),
			),
		);
	}

	public async wif(primary: string): Promise<Signatory> {
		return new Signatory(
			new WIFSignatory({
				signingKey: primary,
				address: (await this.addressService.fromWIF(primary)).address,
				publicKey: (await this.publicKeyService.fromWIF(primary)).publicKey,
				privateKey: (await this.privateKeyService.fromWIF(primary)).privateKey,
			}),
		);
	}

	public async secondaryWif(signingKey: string, confirmKey: string): Promise<Signatory> {
		return new Signatory(
			new SecondaryWIFSignatory({
				signingKey,
				confirmKey,
				address: (await this.addressService.fromWIF(signingKey)).address,
				publicKey: (await this.publicKeyService.fromWIF(signingKey)).publicKey,
				privateKey: (await this.privateKeyService.fromWIF(signingKey)).privateKey,
			}),
		);
	}

	public async privateKey(privateKey: string, options?: IdentityOptions): Promise<Signatory> {
		return new Signatory(
			new PrivateKeySignatory({
				signingKey: privateKey,
				address: (await this.addressService.fromPrivateKey(privateKey, options)).address,
			}),
		);
	}

	public async signature(signature: string, senderPublicKey: string): Promise<Signatory> {
		return new Signatory(
			new SignatureSignatory({
				signingKey: signature,
				address: (await this.addressService.fromPublicKey(senderPublicKey)).address,
				publicKey: senderPublicKey,
			}),
		);
	}

	public async senderPublicKey(publicKey: string, options?: IdentityOptions): Promise<Signatory> {
		return new Signatory(
			new SenderPublicKeySignatory({
				signingKey: publicKey,
				address: (await this.addressService.fromPublicKey(publicKey, options)).address,
				publicKey,
			}),
		);
	}

	public async multiSignature(min: number, publicKeys: string[]): Promise<Signatory> {
		return new Signatory(new MultiSignatureSignatory({ min, publicKeys }));
	}
}
