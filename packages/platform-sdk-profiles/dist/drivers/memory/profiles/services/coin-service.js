"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (decorators, target, key, desc) {
		var c = arguments.length,
			r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
			d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
			r = Reflect.decorate(decorators, target, key, desc);
		else
			for (var i = decorators.length - 1; i >= 0; i--)
				if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
var __metadata =
	(this && this.__metadata) ||
	function (k, v) {
		if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
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
var _CoinService_dataRepository;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const inversify_1 = require("inversify");
const container_1 = require("../../../../environment/container");
const container_models_1 = require("../../../../environment/container.models");
let CoinService = class CoinService {
	constructor(dataRepository) {
		_CoinService_dataRepository.set(this, void 0);
		__classPrivateFieldSet(this, _CoinService_dataRepository, dataRepository, "f");
	}
	/** {@inheritDoc ICoinService.all} */
	all() {
		return __classPrivateFieldGet(this, _CoinService_dataRepository, "f").all();
	}
	/** {@inheritDoc ICoinService.values} */
	values() {
		return __classPrivateFieldGet(this, _CoinService_dataRepository, "f").values();
	}
	/** {@inheritDoc ICoinService.entries} */
	entries() {
		const result = {};
		for (const [coin, networks] of Object.entries(this.all())) {
			result[coin] = [];
			for (const [network, children] of Object.entries(networks)) {
				if (children !== undefined) {
					for (const child of Object.keys(children)) {
						result[coin].push(`${network}.${child}`);
					}
				} else {
					result[coin].push(network);
				}
			}
		}
		return Object.entries(result);
	}
	/** {@inheritDoc ICoinService.get} */
	get(coin, network) {
		const instance = __classPrivateFieldGet(this, _CoinService_dataRepository, "f").get(`${coin}.${network}`);
		if (instance === undefined) {
			throw new Error(`An instance for [${coin}.${network}] does not exist.`);
		}
		return instance;
	}
	/** {@inheritDoc ICoinService.push} */
	set(coin, network, options = {}) {
		const cacheKey = `${coin}.${network}`;
		if (__classPrivateFieldGet(this, _CoinService_dataRepository, "f").has(cacheKey)) {
			return __classPrivateFieldGet(this, _CoinService_dataRepository, "f").get(cacheKey);
		}
		const instance = platform_sdk_1.Coins.CoinFactory.make(
			container_1.container.get(container_models_1.Identifiers.Coins)[coin.toUpperCase()],
			{
				network,
				httpClient: container_1.container.get(container_models_1.Identifiers.HttpClient),
				...options,
			},
		);
		__classPrivateFieldGet(this, _CoinService_dataRepository, "f").set(cacheKey, instance);
		return instance;
	}
	/** {@inheritDoc ICoinService.has} */
	has(coin, network) {
		return __classPrivateFieldGet(this, _CoinService_dataRepository, "f").has(`${coin}.${network}`);
	}
	/** {@inheritDoc ICoinService.flush} */
	flush() {
		__classPrivateFieldGet(this, _CoinService_dataRepository, "f").flush();
	}
};
_CoinService_dataRepository = new WeakMap();
CoinService = __decorate([inversify_1.injectable(), __metadata("design:paramtypes", [Object])], CoinService);
exports.CoinService = CoinService;
//# sourceMappingURL=coin-service.js.map
