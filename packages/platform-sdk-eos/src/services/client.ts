import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";
import { Api, JsonRpc } from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";
import fetch from "node-fetch";
import { TextDecoder, TextEncoder } from "util";

import { WalletData } from "../dto";

export class ClientService implements Contracts.ClientService {
	readonly #rpc: JsonRpc;
	readonly #api: Api;

	private constructor(peer: string) {
		this.#rpc = new JsonRpc(peer, { fetch });

		this.#api = new Api({
			rpc: this.#rpc,
			signatureProvider: new JsSignatureProvider([]),
			// @ts-ignore - this started to error out of nowhere when building
			textDecoder: new TextDecoder(),
			// @ts-ignore - this started to error out of nowhere when building
			textEncoder: new TextEncoder(),
		});
	}

	public static async __construct(config: Coins.Config): Promise<ClientService> {
		try {
			return new ClientService(config.get<string>("peer"));
		} catch {
			return new ClientService(Arr.randomElement(config.get<string[]>("network.networking.hosts")));
		}
	}

	public async __destruct(): Promise<void> {
		//
	}

	// https://developers.eos.io/manuals/eosjs/latest/how-to-guides/how-to-get-transaction-information
	public async transaction(
		id: string,
		input?: Contracts.TransactionDetailInput,
	): Promise<Contracts.TransactionDataType> {
		throw new Exceptions.NotImplemented(this.constructor.name, "transaction");
	}

	// https://developers.eos.io/manuals/eosjs/latest/how-to-guides/how-to-get-table-information
	public async transactions(query: Contracts.ClientTransactionsInput): Promise<Coins.TransactionDataCollection> {
		throw new Exceptions.NotImplemented(this.constructor.name, "transactions");
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		return new WalletData(await this.#rpc.get_account(id));
	}

	public async wallets(query: Contracts.ClientWalletsInput): Promise<Coins.WalletDataCollection> {
		throw new Exceptions.NotImplemented(this.constructor.name, "wallets");
	}

	public async delegate(id: string): Promise<Contracts.WalletData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegate");
	}

	public async delegates(query?: Contracts.KeyValuePair): Promise<Coins.WalletDataCollection> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegates");
	}

	public async votes(id: string): Promise<Contracts.VoteReport> {
		throw new Exceptions.NotImplemented(this.constructor.name, "votes");
	}

	public async voters(id: string, query?: Contracts.KeyValuePair): Promise<Coins.WalletDataCollection> {
		throw new Exceptions.NotImplemented(this.constructor.name, "voters");
	}

	public async syncing(): Promise<boolean> {
		throw new Exceptions.NotImplemented(this.constructor.name, "syncing");
	}

	// https://developers.eos.io/manuals/eosjs/latest/how-to-guides/how-to-transfer-an-eosio-token
	public async broadcast(transactions: Contracts.SignedTransactionData[]): Promise<Contracts.BroadcastResponse> {
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

		throw new Exceptions.NotImplemented(this.constructor.name, "broadcast");
	}
}
