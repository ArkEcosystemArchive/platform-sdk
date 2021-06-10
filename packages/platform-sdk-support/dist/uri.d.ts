/**
 * An AIP13/26 compliant serialiser and deserialiser.
 *
 * @export
 * @class URI
 */
export declare class URI {
	#private;
	/**
	 * Creates an URI from the given input.
	 *
	 * @param {Record<string, string>} input
	 * @returns {string}
	 * @memberof URI
	 */
	serialize(input: Record<string, string | number>): string;
	/**
	 * Parses the given value according to AIP13/26 specifications and throws
	 * if it encounters any data or formats that are not known according to
	 * specifications.
	 *
	 * These should throw an error because we don't want to pass on data to
	 * the end-user that is unknown and could cause harm to the user and/or
	 * application which would be unable to handle the deserialised content.
	 *
	 * @param {string} data
	 * @returns {*}
	 * @memberof URI
	 */
	deserialize(data: string): any;
}
