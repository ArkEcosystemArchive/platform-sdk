import { Coins, Contracts, Helpers, IoC, Services } from "@arkecosystem/platform-sdk";

@IoC.injectable()
export class FeeService extends Services.AbstractFeeService {
	@IoC.inject(IoC.BindingType.ConfigRepository)
	private readonly configRepository!: Coins.ConfigRepository;

	@IoC.inject(IoC.BindingType.BigNumberService)
	private readonly bigNumberService!: Services.BigNumberService;

	public override async all(): Promise<Services.TransactionFees> {
		const node = await this.#get("node/fees");
		const type = await this.#get("transactions/fees");

		const staticFees: object = type.data;
		const dynamicFees: object = node.data;

		return {
			transfer: this.#transform("transfer", 1, staticFees, dynamicFees),
			secondSignature: this.#transform("secondSignature", 1, staticFees, dynamicFees),
			delegateRegistration: this.#transform("delegateRegistration", 1, staticFees, dynamicFees),
			vote: this.#transform("vote", 1, staticFees, dynamicFees),
			multiSignature: this.#transform("multiSignature", 1, staticFees, dynamicFees),
			ipfs: this.#transform("ipfs", 1, staticFees, dynamicFees),
			multiPayment: this.#transform("multiPayment", 1, staticFees, dynamicFees),
			delegateResignation: this.#transform("delegateResignation", 1, staticFees, dynamicFees),
			htlcLock: this.#transform("htlcLock", 1, staticFees, dynamicFees),
			htlcClaim: this.#transform("htlcClaim", 1, staticFees, dynamicFees),
			htlcRefund: this.#transform("htlcRefund", 1, staticFees, dynamicFees),
		};
	}

	#transform(type: string, typeGroup: number, staticFees: object, dynamicFees: object): Services.TransactionFee {
		const dynamicFee = dynamicFees[typeGroup][type];
		let minimumFee = this.bigNumberService.make(dynamicFee?.min || "0");
		let averageFee = this.bigNumberService.make(dynamicFee?.avg || "0");
		const maximumFee = this.bigNumberService.make(staticFees[typeGroup][type]);

		if (type === "multiPayment") {
			minimumFee = maximumFee;
			averageFee = maximumFee;
		}

		return {
			static: maximumFee,
			min: minimumFee.isGreaterThan(maximumFee) ? maximumFee : minimumFee,
			avg: averageFee.isGreaterThan(maximumFee) ? maximumFee : averageFee,
			max: maximumFee,
		};
	}

	async #get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return (
			await this.httpClient.get(`${Helpers.randomHostFromConfig(this.configRepository)}/${path}`, query)
		).json();
	}
}
