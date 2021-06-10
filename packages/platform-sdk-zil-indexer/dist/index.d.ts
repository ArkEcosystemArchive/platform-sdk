/**
 * Launch the indexer and subscribe to updates for new data.
 *
 * @param {{
 * 	network: string;
 * 	host: string;
 * 	database: string;
 * }} flags
 * @returns {Promise<void>}
 */
export declare const subscribe: (flags: { network: string; host: string; database: string }) => Promise<void>;
