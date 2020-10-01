import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import * as transactions from "@liskhq/lisk-transactions";
import * as transactionsBeta from "@liskhq/lisk-transactions-new";

import { manifest } from "../manifest";

export class FeeService implements Contracts.FeeService {
	readonly #network;

	private constructor(network: Coins.CoinNetwork) {
		this.#network = network.crypto.networkId;
	}

	public static async construct(config: Coins.Config): Promise<FeeService> {
		return new FeeService(config.get<Coins.CoinNetwork>("network"));
	}

	public async destruct(): Promise<void> {
		//
	}

	public async all(days: number): Promise<Contracts.TransactionFees> {
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
			// Magistrate
			entityRegistration: this.transform(0),
			entityResignation: this.transform(0),
			entityUpdate: this.transform(0),
		};
	}

	private transform(type: string | number): Contracts.TransactionFee {
		const fee: number = type === 0 ? 0 : transactions.constants[type];

		if (this.#network === manifest.networks.betanet.crypto.networkId) {
			fee = transactionsBeta.constants[type];
		}

		return {
			static: `${fee}`,
			max: `${fee}`,
			min: `${fee}`,
			avg: `${fee}`,
		};
	}
}
