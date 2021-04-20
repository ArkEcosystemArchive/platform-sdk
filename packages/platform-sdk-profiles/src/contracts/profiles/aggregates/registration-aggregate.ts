import { IReadWriteWallet } from "../../wallets/wallet";

/**
 * Defines the implementation contract for the registration aggregate.
 *
 * @export
 * @interface IRegistrationAggregate
 */
export interface IRegistrationAggregate {
	/**
	 * Aggregate all wallets that are delegates and synchronised.
	 *
	 * @return {*}  {IReadWriteWallet[]}
	 * @memberof IRegistrationAggregate
	 */
	delegates(): IReadWriteWallet[];
}
