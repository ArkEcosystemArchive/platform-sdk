import { ReadWriteWallet } from "../../wallets/wallet";

export interface IRegistrationAggregate {
    delegates(): ReadWriteWallet[];
}
