/**
 *
 *
 * @export
 * @interface LinkService
 */
export interface LinkService {
	/**
	 *
	 *
	 * @returns {Promise<void>}
	 * @memberof LinkService
	 */
	__destruct(): Promise<void>;

	/**
	 *
	 *
	 * @param {string} id
	 * @returns {string}
	 * @memberof LinkService
	 */
	block(id: string): string;

	/**
	 *
	 *
	 * @param {string} id
	 * @returns {string}
	 * @memberof LinkService
	 */
	transaction(id: string): string;

	/**
	 *
	 *
	 * @param {string} id
	 * @returns {string}
	 * @memberof LinkService
	 */
	wallet(id: string): string;
}
