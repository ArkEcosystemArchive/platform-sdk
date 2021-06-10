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
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var _FeeService_dataRepository;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeeService = void 0;
const queue_1 = require("../../../helpers/queue");
const data_repository_1 = require("../../../repositories/data-repository");
const inversify_1 = require("inversify");
let FeeService = class FeeService {
	constructor() {
		_FeeService_dataRepository.set(this, new data_repository_1.DataRepository());
	}
	/** {@inheritDoc IFeeService.all} */
	all(coin, network) {
		const result = __classPrivateFieldGet(this, _FeeService_dataRepository, "f").get(`${coin}.${network}.fees`);
		if (result === undefined) {
			throw new Error(
				`The fees for [${coin}.${network}] have not been synchronized yet. Please call [syncFees] before using this method.`,
			);
		}
		return result;
	}
	/** {@inheritDoc IFeeService.findByType} */
	findByType(coin, network, type) {
		return this.all(coin, network)[type];
	}
	/** {@inheritDoc IFeeService.sync} */
	async sync(profile, coin, network) {
		const instance = profile.coins().set(coin, network);
		// @TODO: remove this in a refactor
		/* istanbul ignore next */
		if (!instance.hasBeenSynchronized()) {
			await instance.__construct();
		}
		__classPrivateFieldGet(this, _FeeService_dataRepository, "f").set(
			`${coin}.${network}.fees`,
			await instance.fee().all(),
		);
	}
	/** {@inheritDoc IFeeService.syncAll} */
	async syncAll(profile) {
		const promises = [];
		for (const [coin, networks] of profile.coins().entries()) {
			for (const network of networks) {
				promises.push(() => this.sync(profile, coin, network));
			}
		}
		await queue_1.pqueueSettled(promises);
	}
};
_FeeService_dataRepository = new WeakMap();
FeeService = __decorate([inversify_1.injectable()], FeeService);
exports.FeeService = FeeService;
//# sourceMappingURL=fee-service.js.map
