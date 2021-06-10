import {
	CoinManifest,
	ExpirationType,
	FeeType,
	NetworkManifest,
	NetworkManifestImportMethods,
	NetworkManifestToken,
} from "./network.models";
export declare class Network {
	#private;
	/**
	 * Create a new Network instance.
	 *
	 * @param {string} coin
	 * @param {NetworkManifest} network
	 * @memberof Network
	 */
	constructor(coin: CoinManifest, network: NetworkManifest);
	/**
	 * Get the parent coin of the network.
	 */
	coin(): string;
	/**
	 * Get the coin of the network.
	 */
	coinName(): string;
	/**
	 * Get the ID of the network.
	 */
	id(): string;
	/**
	 * Get the name of the network.
	 */
	name(): string;
	/**
	 * Get the explorer URL of the coin that is used.
	 */
	explorer(): string;
	/**
	 * Get the ticker of the coin that is used.
	 */
	ticker(): string;
	/**
	 * Get the symbol of the coin that is used.
	 */
	symbol(): string;
	/**
	 * Determine if this is a production network.
	 */
	isLive(): boolean;
	/**
	 * Determine if this is a development network.
	 */
	isTest(): boolean;
	/**
	 * Get the expiration method type.
	 */
	expirationType(): ExpirationType;
	/**
	 * Determine if voting is supported on this network.
	 */
	allowsVoting(): boolean;
	/**
	 * Get the number of delegates that forge blocks.
	 */
	delegateCount(): number;
	/**
	 * Get the maximum number of votes per wallet.
	 */
	maximumVotesPerWallet(): number;
	/**
	 * Get the maximum number of votes per transaction.
	 */
	maximumVotesPerTransaction(): number;
	/**
	 * Determine if the network uses an extended public key for derivation.
	 */
	usesExtendedPublicKey(): boolean;
	/**
	 * Determine if the given feature is enabled.
	 *
	 * @param feature
	 */
	allows(feature: string): boolean;
	/**
	 * Determine if the given feature is disabled.
	 *
	 * @param feature
	 */
	denies(feature: string): boolean;
	/**
	 * Determines if the network charges static fees.
	 *
	 * @return {*}  {boolean}
	 * @memberof Network
	 */
	chargesStaticFees(): boolean;
	/**
	 * Determines if the network charges dynamic fees.
	 *
	 * @return {*}  {boolean}
	 * @memberof Network
	 */
	chargesDynamicFees(): boolean;
	/**
	 * Determines if the network charges gas fees.
	 *
	 * @return {*}  {boolean}
	 * @memberof Network
	 */
	chargesGasFees(): boolean;
	/**
	 * Determines if the network charges weight fees.
	 *
	 * @return {*}  {boolean}
	 * @memberof Network
	 */
	chargesWeightFees(): boolean;
	/**
	 * Determines if the network charges zero fees.
	 *
	 * @return {*}  {boolean}
	 * @memberof Network
	 */
	chargesZeroFees(): boolean;
	/**
	 * Returns the available import methods for the network.
	 *
	 * @return {*}  {NetworkManifestImportMethods}
	 * @memberof Network
	 */
	importMethods(): NetworkManifestImportMethods;
	/**
	 * Returns the meta data of the network.
	 *
	 * @return {*}  {Record<string, any>}
	 * @memberof Network
	 */
	meta(): Record<string, any>;
	/**
	 * Returns the type of fee that is used for transactions.
	 *
	 * @return {*}  {FeeType}
	 * @memberof Network
	 */
	feeType(): FeeType;
	/**
	 * Determine sif the network uses memos to store additional data.
	 *
	 * @return {*}  {boolean}
	 * @memberof Network
	 */
	usesMemo(): boolean;
	/**
	 * Determines if the network uses UTXO.
	 *
	 * @return {*}  {boolean}
	 * @memberof Network
	 */
	usesUTXO(): boolean;
	/**
	 * Returns the list of available tokens, like ERC20 or TRC20.
	 *
	 * @return {*}  {NetworkManifestToken[]}
	 * @memberof Network
	 */
	tokens(): NetworkManifestToken[];
	/**
	 * Return the object representation of the network.
	 */
	toObject(): NetworkManifest;
	/**
	 * Return the JSON representation of the network.
	 */
	toJson(): string;
}
