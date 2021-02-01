import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Keyring } from "@polkadot/keyring";
import { hexToU8a, stringToU8a, u8aToHex } from "@polkadot/util";
import { waitReady } from "@polkadot/wasm-crypto";

export class MessageService implements Contracts.MessageService {
	readonly #keyring: Keyring;

	public constructor(config: Coins.Config) {
		this.#keyring = new Keyring({ type: "sr25519" });
		this.#keyring.setSS58Format(config.get(Coins.ConfigKey.CryptoNetworkId));
	}

	public static async construct(config: Coins.Config): Promise<MessageService> {
		await waitReady();

		return new MessageService(config);
	}

	public async destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		try {
			const keypair = this.#keyring.addFromUri(input.mnemonic);

			return {
				message: input.message,
				signatory: u8aToHex(keypair.publicKey),
				signature: u8aToHex(keypair.sign(stringToU8a(input.message))),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		if (input.mnemonic === undefined) {
			throw new Exceptions.InvalidArguments(this.constructor.name, "verify");
		}

		try {
			return this.#keyring
				.addFromMnemonic(input.mnemonic)
				.verify(stringToU8a(input.message), hexToU8a(input.signature));
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
