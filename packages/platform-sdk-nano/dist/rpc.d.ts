import { Coins } from "@arkecosystem/platform-sdk";
import { HttpClient } from "@arkecosystem/platform-sdk-http";
import { SignedBlock } from "nanocurrency-web/dist/lib/block-signer";
interface AccountInfoResponse {
	frontier: string;
	open_block: string;
	representative_block: string;
	balance: string;
	modified_timestamp: string;
	block_count: string;
	account_version: string;
	confirmation_height: string;
	confirmation_height_frontier: string;
	representative: string;
	pending: string;
}
interface AccountHistory {
	type: string;
	account: string;
	amount: string;
	local_timestamp: string;
	height: string;
	hash: string;
}
interface AccountHistoryResponse {
	account: string;
	history: AccountHistory[];
	previous: string;
}
export declare class NanoClient {
	#private;
	constructor(config: Coins.ConfigRepository, httpClient: HttpClient);
	accountBalance(
		account: string,
	): Promise<{
		balance: string;
		pending: string;
	}>;
	accountInfo(
		account: string,
		options?: {
			representative?: boolean;
			pending?: boolean;
		},
	): Promise<AccountInfoResponse>;
	accountHistory(
		account: string,
		count: string,
		options?: {
			head?: string | number;
		},
	): Promise<AccountHistoryResponse>;
	process(
		subtype: "send" | "receive" | "open" | "change" | "epoch",
		block: SignedBlock,
	): Promise<{
		hash: string;
	}>;
}
export {};
