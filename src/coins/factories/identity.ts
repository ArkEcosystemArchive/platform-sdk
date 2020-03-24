import { Ark } from "../ark/identity";
import { Bitcoin } from "../btc/identity";
import { Identity } from "../contracts/identity";
import { Ethereum } from "../eth/identity";

export class IdentityFactory {
	public static make(token: string, network: string): Identity {
		return {
			ark: new Ark(network),
			btc: new Bitcoin(network),
			eth: new Ethereum(network),
		}[token];
	}
}
