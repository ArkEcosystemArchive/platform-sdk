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
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
var _MessageService_connection;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const buffer_1 = require("buffer");
const tronweb_1 = __importDefault(require("tronweb"));
let MessageService = class MessageService extends platform_sdk_1.Services.AbstractMessageService {
	constructor() {
		super(...arguments);
		Object.defineProperty(this, "configRepository", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "addressService", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "keyPairService", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		_MessageService_connection.set(this, void 0);
	}
	onPostConstruct() {
		__classPrivateFieldSet(
			this,
			_MessageService_connection,
			new tronweb_1.default({
				fullHost: platform_sdk_1.Helpers.randomHostFromConfig(this.configRepository),
			}),
			"f",
		);
	}
	async sign(input) {
		try {
			const keys = await this.keyPairService.fromMnemonic(input.signatory.signingKey());
			const { address } = await this.addressService.fromMnemonic(input.signatory.signingKey());
			if (keys.privateKey === undefined) {
				throw new Error("Failed to retrieve the private key for the signatory wallet.");
			}
			const messageAsHex = buffer_1.Buffer.from(input.message).toString("hex");
			const signature = await __classPrivateFieldGet(this, _MessageService_connection, "f").trx.sign(
				messageAsHex,
				keys.privateKey,
			);
			return {
				message: input.message,
				signatory: address,
				signature: signature,
			};
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
	async verify(input) {
		try {
			const messageAsHex = buffer_1.Buffer.from(input.message).toString("hex");
			return __classPrivateFieldGet(this, _MessageService_connection, "f").trx.verifyMessage(
				messageAsHex,
				input.signature,
				input.signatory,
			);
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
};
_MessageService_connection = new WeakMap();
__decorate(
	[
		platform_sdk_1.IoC.inject(platform_sdk_1.IoC.BindingType.ConfigRepository),
		__metadata("design:type", platform_sdk_1.Coins.ConfigRepository),
	],
	MessageService.prototype,
	"configRepository",
	void 0,
);
__decorate(
	[platform_sdk_1.IoC.inject(platform_sdk_1.IoC.BindingType.AddressService), __metadata("design:type", Object)],
	MessageService.prototype,
	"addressService",
	void 0,
);
__decorate(
	[platform_sdk_1.IoC.inject(platform_sdk_1.IoC.BindingType.KeyPairService), __metadata("design:type", Object)],
	MessageService.prototype,
	"keyPairService",
	void 0,
);
__decorate(
	[
		platform_sdk_1.IoC.postConstruct(),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0),
	],
	MessageService.prototype,
	"onPostConstruct",
	null,
);
MessageService = __decorate([platform_sdk_1.IoC.injectable()], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map
