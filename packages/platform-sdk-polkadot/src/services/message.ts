import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Keyring } from '@polkadot/keyring';
import { stringToU8a, u8aToHex } from '@polkadot/util';
import { waitReady } from '@polkadot/wasm-crypto';

export class MessageService implements Contracts.MessageService {
	readonly #keyring: Keyring;

	public constructor() {
		this.#keyring = new Keyring({ type: 'sr25519' });
	}

	public static async construct(config: Coins.Config): Promise<MessageService> {
		await waitReady();

		return new MessageService();
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
				signature: Buffer.from(keypair.sign(stringToU8a(input.message))).toString("hex"),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		throw new Exceptions.NotSupported(this.constructor.name, "verify");
	}
}
