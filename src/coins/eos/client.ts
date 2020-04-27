import { Api, JsonRpc, RpcError } from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";
import fetch from "node-fetch";
import { TextEncoder, TextDecoder } from "util";

import { NotImplemented } from "../../exceptions";

export class EOS {
	readonly #baseUrl: string;

	public constructor(peer: string) {
		this.#baseUrl = peer;
	}

	public async postTransactions(transactions: object[]): Promise<any> {
		const defaultPrivateKey = process.env.EOS_PRIVATE_KEY;
		const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);

		const rpc = new JsonRpc("https://api.testnet.eos.io", { fetch });

		const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

		const result = await api.transact(
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
		console.dir(result);

		throw new NotImplemented(this.constructor.name, "postTransactions");
	}
}
