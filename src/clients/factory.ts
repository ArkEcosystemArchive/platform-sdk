import { Ark, Bitcoin, Ethereum } from "./adapters";
import { Client } from "./contracts";

export class ClientFactory {
	public static make(token: string): Client {
		return {
			ark: new Ark(),
			btc: new Bitcoin(),
			eth: new Ethereum(),
		}[token];
	}
}
