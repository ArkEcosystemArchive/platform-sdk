import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { constants } from "@liskhq/lisk-transactions";

export class FeeService implements Contracts.FeeService {
	readonly #network;

	private constructor(network: Coins.NetworkManifest) {
		this.#network = network.meta.networkId;
	}

	public static async __construct(config: Coins.Config): Promise<FeeService> {
		return new FeeService(config.get<Coins.NetworkManifest>("network"));
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async all(): Promise<Contracts.TransactionFees> {
		return {
			// Core
			transfer: this.transform("TRANSFER_FEE"),
			secondSignature: this.transform("SIGNATURE_FEE"),
			delegateRegistration: this.transform("DELEGATE_FEE"),
			vote: this.transform("VOTE_FEE"),
			multiSignature: this.transform("MULTISIGNATURE_FEE"),
			ipfs: this.transform(0),
			multiPayment: this.transform(0),
			delegateResignation: this.transform(0),
			htlcLock: this.transform(0),
			htlcClaim: this.transform(0),
			htlcRefund: this.transform(0),
		};
	}

	private transform(type: string | number): Contracts.TransactionFee {
		const fee: number = type === 0 ? 0 : constants[type];

		return {
			static: `${fee}`,
			max: `${fee}`,
			min: `${fee}`,
			avg: `${fee}`,
		};
	}
}
