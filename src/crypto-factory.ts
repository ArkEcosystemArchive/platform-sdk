import { ArkCrypto, BtcCrypto, Crypto, EthCrypto } from "./crypto";

export class CryptoFactory {
	public static make(token: string): Crypto {
		return {
			ark: new ArkCrypto(),
			btc: new BtcCrypto(),
			eth: new EthCrypto(),
		}[token];
	}
}
