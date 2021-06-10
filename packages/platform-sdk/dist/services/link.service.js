"use strict";
/* istanbul ignore file */
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
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
var _AbstractLinkService_instances, _AbstractLinkService_buildURL;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractLinkService = void 0;
const utils_1 = require("@arkecosystem/utils");
const onetime_1 = __importDefault(require("onetime"));
const url_1 = require("url");
const coins_1 = require("../coins");
const helpers_1 = require("../helpers");
const ioc_1 = require("../ioc");
const service_provider_contract_1 = require("../ioc/service-provider.contract");
let AbstractLinkService = class AbstractLinkService {
	constructor() {
		_AbstractLinkService_instances.add(this);
		Object.defineProperty(this, "configRepository", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
	}
	block(id) {
		return __classPrivateFieldGet(this, _AbstractLinkService_instances, "m", _AbstractLinkService_buildURL).call(
			this,
			this.configRepository.get("network.explorer.block"),
			id,
		);
	}
	transaction(id) {
		return __classPrivateFieldGet(this, _AbstractLinkService_instances, "m", _AbstractLinkService_buildURL).call(
			this,
			this.configRepository.get("network.explorer.transaction"),
			id,
		);
	}
	wallet(id) {
		return __classPrivateFieldGet(this, _AbstractLinkService_instances, "m", _AbstractLinkService_buildURL).call(
			this,
			this.configRepository.get("network.explorer.wallet"),
			id,
		);
	}
};
(_AbstractLinkService_instances = new WeakSet()),
	(_AbstractLinkService_buildURL = function _AbstractLinkService_buildURL(schema, id) {
		const { host, query } = onetime_1.default(() =>
			helpers_1.randomNetworkHostFromConfig(this.configRepository, "explorer"),
		)();
		const url = new url_1.URL(utils_1.formatString(schema, id), host);
		if (query) {
			url.search = new URLSearchParams(query).toString();
		}
		return url.toString();
	});
__decorate(
	[
		ioc_1.inject(service_provider_contract_1.BindingType.ConfigRepository),
		__metadata("design:type", coins_1.ConfigRepository),
	],
	AbstractLinkService.prototype,
	"configRepository",
	void 0,
);
AbstractLinkService = __decorate([ioc_1.injectable()], AbstractLinkService);
exports.AbstractLinkService = AbstractLinkService;
//# sourceMappingURL=link.service.js.map
