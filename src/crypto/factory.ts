import { Ark, Bitcoin, Ethereum } from "./adapters";
import { Crypto } from "./contracts";

export class CryptoFactory {
	public static make(token: string, network: string): Crypto {
		return {
			ark: new Ark(network),
			btc: new Bitcoin(network),
			eth: new Ethereum(network),
		}[token];
	}
}
