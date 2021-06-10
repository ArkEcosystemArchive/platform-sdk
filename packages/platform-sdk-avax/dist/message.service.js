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
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var _MessageService_instances, _MessageService_digestMessage;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const avalanche_1 = require("avalanche");
const avm_1 = require("avalanche/dist/apis/avm");
const utils_1 = require("avalanche/dist/utils");
const crypto_1 = require("crypto");
const helpers_1 = require("./helpers");
let MessageService = class MessageService extends platform_sdk_1.Services.AbstractMessageService {
	constructor() {
		super(...arguments);
		_MessageService_instances.add(this);
		Object.defineProperty(this, "configRepository", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
	}
	async sign(input) {
		try {
			const { child } = helpers_1.keyPairFromMnemonic(this.configRepository, input.signatory.signingKey());
			return {
				message: input.message,
				signatory: child.getAddressString(),
				signature: helpers_1.cb58Encode(
					child.sign(
						__classPrivateFieldGet(
							this,
							_MessageService_instances,
							"m",
							_MessageService_digestMessage,
						).call(this, input.message),
					),
				),
			};
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
	async verify(input) {
		const bintools = avalanche_1.BinTools.getInstance();
		const hrp = utils_1.getPreferredHRP(parseInt(this.configRepository.get("network.meta.networkId")));
		const keypair = new avm_1.KeyPair(hrp, "X");
		const signedBuff = helpers_1.cb58Decode(input.signature);
		const pubKey = keypair.recover(
			__classPrivateFieldGet(this, _MessageService_instances, "m", _MessageService_digestMessage).call(
				this,
				input.message,
			),
			signedBuff,
		);
		return bintools.addressToString(hrp, "X", keypair.addressFromPublicKey(pubKey)) === input.signatory;
	}
};
(_MessageService_instances = new WeakSet()),
	(_MessageService_digestMessage = function _MessageService_digestMessage(msgStr) {
		const mBuf = avalanche_1.Buffer.from(msgStr, "utf8");
		const msgSize = avalanche_1.Buffer.alloc(4);
		msgSize.writeUInt32BE(mBuf.length, 0);
		const msgBuf = avalanche_1.Buffer.from(`\x1AAvalanche Signed Message:\n${msgSize}${msgStr}`, "utf8");
		return avalanche_1.Buffer.from(crypto_1.createHash("sha256").update(msgBuf).digest());
	});
__decorate(
	[
		platform_sdk_1.IoC.inject(platform_sdk_1.IoC.BindingType.ConfigRepository),
		__metadata("design:type", platform_sdk_1.Coins.ConfigRepository),
	],
	MessageService.prototype,
	"configRepository",
	void 0,
);
MessageService = __decorate([platform_sdk_1.IoC.injectable()], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map
