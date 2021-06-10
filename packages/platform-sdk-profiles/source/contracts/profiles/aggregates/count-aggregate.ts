/**
 * Defines the implementation contract for the count aggregate.
 *
 * @export
 * @interface ICountAggregate
 */
export interface ICountAggregate {
	/**
	 * Count how many contacts there are in the current profile.
	 *
	 * @return {number}
	 * @memberof ICountAggregate
	 */
	contacts(): number;

	/**
	 * Count how many notifications there are in the current profile.
	 *
	 * @return {number}
	 * @memberof ICountAggregate
	 */
	notifications(): number;

	/**
	 * Count how many wallets there are in the current profile.
	 *
	 * @return {number}
	 * @memberof ICountAggregate
	 */
	wallets(): number;
}
