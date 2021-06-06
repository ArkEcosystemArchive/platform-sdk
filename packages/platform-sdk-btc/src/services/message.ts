import { Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";
import { ECPair } from "bitcoinjs-lib";
import { sign, verify } from "bitcoinjs-message";

@IoC.injectable()
export class MessageService extends Services.AbstractMessageService {
	@IoC.inject(IoC.BindingType.AddressService)
	private readonly addressService!: Services.AddressService;

	public async sign(input: Services.MessageInput): Promise<Services.SignedMessage> {
		try {
			const { compressed, privateKey } = ECPair.fromWIF(input.signatory.signingKey());

			if (!privateKey) {
				throw new Error(`Failed to derive private key for [${input.signatory.signingKey()}].`);
			}

			return {
				message: input.message,
				signatory: (await this.addressService.fromWIF(input.signatory.signingKey())).address,
				signature: sign(input.message, privateKey, compressed).toString("base64"),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async verify(input: Services.SignedMessage): Promise<boolean> {
		try {
			return verify(input.message, input.signatory, input.signature);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
