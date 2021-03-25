import { Profile } from "../profiles/profile";

export interface IWalletService {
    syncAll(): Promise<void>;
    syncByProfile(profile: Profile): Promise<void>;
}
