import { ArkClient, BtcClient, Client, EthClient } from "./clients";

export class ClientFactory {
	public static make(token: string): Client {
		return {
			ark: new ArkClient(),
			btc: new BtcClient(),
			eth: new EthClient(),
		}[token];
	}
}
