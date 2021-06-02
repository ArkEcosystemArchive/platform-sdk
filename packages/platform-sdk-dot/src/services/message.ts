import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { Keyring } from "@polkadot/keyring";
import { hexToU8a, stringToU8a, u8aToHex } from "@polkadot/util";
import { signatureVerify } from "@polkadot/util-crypto";
import { waitReady } from "@polkadot/wasm-crypto";

export class MessageService extends Services.AbstractMessageService {
	readonly #keyring: Keyring;

	public constructor(config: Coins.Config) {
		super();

		this.#keyring = new Keyring({ type: "sr25519" });
		this.#keyring.setSS58Format(config.get("network.meta.networkId"));
	}

	public static async __construct(config: Coins.Config): Promise<MessageService> {
		await waitReady();

		return new MessageService(config);
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		try {
			const keypair = this.#keyring.addFromUri(input.signatory.signingKey());

			return {
				message: input.message,
				signatory: keypair.address,
				signature: u8aToHex(keypair.sign(stringToU8a(input.message))),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		try {
			return signatureVerify(stringToU8a(input.message), hexToU8a(input.signature), input.signatory).isValid;
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
