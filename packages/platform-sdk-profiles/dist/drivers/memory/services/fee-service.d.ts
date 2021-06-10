import { Services } from "@arkecosystem/platform-sdk";
import { IFeeService, IProfile } from "../../../contracts";
export declare class FeeService implements IFeeService {
	#private;
	/** {@inheritDoc IFeeService.all} */
	all(coin: string, network: string): Services.TransactionFees;
	/** {@inheritDoc IFeeService.findByType} */
	findByType(coin: string, network: string, type: string): Services.TransactionFee;
	/** {@inheritDoc IFeeService.sync} */
	sync(profile: IProfile, coin: string, network: string): Promise<void>;
	/** {@inheritDoc IFeeService.syncAll} */
	syncAll(profile: IProfile): Promise<void>;
}
