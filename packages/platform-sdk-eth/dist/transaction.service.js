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
var _TransactionService_instances,
	_TransactionService_chain,
	_TransactionService_peer,
	_TransactionService_web3,
	_TransactionService_get,
	_TransactionService_createContract;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const common_1 = __importDefault(require("@ethereumjs/common"));
const tx_1 = require("@ethereumjs/tx");
const web3_1 = __importDefault(require("web3"));
let TransactionService = class TransactionService extends platform_sdk_1.Services.AbstractTransactionService {
	constructor() {
		super(...arguments);
		_TransactionService_instances.add(this);
		Object.defineProperty(this, "addressService", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "privateKeyService", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		_TransactionService_chain.set(this, void 0);
		_TransactionService_peer.set(this, void 0);
		_TransactionService_web3.set(this, void 0);
	}
	onPostConstruct() {
		__classPrivateFieldSet(this, _TransactionService_chain, this.configRepository.get("network"), "f");
		__classPrivateFieldSet(
			this,
			_TransactionService_peer,
			platform_sdk_1.Helpers.randomHostFromConfig(this.configRepository),
			"f",
		);
		__classPrivateFieldSet(this, _TransactionService_web3, new web3_1.default(), "f"); // @TODO: provide a host
	}
	async transfer(input) {
		try {
			const senderData = await this.addressService.fromMnemonic(input.signatory.signingKey());
			let privateKey;
			if (input.signatory.actsWithPrivateKey()) {
				privateKey = input.signatory.signingKey();
			} else {
				privateKey = (await this.privateKeyService.fromMnemonic(input.signatory.signingKey())).privateKey;
			}
			const { nonce } = await __classPrivateFieldGet(
				this,
				_TransactionService_instances,
				"m",
				_TransactionService_get,
			).call(this, `wallets/${senderData.address}`);
			let data;
			if (input.contract && input.contract.address) {
				data = {
					nonce: web3_1.default.utils.toHex(
						web3_1.default.utils.toBN(nonce).add(web3_1.default.utils.toBN("1")),
					),
					gasPrice: web3_1.default.utils.toHex(input.fee),
					gasLimit: web3_1.default.utils.toHex(input.feeLimit),
					to: input.contract.address,
					value: "0x0",
					data: __classPrivateFieldGet(
						this,
						_TransactionService_instances,
						"m",
						_TransactionService_createContract,
					)
						.call(this, input.contract.address)
						.methods.transfer(input.data.to, input.data.amount)
						.encodeABI(),
				};
			} else {
				data = {
					nonce: web3_1.default.utils.toHex(
						web3_1.default.utils.toBN(nonce).add(web3_1.default.utils.toBN("1")),
					),
					gasLimit: web3_1.default.utils.toHex(input.feeLimit),
					gasPrice: web3_1.default.utils.toHex(input.fee),
					to: input.data.to,
					value: web3_1.default.utils.toHex(web3_1.default.utils.toWei(`${input.data.amount}`, "wei")),
				};
				if (input.data.memo) {
					// @ts-ignore
					data.data = platform_sdk_crypto_1.Buffoon.fromUTF8(input.data.memo);
				}
			}
			const transaction = new tx_1.Transaction(data, {
				common: common_1.default.forCustomChain(
					__classPrivateFieldGet(this, _TransactionService_chain, "f"),
					{},
				),
			});
			transaction.sign(platform_sdk_crypto_1.Buffoon.fromHex(privateKey));
			return this.dataTransferObjectService.signedTransaction(
				transaction.hash().toString("hex"),
				"0x" + transaction.serialize().toString("hex"),
				"0x" + transaction.serialize().toString("hex"),
			);
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
};
(_TransactionService_chain = new WeakMap()),
	(_TransactionService_peer = new WeakMap()),
	(_TransactionService_web3 = new WeakMap()),
	(_TransactionService_instances = new WeakSet()),
	(_TransactionService_get = async function _TransactionService_get(path, query) {
		const response = await this.httpClient.get(
			`${__classPrivateFieldGet(this, _TransactionService_peer, "f")}/${path}`,
			query,
		);
		return response.json();
	}),
	(_TransactionService_createContract = function _TransactionService_createContract(contractAddress) {
		return new (__classPrivateFieldGet(this, _TransactionService_web3, "f").eth.Contract)(
			[
				{
					constant: false,
					inputs: [
						{
							name: "_to",
							type: "address",
						},
						{
							name: "_value",
							type: "uint256",
						},
					],
					name: "transfer",
					outputs: [
						{
							name: "success",
							type: "bool",
						},
					],
					payable: false,
					stateMutability: "nonpayable",
					type: "function",
				},
			],
			contractAddress,
		);
	});
__decorate(
	[platform_sdk_1.IoC.inject(platform_sdk_1.IoC.BindingType.AddressService), __metadata("design:type", Object)],
	TransactionService.prototype,
	"addressService",
	void 0,
);
__decorate(
	[platform_sdk_1.IoC.inject(platform_sdk_1.IoC.BindingType.PrivateKeyService), __metadata("design:type", Object)],
	TransactionService.prototype,
	"privateKeyService",
	void 0,
);
__decorate(
	[
		platform_sdk_1.IoC.postConstruct(),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0),
	],
	TransactionService.prototype,
	"onPostConstruct",
	null,
);
TransactionService = __decorate([platform_sdk_1.IoC.injectable()], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map
