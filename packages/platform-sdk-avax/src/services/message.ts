import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { BinTools, Buffer } from "avalanche";
import { KeyPair } from "avalanche/dist/apis/avm";
import { getPreferredHRP } from "avalanche/dist/utils";
import { createHash } from "crypto";

import { cb58Decode, cb58Encode, keyPairFromMnemonic } from "./helpers";

export class MessageService extends Services.AbstractMessageService {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		super();

		this.#config = config;
	}

	public static async __construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService(config);
	}

	public async sign(input: Services.MessageInput): Promise<Services.SignedMessage> {
		try {
			const { child } = keyPairFromMnemonic(this.#config, input.signatory.signingKey());

			return {
				message: input.message,
				signatory: child.getAddressString(),
				signature: cb58Encode(child.sign(this.digestMessage(input.message))),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async verify(input: Services.SignedMessage): Promise<boolean> {
		const bintools = BinTools.getInstance();

		const hrp = getPreferredHRP(parseInt(this.#config.get("network.meta.networkId")));
		const keypair = new KeyPair(hrp, "X");
		const signedBuff = cb58Decode(input.signature);
		const pubKey = keypair.recover(this.digestMessage(input.message), signedBuff);

		return bintools.addressToString(hrp, "X", keypair.addressFromPublicKey(pubKey)) === input.signatory;
	}

	private digestMessage(msgStr: string): Buffer {
		const mBuf = Buffer.from(msgStr, "utf8");
		const msgSize = Buffer.alloc(4);
		msgSize.writeUInt32BE(mBuf.length, 0);
		const msgBuf = Buffer.from(`\x1AAvalanche Signed Message:\n${msgSize}${msgStr}`, "utf8");

		return Buffer.from(createHash("sha256").update(msgBuf).digest());
	}
}
