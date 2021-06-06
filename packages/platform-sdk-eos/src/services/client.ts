import { Coins, Contracts, Exceptions, Helpers, IoC, Services } from "@arkecosystem/platform-sdk";
import { Api, JsonRpc } from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";
import fetch from "node-fetch";
import { TextDecoder, TextEncoder } from "util";

import { WalletData } from "../dto";

@IoC.injectable()
export class ClientService extends Services.AbstractClientService {
	#rpc!: JsonRpc;
	#api!: Api;

	@IoC.postConstruct()
	private onPostConstruct(): void {
		this.#rpc = new JsonRpc(Helpers.randomHostFromConfig(this.configRepository), { fetch });

		this.#api = new Api({
			rpc: this.#rpc,
			signatureProvider: new JsSignatureProvider([]),
			// @ts-ignore - this started to error out of nowhere when building
			textDecoder: new TextDecoder(),
			// @ts-ignore - this started to error out of nowhere when building
			textEncoder: new TextEncoder(),
		});
	}

	// https://developers.eos.io/manuals/eosjs/latest/how-to-guides/how-to-get-transaction-information

	// https://developers.eos.io/manuals/eosjs/latest/how-to-guides/how-to-get-table-information

	public async wallet(id: string): Promise<Contracts.WalletData> {
		return new WalletData(await this.#rpc.get_account(id));
	}

	// https://developers.eos.io/manuals/eosjs/latest/how-to-guides/how-to-transfer-an-eosio-token
	public async broadcast(transactions: Contracts.SignedTransactionData[]): Promise<Services.BroadcastResponse> {
		const result = await this.#api.transact(
			{
				actions: [
					{
						account: "eosio.token",
						name: "transfer",
						authorization: [
							{
								actor: "bdfkbzietxos",
								permission: "active",
							},
						],
						data: {
							from: "bdfkbzietxos",
							to: "zqcetsxfxzca",
							quantity: "0.0001 TNT",
							memo: "Hello World",
						},
					},
				],
			},
			{
				blocksBehind: 3,
				expireSeconds: 30,
			},
		);

		throw new Exceptions.NotImplemented(this.constructor.name, this.broadcast.name);
	}
}
