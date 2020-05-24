import { Connection } from "@arkecosystem/client";
import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";

export class FeeService implements Contracts.FeeService {
	readonly #connection: Connection;

	private constructor(peer: string) {
		this.#connection = new Connection(peer);
	}

	public static async construct(config: Coins.Config): Promise<FeeService> {
		try {
			return new FeeService(config.get<string>("peer"));
		} catch {
			return new FeeService(`${Arr.randomElement(config.get<Coins.CoinNetwork>("network").hosts)}/api`);
		}
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
			// Core
			transfer: this.transform("transfer", 1, staticFees, dynamicFees),
			secondSignature: this.transform("secondSignature", 1, staticFees, dynamicFees),
			delegateRegistration: this.transform("delegateRegistration", 1, staticFees, dynamicFees),
			vote: this.transform("vote", 1, staticFees, dynamicFees),
			multiSignature: this.transform("multiSignature", 1, staticFees, dynamicFees),
			ipfs: this.transform("ipfs", 1, staticFees, dynamicFees),
			multiPayment: this.transform("multiPayment", 1, staticFees, dynamicFees),
			delegateResignation: this.transform("delegateResignation", 1, staticFees, dynamicFees),
			htlcLock: this.transform("htlcLock", 1, staticFees, dynamicFees),
			htlcClaim: this.transform("htlcClaim", 1, staticFees, dynamicFees),
			htlcRefund: this.transform("htlcRefund", 1, staticFees, dynamicFees),
			// Magistrate
			businessRegistration: this.transform("businessRegistration", 2, staticFees, dynamicFees),
			businessResignation: this.transform("businessResignation", 2, staticFees, dynamicFees),
			businessUpdate: this.transform("businessUpdate", 2, staticFees, dynamicFees),
			bridgechainRegistration: this.transform("bridgechainRegistration", 2, staticFees, dynamicFees),
			bridgechainResignation: this.transform("bridgechainResignation", 2, staticFees, dynamicFees),
			bridgechainUpdate: this.transform("bridgechainUpdate", 2, staticFees, dynamicFees),
		};
	}

	private transform(
		type: string,
		typeGroup: number,
		staticFees: object,
		dynamicFees: object,
	): Contracts.TransactionFee {
		const dynamicFee = dynamicFees[typeGroup][type];

		return {
			static: staticFees[typeGroup][type],
			max: dynamicFee ? dynamicFee.max : 0,
			min: dynamicFee ? dynamicFee.min : 0,
			avg: dynamicFee ? dynamicFee.avg : 0,
		};
	}
}
