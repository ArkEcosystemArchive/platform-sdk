import { secp256k1 } from "bcrypto";
import * as bech32 from "bech32";
import * as bip32 from "bip32";
import * as bip39 from "bip39";

import { HashAlgorithms } from "./hash";
import { KeyPair, StdSignMsg, Wallet } from "./types";

const deriveMasterKey = (mnemonic: string): bip32.BIP32Interface => {
	bip39.validateMnemonic(mnemonic);

	return bip32.fromSeed(bip39.mnemonicToSeedSync(mnemonic));
};

const deriveKeypair = (masterKey: bip32.BIP32Interface, hdPath: string): KeyPair => {
	const privateKey: Buffer | undefined = masterKey.derivePath(hdPath).privateKey;

	if (!privateKey) {
		throw new Error("Failed to derive private key.");
	}

	return {
		privateKey,
		publicKey: secp256k1.publicKeyCreate(privateKey, true),
	};
};

const getCosmosAddress = (publicKey: Buffer, bech32Prefix: string): string => {
	const address: string = HashAlgorithms.ripemd160(HashAlgorithms.sha256(publicKey)).toString("hex");

	return bech32.encode(bech32Prefix, bech32.toWords(Buffer.from(address, "hex")));
};

export function getNewWalletFromSeed(
	mnemonic: string,
	bech32Prefix = "cosmos",
	hdPath = `m/44'/118'/0'/0/0`, // key controlling ATOM allocation
): Wallet {
	const masterKey = deriveMasterKey(mnemonic);
	const { privateKey, publicKey } = deriveKeypair(masterKey, hdPath);

	return {
		privateKey: privateKey.toString("hex"),
		publicKey: publicKey.toString("hex"),
		cosmosAddress: getCosmosAddress(publicKey, bech32Prefix),
	};
}

export const signWithPrivateKey = (signMessage: StdSignMsg | string, privateKey: Buffer): Buffer => {
	const message: string = typeof signMessage === "string" ? signMessage : JSON.stringify(signMessage);
	const hash: Buffer = HashAlgorithms.sha256(message);

	return secp256k1.sign(hash, privateKey);
};

export function verifySignature(signMessage: StdSignMsg | string, signature: Buffer, publicKey: Buffer): boolean {
	const message: string = typeof signMessage === "string" ? signMessage : JSON.stringify(signMessage);
	const hash: Buffer = HashAlgorithms.sha256(message);

	return secp256k1.verify(hash, signature, publicKey);
}
