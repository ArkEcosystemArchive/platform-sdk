import { IProfile, IWalletService } from "../../../contracts";
export declare class WalletService implements IWalletService {
	/** {@inheritDoc IWalletService.syncByProfile} */
	syncByProfile(profile: IProfile): Promise<void>;
}
