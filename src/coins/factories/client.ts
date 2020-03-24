import { Ark } from "../ark/client";
import { Bitcoin } from "../btc/client";
import { Client } from "../contracts/client";
import { Ethereum } from "../eth/client";

export class ClientFactory {
	public static make(token: string, peer: string): Client {
		return {
			ark: new Ark(peer),
			btc: new Bitcoin(peer),
			eth: new Ethereum(peer),
		}[token];
	}
}
