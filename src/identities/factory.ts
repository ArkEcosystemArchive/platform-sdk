import { Ark, Bitcoin, Ethereum } from "./adapters";
import { Identity } from "./contracts";

export class IdentityFactory {
	public static make(token: string, network: string): Identity {
		return {
			ark: new Ark(network),
			btc: new Bitcoin(network),
			eth: new Ethereum(network),
		}[token];
	}
}
