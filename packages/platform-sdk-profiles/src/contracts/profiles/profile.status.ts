/**
 * Defines the implementation contract for the profile status service.
 *
 * @export
 * @interface IProfileStatus
 */
export interface IProfileStatus {
	/**
	 * Mark profile as restored
	 *
	 * @memberof IProfileStatus
	 */
	markAsRestored(): void;

	/**
	 * Verify the restore status for the currently selected profile.
	 *
	 * @return {boolean}
	 * @memberof IProfileStatus
	 */
	isRestored(): boolean;

	/**
	 * Reset profile statuses to default values
	 *
	 * @memberof IProfileStatus
	 */
	reset(): void;
}
