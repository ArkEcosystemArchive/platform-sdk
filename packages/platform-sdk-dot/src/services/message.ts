import { Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";
import { Keyring } from "@polkadot/keyring";
import { hexToU8a, stringToU8a, u8aToHex } from "@polkadot/util";
import { signatureVerify } from "@polkadot/util-crypto";

import { BindingType } from "../constants";

@IoC.injectable()
export class MessageService extends Services.AbstractMessageService {
	@IoC.inject(BindingType.Keyring)
	protected readonly keyring!: Keyring;

	public async sign(input: Services.MessageInput): Promise<Services.SignedMessage> {
		try {
			const keypair = this.keyring.addFromUri(input.signatory.signingKey());

			return {
				message: input.message,
				signatory: keypair.address,
				signature: u8aToHex(keypair.sign(stringToU8a(input.message))),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async verify(input: Services.SignedMessage): Promise<boolean> {
		try {
			return signatureVerify(stringToU8a(input.message), hexToU8a(input.signature), input.signatory).isValid;
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
