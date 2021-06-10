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
var _ClientService_instances, _ClientService_zilliqa, _ClientService_checkGasPrice;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const zilliqa_1 = require("@zilliqa-js/zilliqa");
const wallet_dto_1 = require("./wallet.dto");
let ClientService = class ClientService extends platform_sdk_1.Services.AbstractClientService {
	constructor() {
		super(...arguments);
		_ClientService_instances.add(this);
		_ClientService_zilliqa.set(this, void 0);
	}
	onPostConstruct() {
		__classPrivateFieldSet(
			this,
			_ClientService_zilliqa,
			new zilliqa_1.Zilliqa(platform_sdk_1.Helpers.randomHostFromConfig(this.configRepository)),
			"f",
		);
	}
	async transaction(id, input) {
		const transaction = await __classPrivateFieldGet(this, _ClientService_zilliqa, "f").blockchain.getTransaction(
			id,
		);
		const receipt = transaction.getReceipt();
		return this.dataTransferObjectService.transaction({
			id: transaction.hash,
			sender: transaction.senderAddress,
			recipient: transaction.payload.toAddr,
			amount: transaction.payload.amount,
			gasUsed: (receipt === null || receipt === void 0 ? void 0 : receipt.cumulative_gas) || 0,
			gasPrice: transaction.payload.gasPrice,
			isConfirmed: transaction.isConfirmed(),
			isSent: transaction.isPending(),
		});
	}
	async wallet(id) {
		const response = await __classPrivateFieldGet(this, _ClientService_zilliqa, "f").blockchain.getBalance(id);
		if (response.error) {
			throw new platform_sdk_1.Exceptions.Exception(`Received an error: ${JSON.stringify(response.error)}`);
		}
		if ((response === null || response === void 0 ? void 0 : response.result) === undefined) {
			throw new platform_sdk_1.Exceptions.Exception(`Received an invalid response: ${JSON.stringify(response)}`);
		}
		return new wallet_dto_1.WalletData({
			address: id,
			balance: response.result.balance,
			nonce: response.result.nonce,
		});
	}
	async broadcast(transactions) {
		const minGasPrice = (
			await __classPrivateFieldGet(this, _ClientService_zilliqa, "f").blockchain.getMinimumGasPrice()
		).result;
		const response = {
			accepted: [],
			rejected: [],
			errors: {},
		};
		for (const transaction of transactions) {
			const id = transaction.id();
			try {
				__classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_checkGasPrice).call(
					this,
					transaction.fee().toString(),
					minGasPrice,
				);
				const broadcastData = transaction.toBroadcast();
				const hash = await __classPrivateFieldGet(
					this,
					_ClientService_zilliqa,
					"f",
				).blockchain.createTransactionRaw(broadcastData);
				const txParams = JSON.parse(broadcastData);
				const tx = __classPrivateFieldGet(this, _ClientService_zilliqa, "f").transactions.new({ ...txParams });
				await tx.confirm(hash);
				if (tx.isConfirmed()) {
					response.accepted.push(id);
				} else {
					response.rejected.push(id);
					const receipt = tx.getReceipt();
					if (receipt === null || receipt === void 0 ? void 0 : receipt.errors) {
						response.errors[id] = receipt.errors;
					}
				}
			} catch (error) {
				response.rejected.push(id);
				response.errors[id] = [error.message];
			}
		}
		return response;
	}
};
(_ClientService_zilliqa = new WeakMap()),
	(_ClientService_instances = new WeakSet()),
	(_ClientService_checkGasPrice = function _ClientService_checkGasPrice(gasPrice, minGasPrice = "0") {
		const isGasSufficient = new zilliqa_1.BN(gasPrice).gte(new zilliqa_1.BN(minGasPrice));
		if (!isGasSufficient) {
			throw new platform_sdk_1.Exceptions.Exception(`Insufficient gas: ${gasPrice}, needed: ${minGasPrice}`);
		}
	});
__decorate(
	[
		platform_sdk_1.IoC.postConstruct(),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0),
	],
	ClientService.prototype,
	"onPostConstruct",
	null,
);
ClientService = __decorate([platform_sdk_1.IoC.injectable()], ClientService);
exports.ClientService = ClientService;
//# sourceMappingURL=client.service.js.map
