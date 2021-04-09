import { IReadWriteWallet } from "../../wallets/wallet";

export interface IRegistrationAggregate {
	delegates(): IReadWriteWallet[];
}
