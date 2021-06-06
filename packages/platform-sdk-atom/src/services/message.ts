import { Coins, Contracts, Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";
import { Buffoon } from "@arkecosystem/platform-sdk-crypto";
import { secp256k1 } from "bcrypto";

import { HashAlgorithms } from "../utils/hash";

@IoC.injectable()
export class MessageService extends Services.AbstractMessageService {
	@IoC.inject(IoC.BindingType.KeyPairService)
	protected readonly keyPairService!: Services.KeyPairService;

	public async sign(input: Services.MessageInput): Promise<Services.SignedMessage> {
		try {
			const { publicKey, privateKey } = await this.keyPairService.fromMnemonic(input.signatory.signingKey());

			return {
				message: input.message,
				signatory: publicKey,
				signature: secp256k1
					.sign(HashAlgorithms.sha256(input.message), Buffoon.fromHex(privateKey))
					.toString("hex"),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async verify(input: Services.SignedMessage): Promise<boolean> {
		try {
			return secp256k1.verify(
				HashAlgorithms.sha256(input.message),
				Buffoon.fromHex(input.signature),
				Buffoon.fromHex(input.signatory),
			);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
