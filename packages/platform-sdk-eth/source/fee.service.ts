import { IoC, Services } from "@arkecosystem/platform-sdk";

@IoC.injectable()
export class FeeService extends Services.AbstractFeeService {
	public override async all(): Promise<Services.TransactionFees> {
		const { slow, normal, fast, instant } = (await this.httpClient.get("https://ethgas.watch/api/gas")).json();

		const fees = {
			static: instant.gwei.toString(),
			min: slow.gwei.toString(),
			avg: normal.gwei.toString(),
			max: fast.gwei.toString(),
		};

		return {
			transfer: fees,
			secondSignature: fees,
			delegateRegistration: fees,
			vote: fees,
			multiSignature: fees,
			ipfs: fees,
			multiPayment: fees,
			delegateResignation: fees,
			htlcLock: fees,
			htlcClaim: fees,
			htlcRefund: fees,
		};
	}
}
