import { expose } from "threads/worker";
import { decrypt } from "bip38";
import { IReadWriteWallet, WalletData } from "../../../contracts";

expose({
	decryptWIF(wallet: IReadWriteWallet, password: string) {
		const encryptedKey: string | undefined = wallet.data().get(WalletData.Bip38EncryptedKey);

		if (encryptedKey === undefined) {
			throw new Error("This wallet does not use BIP38 encryption.");
		}

		return wallet.coin().identity().wif().fromPrivateKey(decrypt(encryptedKey, password).privateKey.toString("hex"));
	},
});
