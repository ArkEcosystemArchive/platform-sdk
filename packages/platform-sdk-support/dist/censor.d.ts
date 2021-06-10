/**
 * A helper to determine if a value contains any censorship-worthy
 * terminology which should be removed to protect the user against
 * potential harm by clicking links that they should not be clicking.
 *
 * @export
 * @class Censor
 */
export declare class Censor {
	#private;
	/**
	 * A list of blacklisted terms that should not be contained within any given value.
	 *
	 * @private
	 * @memberof Censor
	 */
	private readonly blacklist;
	/**
	 * A list of short URL services that should not be contained within any given value.
	 *
	 * Taken from https://github.com/boutetnico/url-shorteners/blob/master/list.txt
	 *
	 * @private
	 * @memberof Censor
	 */
	private readonly shortUrls;
	/**
	 * Determines if the given value contains bad terminology which would indicate
	 * the need for further investigation, processing and eventual censorship.
	 *
	 * @param {string} value
	 * @returns {boolean}
	 * @memberof Censor
	 */
	isBad(value: string): boolean;
	/**
	 * Remove spam and bad terminology from the given value.
	 *
	 * @param {string} value
	 * @returns {string}
	 * @memberof Censor
	 */
	process(value: string): string;
}
