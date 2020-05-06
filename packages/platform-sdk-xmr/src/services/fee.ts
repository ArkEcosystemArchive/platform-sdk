import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class FeeService implements Contracts.FeeService {
	public static async construct(opts: Contracts.KeyValuePair): Promise<FeeService> {
		return new FeeService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async all(days: number): Promise<Contracts.TransactionFees> {
		throw new Exceptions.NotImplemented(this.constructor.name, "all");
	}
}
