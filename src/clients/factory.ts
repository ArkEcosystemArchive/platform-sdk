import { Ark, Bitcoin, Ethereum } from "./adapters";
import { Client } from "./contracts";

export class ClientFactory {
	public static make(token: string, peer: string): Client {
		return {
			ark: new Ark(peer),
			btc: new Bitcoin(peer),
			eth: new Ethereum(peer),
		}[token];
	}
}
