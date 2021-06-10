/**
 * Launch the indexer and subscribe to updates for new data.
 *
 * @param {{
 * 	coin: string;
 * 	network: string;
 * 	rpc: string;
 * 	wss: string;
 * 	database: string;
 * }} flags
 * @returns {Promise<void>}
 */
export declare const subscribe: (flags: {
	coin: string;
	network: string;
	rpc: string;
	wss: string;
	database: string;
}) => Promise<void>;
