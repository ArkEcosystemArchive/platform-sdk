import { IoC, Services } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { constants } from "@liskhq/lisk-transactions";

@IoC.injectable()
export class FeeService extends Services.AbstractFeeService {
	@IoC.inject(IoC.BindingType.BigNumberService)
	protected readonly bigNumberService!: Services.BigNumberService;

	public override async all(): Promise<Services.TransactionFees> {
		return {
			transfer: this.#transform("TRANSFER_FEE"),
			secondSignature: this.#transform("SIGNATURE_FEE"),
			delegateRegistration: this.#transform("DELEGATE_FEE"),
			vote: this.#transform("VOTE_FEE"),
			multiSignature: this.#transform("MULTISIGNATURE_FEE"),
			ipfs: this.#transform(0),
			multiPayment: this.#transform(0),
			delegateResignation: this.#transform(0),
			htlcLock: this.#transform(0),
			htlcClaim: this.#transform(0),
			htlcRefund: this.#transform(0),
		};
	}

	#transform(type: string | number): Services.TransactionFee {
		const fee: BigNumber = this.bigNumberService.make(type === 0 ? 0 : constants[type]);

		return {
			static: fee,
			max: fee,
			min: fee,
			avg: fee,
		};
	}
}
