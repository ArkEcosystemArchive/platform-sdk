import { Contracts, Exceptions, Utils } from "@arkecosystem/platform-sdk";

import { TransactionData, WalletData } from "../dto";

export class ClientService implements Contracts.ClientService {
	static readonly MONTH_IN_SECONDS = 8640 * 30;

	readonly #peer: string;

	private constructor(peer: string) {
		this.#peer = peer;
	}

	public static async construct(opts: Contracts.KeyValuePair): Promise<ClientService> {
		return new ClientService(opts.peer);
	}

	public async destruct(): Promise<void> {
		//
	}

	public async transaction(id: string): Promise<Contracts.TransactionData> {
		return new TransactionData(await this.get(`transactions/${id}`));
	}

	public async transactions(
		query: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Contracts.TransactionData>> {
		const endBlock: number = (await this.get("status")).height;
		const startBlock: number = endBlock - (query?.count ?? ClientService.MONTH_IN_SECONDS);

		const transactions: TransactionData[] = [];
		for (let i = startBlock; i < endBlock; i++) {
			const block = await this.get(`blocks/${i}`);

			if (block && block.transactions) {
				for (const transaction of block.transactions) {
					if (
						query?.address === "*" ||
						query?.address === transaction.from ||
						query?.address === transaction.to
					) {
						transactions.push(new TransactionData(transaction));
					}
				}
			}
		}

		return { meta: {}, data: transactions };
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		return new WalletData(await this.get(`wallets/${id}`));
	}

	public async wallets(query: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Contracts.WalletData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "wallets");
	}

	public async delegate(id: string): Promise<Contracts.DelegateData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegate");
	}

	public async delegates(
		query?: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Contracts.DelegateData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegates");
	}

	public async votes(id: string): Promise<Contracts.CollectionResponse<Contracts.TransactionData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "votes");
	}

	public async voters(id: string): Promise<Contracts.CollectionResponse<Contracts.WalletData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "voters");
	}

	public async syncing(): Promise<boolean> {
		return (await this.get("status")).syncing === false;
	}

	public async broadcast(transactions: object[]): Promise<Contracts.BroadcastResponse> {
		await this.post("transactions", { transactions });

		// ErrOutOfGas = errors.New("out of gas");
		// ErrCodeStoreOutOfGas = errors.New("contract creation code storage out of gas");
		// ErrDepth = errors.New("max call depth exceeded");
		// ErrInsufficientBalance = errors.New("insufficient balance for transfer");
		// ErrContractAddressCollision = errors.New("contract address collision");
		// ErrExecutionReverted = errors.New("execution reverted");
		// ErrMaxCodeSizeExceeded = errors.New("max code size exceeded");
		// ErrInvalidJump = errors.New("invalid jump destination");
		// ErrWriteProtection = errors.New("write protection");
		// ErrReturnDataOutOfBounds = errors.New("return data out of bounds");
		// ErrGasUintOverflow = errors.New("gas uint64 overflow");
	}

	private async get(path: string, query: Contracts.KeyValuePair = {}): Promise<Contracts.KeyValuePair> {
		return Utils.getJSON(`${this.#peer}/${path}`, query);
	}

	private async post(path: string, body: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return Utils.postJSON(`${this.#peer}/`, path, body);
	}
}
