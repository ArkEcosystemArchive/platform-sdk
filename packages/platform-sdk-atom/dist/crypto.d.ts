import { DateTime } from "@arkecosystem/platform-sdk-intl";
export declare const createSignedTransactionData: (
	stdSignMsg: any,
	keyPair: any,
) => {
	msg: any;
	fee: any;
	signatures: {
		signature: any;
		account_number: any;
		sequence: any;
		pub_key: {
			type: string;
			value: string;
		};
	}[];
	memo: any;
	timestamp: DateTime;
};
