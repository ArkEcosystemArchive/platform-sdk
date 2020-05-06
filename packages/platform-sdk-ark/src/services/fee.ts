import { Connection } from "@arkecosystem/client";
import { Contracts } from "@arkecosystem/platform-sdk";

export class FeeService implements Contracts.FeeService {
	readonly #connection: Connection;

	private constructor(peer: string) {
		this.#connection = new Connection(peer);
	}

	public static async construct(opts: Contracts.KeyValuePair): Promise<FeeService> {
		return new FeeService(opts.peer);
	}

	public async destruct(): Promise<void> {
		//
	}

	public async all(days: number): Promise<Contracts.TransactionFees> {
		const node = await this.#connection.api("node").fees(days);
		const type = await this.#connection.api("transactions").fees();

		const staticFees: object = type.body.data;
		const dynamicFees: object = node.body.data;

		return {
			transfer: this.transform("transfer", staticFees, dynamicFees),
			secondSignature: this.transform("secondSignature", staticFees, dynamicFees),
			delegateRegistration: this.transform("delegateRegistration", staticFees, dynamicFees),
			vote: this.transform("vote", staticFees, dynamicFees),
			multiSignature: this.transform("multiSignature", staticFees, dynamicFees),
			ipfs: this.transform("ipfs", staticFees, dynamicFees),
			multiPayment: this.transform("multiPayment", staticFees, dynamicFees),
			delegateResignation: this.transform("delegateResignation", staticFees, dynamicFees),
			htlcLock: this.transform("htlcLock", staticFees, dynamicFees),
			htlcClaim: this.transform("htlcClaim", staticFees, dynamicFees),
			htlcRefund: this.transform("htlcRefund", staticFees, dynamicFees),
		};
	}

	private transform(type: string, staticFees: object, dynamicFees: object): Contracts.TransactionFee {
		const dynamicFee = dynamicFees["1"][type];

		return {
			static: staticFees["1"][type],
			max: dynamicFee ? dynamicFee.max : 0,
			min: dynamicFee ? dynamicFee.min : 0,
			avg: dynamicFee ? dynamicFee.avg : 0,
		};
	}
}
