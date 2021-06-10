"use strict";
var __classPrivateFieldSet =
	(this && this.__classPrivateFieldSet) ||
	function (receiver, state, value, kind, f) {
		if (kind === "m") throw new TypeError("Private method is not writable");
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot write private member to an object whose class did not declare it");
		return kind === "a" ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value;
	};
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var _Network_coin, _Network_network;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Network = void 0;
const dot_prop_1 = require("dot-prop");
const helpers_1 = require("../helpers");
class Network {
	/**
	 * Create a new Network instance.
	 *
	 * @param {string} coin
	 * @param {NetworkManifest} network
	 * @memberof Network
	 */
	constructor(coin, network) {
		/**
		 * The coin of the network.
		 *
		 * @memberof Network
		 */
		_Network_coin.set(this, void 0);
		/**
		 * The manifest of the network.
		 *
		 * @memberof Network
		 */
		_Network_network.set(this, void 0);
		__classPrivateFieldSet(this, _Network_coin, coin, "f");
		__classPrivateFieldSet(this, _Network_network, network, "f");
	}
	/**
	 * Get the parent coin of the network.
	 */
	coin() {
		return __classPrivateFieldGet(this, _Network_coin, "f").name;
	}
	/**
	 * Get the coin of the network.
	 */
	coinName() {
		return __classPrivateFieldGet(this, _Network_network, "f").coin;
	}
	/**
	 * Get the ID of the network.
	 */
	id() {
		return __classPrivateFieldGet(this, _Network_network, "f").id;
	}
	/**
	 * Get the name of the network.
	 */
	name() {
		return __classPrivateFieldGet(this, _Network_network, "f").name;
	}
	/**
	 * Get the explorer URL of the coin that is used.
	 */
	explorer() {
		return helpers_1.randomHost(__classPrivateFieldGet(this, _Network_network, "f").hosts, "explorer").host;
	}
	/**
	 * Get the ticker of the coin that is used.
	 */
	ticker() {
		return __classPrivateFieldGet(this, _Network_network, "f").currency.ticker;
	}
	/**
	 * Get the symbol of the coin that is used.
	 */
	symbol() {
		return __classPrivateFieldGet(this, _Network_network, "f").currency.symbol;
	}
	/**
	 * Determine if this is a production network.
	 */
	isLive() {
		return __classPrivateFieldGet(this, _Network_network, "f").type === "live";
	}
	/**
	 * Determine if this is a development network.
	 */
	isTest() {
		return __classPrivateFieldGet(this, _Network_network, "f").type === "test";
	}
	/**
	 * Get the expiration method type.
	 */
	expirationType() {
		return __classPrivateFieldGet(this, _Network_network, "f").transactions.expirationType;
	}
	/**
	 * Determine if voting is supported on this network.
	 */
	allowsVoting() {
		return dot_prop_1.get(__classPrivateFieldGet(this, _Network_network, "f"), "governance") !== undefined;
	}
	/**
	 * Get the number of delegates that forge blocks.
	 */
	delegateCount() {
		return dot_prop_1.get(__classPrivateFieldGet(this, _Network_network, "f"), "governance.delegateCount", 0);
	}
	/**
	 * Get the maximum number of votes per wallet.
	 */
	maximumVotesPerWallet() {
		return dot_prop_1.get(__classPrivateFieldGet(this, _Network_network, "f"), "governance.votesPerWallet", 0);
	}
	/**
	 * Get the maximum number of votes per transaction.
	 */
	maximumVotesPerTransaction() {
		return dot_prop_1.get(__classPrivateFieldGet(this, _Network_network, "f"), "governance.votesPerTransaction", 0);
	}
	/**
	 * Determine if the network uses an extended public key for derivation.
	 */
	usesExtendedPublicKey() {
		return dot_prop_1.get(__classPrivateFieldGet(this, _Network_network, "f"), "meta.extendedPublicKey") === true;
	}
	/**
	 * Determine if the given feature is enabled.
	 *
	 * @param feature
	 */
	allows(feature) {
		const [root, ...child] = feature.split(".");
		const features = dot_prop_1.get(__classPrivateFieldGet(this, _Network_network, "f").featureFlags, root);
		if (Array.isArray(features)) {
			return features.includes(child.join("."));
		}
		return false;
	}
	/**
	 * Determine if the given feature is disabled.
	 *
	 * @param feature
	 */
	denies(feature) {
		return !this.allows(feature);
	}
	/**
	 * Determines if the network charges static fees.
	 *
	 * @return {*}  {boolean}
	 * @memberof Network
	 */
	chargesStaticFees() {
		return dot_prop_1.get(__classPrivateFieldGet(this, _Network_network, "f"), "fees.type") === "static";
	}
	/**
	 * Determines if the network charges dynamic fees.
	 *
	 * @return {*}  {boolean}
	 * @memberof Network
	 */
	chargesDynamicFees() {
		return dot_prop_1.get(__classPrivateFieldGet(this, _Network_network, "f"), "fees.type") === "dynamic";
	}
	/**
	 * Determines if the network charges gas fees.
	 *
	 * @return {*}  {boolean}
	 * @memberof Network
	 */
	chargesGasFees() {
		return dot_prop_1.get(__classPrivateFieldGet(this, _Network_network, "f"), "fees.type") === "gas";
	}
	/**
	 * Determines if the network charges weight fees.
	 *
	 * @return {*}  {boolean}
	 * @memberof Network
	 */
	chargesWeightFees() {
		return dot_prop_1.get(__classPrivateFieldGet(this, _Network_network, "f"), "fees.type") === "weight";
	}
	/**
	 * Determines if the network charges zero fees.
	 *
	 * @return {*}  {boolean}
	 * @memberof Network
	 */
	chargesZeroFees() {
		return dot_prop_1.get(__classPrivateFieldGet(this, _Network_network, "f"), "fees.type") === "free";
	}
	/**
	 * Returns the available import methods for the network.
	 *
	 * @return {*}  {NetworkManifestImportMethods}
	 * @memberof Network
	 */
	importMethods() {
		return __classPrivateFieldGet(this, _Network_network, "f").importMethods;
	}
	/**
	 * Returns the meta data of the network.
	 *
	 * @return {*}  {Record<string, any>}
	 * @memberof Network
	 */
	meta() {
		return dot_prop_1.get(__classPrivateFieldGet(this, _Network_network, "f"), "meta", {});
	}
	/**
	 * Returns the type of fee that is used for transactions.
	 *
	 * @return {*}  {FeeType}
	 * @memberof Network
	 */
	feeType() {
		return __classPrivateFieldGet(this, _Network_network, "f").transactions.fees.type;
	}
	/**
	 * Determine sif the network uses memos to store additional data.
	 *
	 * @return {*}  {boolean}
	 * @memberof Network
	 */
	usesMemo() {
		return dot_prop_1.get(__classPrivateFieldGet(this, _Network_network, "f"), "transactions.memo", false);
	}
	/**
	 * Determines if the network uses UTXO.
	 *
	 * @return {*}  {boolean}
	 * @memberof Network
	 */
	usesUTXO() {
		return dot_prop_1.get(__classPrivateFieldGet(this, _Network_network, "f"), "transactions.utxo", false);
	}
	/**
	 * Returns the list of available tokens, like ERC20 or TRC20.
	 *
	 * @return {*}  {NetworkManifestToken[]}
	 * @memberof Network
	 */
	tokens() {
		return dot_prop_1.get(__classPrivateFieldGet(this, _Network_network, "f"), "tokens", []);
	}
	/**
	 * Return the object representation of the network.
	 */
	toObject() {
		return __classPrivateFieldGet(this, _Network_network, "f");
	}
	/**
	 * Return the JSON representation of the network.
	 */
	toJson() {
		return JSON.stringify(this.toObject());
	}
}
exports.Network = Network;
(_Network_coin = new WeakMap()), (_Network_network = new WeakMap());
//# sourceMappingURL=network.js.map
