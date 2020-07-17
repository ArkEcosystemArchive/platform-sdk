import { PrivateKey, PublicKey, Signature } from "eosjs/dist/eosjs-jssig";

export const privateToPublic = (key: string, pubkey_prefix?: string): string => {
	if (pubkey_prefix !== undefined) {
		console.warn(
			"Argument `pubkey_prefix` is deprecated, " + "keys prefixed with PUB_K1_/PUB_R1_/PUB_WA_ going forward",
		);
	}

	const privateKey = PrivateKey.fromString(key);
	const publicKey = privateKey.getPublicKey();

	return publicKey.toLegacyString();
};

export const sign = (data: string, privateKey: string): string =>
	PrivateKey.fromString(privateKey).sign(data, true, "utf8").toString();

export const verify = (signature: string, data: string, publicKey: string): boolean =>
	Signature.fromString(signature).verify(data, PublicKey.fromString(publicKey), true, "utf8");
