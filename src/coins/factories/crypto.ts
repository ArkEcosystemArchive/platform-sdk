import { Ark } from "../ark/crypto";
import { Bitcoin } from "../btc/crypto";
import { Crypto } from "../contracts/crypto";
import { Ethereum } from "../eth/crypto";

export class CryptoFactory {
	public static make(token: string, network: string): Crypto {
		return {
			ark: new Ark(network),
			btc: new Bitcoin(network),
			eth: new Ethereum(network),
		}[token];
	}
}
