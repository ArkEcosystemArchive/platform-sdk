import { IReadOnlyWallet } from "../read-only-wallet";

export interface IVoteRegistry {
	/**
	 * Get all wallets the wallet is voting for.
	 *
	 * @return {IReadOnlyWallet[]}
	 * @memberof IReadWriteWallet
	 */
	 current(): IReadOnlyWallet[];

	 /**
	  * Get the number of votes that remain to be casted.
	  *
	  * @return {number}
	  * @memberof IReadWriteWallet
	  */
	 available(): number;

	 /**
	  * Get the number of votes that have been casted.
	  *
	  * @return {number}
	  * @memberof IReadWriteWallet
	  */
	 used(): number;
}
