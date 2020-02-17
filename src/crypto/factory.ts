import { Ark, Bitcoin, Ethereum } from "./adapters";
import { Crypto } from "./contracts";

export class CryptoFactory {
	public static make(token: string): Crypto {
		return {
			ark: new Ark(),
			btc: new Bitcoin(),
			eth: new Ethereum(),
		}[token];
	}
}
