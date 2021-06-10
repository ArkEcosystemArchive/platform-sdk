import { HttpClient } from "@arkecosystem/platform-sdk-http";
import { FeeService, TransactionFees } from "./fee.contract";
export declare class AbstractFeeService implements FeeService {
	protected readonly httpClient: HttpClient;
	all(): Promise<TransactionFees>;
}
