import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Mnemonic, UserSecretKey, UserSigner, ISignable, Address } from "@elrondnetwork/erdjs/out";
import { Signature } from "@elrondnetwork/erdjs/out/signature";

export class MessageService implements Contracts.MessageService {
	public static async __construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService();
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		if (!input.mnemonic) {
			throw new Exceptions.MissingArgument(MessageService.name, this.sign.name, "input.mnemonic");
		}
		const mnemonic: Mnemonic = Mnemonic.fromString(input.mnemonic);
		const secretKey: UserSecretKey = mnemonic.deriveKey(0);
		const signer: UserSigner = new UserSigner(secretKey);

		const message = new SignableMessage(input.message);
		await signer.sign(message);

		return {
			message: input.message,
			signatory: secretKey.generatePublicKey().hex(),
			signature: message.getSignature(),
		}
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		throw new Exceptions.NotImplemented(this.constructor.name, "verify");
	}
}

class SignableMessage implements ISignable {
	#signature: string | undefined;

	constructor(public message: string) {};

	public serializeForSigning(signedBy: Address): Buffer {
		return Buffer.from(this.message);
	}

	public applySignature(signature: Signature, signedBy: Address): void {
		this.#signature = signature.hex();
	}

	public getSignature() {
		if (!this.#signature) {
			throw new Exceptions.BadStateException(this.getSignature.name, "Signature not computed");
		}
		return this.#signature;
	}
}