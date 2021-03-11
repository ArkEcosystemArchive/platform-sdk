/**
 *
 *
 * @export
 * @interface MessageService
 */
export interface MessageService {
	/**
	 *
	 *
	 * @returns {Promise<void>}
	 * @memberof MessageService
	 */
	__destruct(): Promise<void>;

	/**
	 *
	 *
	 * @param {MessageInput} input
	 * @returns {Promise<SignedMessage>}
	 * @memberof MessageService
	 */
	sign(input: MessageInput): Promise<SignedMessage>;

	/**
	 *
	 *
	 * @param {SignedMessage} input
	 * @returns {Promise<boolean>}
	 * @memberof MessageService
	 */
	verify(input: SignedMessage): Promise<boolean>;
}

export interface SignedMessage {
	/**
	 *
	 *
	 * @type {string}
	 * @memberof SignedMessage
	 */
	message: string;
	/**
	 *
	 *
	 * @type {string}
	 * @memberof SignedMessage
	 */
	signatory: string;
	/**
	 *
	 *
	 * @type {string}
	 * @memberof SignedMessage
	 */
	signature: string;
	/**
	 *
	 *
	 * @type {string}
	 * @memberof SignedMessage
	 */
	mnemonic?: string;
}

export interface MessageInput {
	/**
	 *
	 *
	 * @type {string}
	 * @memberof MessageInput
	 */
	message: string;
	/**
	 *
	 *
	 * @type {string}
	 * @memberof MessageInput
	 */
	mnemonic: string;
}
