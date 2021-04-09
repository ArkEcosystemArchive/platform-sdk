import { IProfile } from "../profiles/profile";

export interface IWalletService {
	syncAll(): Promise<void>;
	syncByProfile(profile: IProfile): Promise<void>;
}
