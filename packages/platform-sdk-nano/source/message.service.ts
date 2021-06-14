import { Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";
import { getPublicKey, sign, verify } from "noble-ed25519";

@IoC.injectable()
export class MessageService extends Services.AbstractMessageService {
	@IoC.inject(IoC.BindingType.KeyPairService)
	private readonly keyPairService!: Services.KeyPairService;

	public override async sign(input: Services.MessageInput): Promise<Services.SignedMessage> {
		try {
			const { privateKey } = await this.keyPairService.fromMnemonic(input.signatory.signingKey());

			if (privateKey === undefined) {
				throw new Error("Failed to retrieve the private key for the signatory wallet.");
			}

			return {
				message: input.message,
				signatory: await getPublicKey(privateKey),
				signature: await sign(Buffer.from(input.message, "utf8").toString("hex"), privateKey),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public override async verify(input: Services.SignedMessage): Promise<boolean> {
		try {
			return verify(input.signature, Buffer.from(input.message, "utf8").toString("hex"), input.signatory);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
