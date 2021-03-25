import { ReadWriteWallet } from "../../wallets/wallet.models";
import { ProfileContract } from "../profile.models";

export interface IRegistrationAggregate {
    delegates(): ReadWriteWallet[];
}
