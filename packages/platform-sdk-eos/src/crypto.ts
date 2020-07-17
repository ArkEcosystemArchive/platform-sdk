import { PrivateKey, PublicKey, Signature } from "eosjs/dist/eosjs-jssig";

export const privateToPublic = (mnemonic: string): string =>
	PrivateKey.fromString(mnemonic).getPublicKey().toLegacyString();

export const sign = (data: string, privateKey: string): string =>
	PrivateKey.fromString(privateKey).sign(data, true, "utf8").toString();

export const verify = (signature: string, data: string, publicKey: string): boolean =>
	Signature.fromString(signature).verify(data, PublicKey.fromString(publicKey), true, "utf8");
