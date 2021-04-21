/**
 * Defines the implementation contract for the wallet authorisation gate.
 *
 * @export
 * @interface IWalletGate
 */
export interface IWalletGate {
	/**
	 * Determine if the wallet can vote.
	 *
	 * @return {*}  {boolean}
	 * @memberof IReadWriteWallet
	 */
	canVote(): boolean;

	/**
	 * Determine if the wallet can perform the given action.
	 *
	 * @param {string} feature
	 * @return {*}  {boolean}
	 * @memberof IReadWriteWallet
	 */
	can(feature: string): boolean;

	/**
	 * Determine if the wallet can perform any of the given actions.
	 *
	 * @param {string[]} features
	 * @return {*}  {boolean}
	 * @memberof IReadWriteWallet
	 */
	canAny(features: string[]): boolean;

	/**
	 * Determine if the wallet can perform all of the given actions.
	 *
	 * @param {string[]} features
	 * @return {*}  {boolean}
	 * @memberof IReadWriteWallet
	 */
	canAll(features: string[]): boolean;

	/**
	 * Determine if the wallet cannot perform the given action.
	 *
	 * @param {string} feature
	 * @return {*}  {boolean}
	 * @memberof IReadWriteWallet
	 */
	cannot(feature: string): boolean;
}
