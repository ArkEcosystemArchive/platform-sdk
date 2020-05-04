import { Contracts } from "@arkecosystem/platform-sdk";
import { ECPair } from "bitcoinjs-lib";
import bitcoinMessage from "bitcoinjs-message";

import { IdentityService } from "./identity";

export class MessageService implements Contracts.MessageService {
	readonly #identity: IdentityService;

	private constructor(identityService: IdentityService) {
		this.#identity = identityService;
	}

	public static async construct(opts: Contracts.KeyValuePair): Promise<MessageService> {
		const identityService = await IdentityService.construct({});

		return new MessageService(identityService);
	}

	public async destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		const { privateKey, compressed } = ECPair.fromWIF(input.passphrase);

		return {
			message: input.message,
			signer: await this.#identity.address({ wif: input.passphrase }),
			signature: bitcoinMessage.sign(input.message, privateKey, compressed).toString("hex"),
		};
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		return bitcoinMessage.verify(input.message, input.signer, Buffer.from(input.signature, "hex"));
	}
}
