import { Services } from "@arkecosystem/platform-sdk";
export declare class FeeService extends Services.AbstractFeeService {
	#private;
	private readonly configRepository;
	private readonly bigNumberService;
	all(): Promise<Services.TransactionFees>;
}
