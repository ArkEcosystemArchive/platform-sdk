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
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
var _ClientService_instances,
	_ClientService_get,
	_ClientService_post,
	_ClientService_createMetaPagination,
	_ClientService_createSearchParams,
	_ClientService_handleBroadcastResponse,
	_ClientService_isUpcoming;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const node_dotify_1 = __importDefault(require("node-dotify"));
const wallet_dto_1 = require("./wallet.dto");
const client_service_errors_1 = require("./client.service.errors");
let ClientService = class ClientService extends platform_sdk_1.Services.AbstractClientService {
	constructor() {
		super(...arguments);
		_ClientService_instances.add(this);
	}
	async transaction(id, input) {
		const body = await __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_get).call(
			this,
			`transactions/${id}`,
		);
		return this.dataTransferObjectService.transaction(body.data);
	}
	async transactions(query) {
		const response = __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_isUpcoming).call(
			this,
		)
			? await __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_get).call(
					this,
					"transactions",
					__classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_createSearchParams).call(
						this,
						query,
					),
			  )
			: await __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_post).call(
					this,
					"transactions/search",
					__classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_createSearchParams).call(
						this,
						query,
					),
			  );
		return this.dataTransferObjectService.transactions(
			response.data,
			__classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_createMetaPagination).call(
				this,
				response,
			),
		);
	}
	async wallet(id) {
		const body = await __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_get).call(
			this,
			`wallets/${id}`,
		);
		return new wallet_dto_1.WalletData(body.data);
	}
	async wallets(query) {
		const response = __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_isUpcoming).call(
			this,
		)
			? await __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_get).call(
					this,
					"wallets",
					__classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_createSearchParams).call(
						this,
						query,
					),
			  )
			: await __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_post).call(
					this,
					"wallets/search",
					__classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_createSearchParams).call(
						this,
						query,
					),
			  );
		return new platform_sdk_1.Collections.WalletDataCollection(
			response.data.map((wallet) => new wallet_dto_1.WalletData(wallet)),
			__classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_createMetaPagination).call(
				this,
				response,
			),
		);
	}
	async delegate(id) {
		const body = await __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_get).call(
			this,
			`delegates/${id}`,
		);
		return new wallet_dto_1.WalletData(body.data);
	}
	async delegates(query) {
		const body = await __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_get).call(
			this,
			"delegates",
			__classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_createSearchParams).call(
				this,
				query || {},
			),
		);
		return new platform_sdk_1.Collections.WalletDataCollection(
			body.data.map((wallet) => new wallet_dto_1.WalletData(wallet)),
			__classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_createMetaPagination).call(
				this,
				body,
			),
		);
	}
	async votes(id) {
		var _a, _b;
		const { data } = await __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_get).call(
			this,
			`wallets/${id}`,
		);
		const hasVoted = ((_a = data.attributes) === null || _a === void 0 ? void 0 : _a.vote) !== undefined;
		return {
			used: hasVoted ? 1 : 0,
			available: hasVoted ? 0 : 1,
			publicKeys: hasVoted ? [(_b = data.attributes) === null || _b === void 0 ? void 0 : _b.vote] : [],
		};
	}
	async voters(id, query) {
		const body = await __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_get).call(
			this,
			`delegates/${id}/voters`,
			__classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_createSearchParams).call(
				this,
				query || {},
			),
		);
		return new platform_sdk_1.Collections.WalletDataCollection(
			body.data.map((wallet) => new wallet_dto_1.WalletData(wallet)),
			__classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_createMetaPagination).call(
				this,
				body,
			),
		);
	}
	async broadcast(transactions) {
		let response;
		try {
			response = await __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_post).call(
				this,
				"transactions",
				{
					body: {
						transactions: transactions.map((transaction) => transaction.toBroadcast()),
					},
				},
			);
		} catch (error) {
			response = error.response.json();
		}
		return __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_handleBroadcastResponse).call(
			this,
			response,
		);
	}
};
(_ClientService_instances = new WeakSet()),
	(_ClientService_get = async function _ClientService_get(path, query) {
		return (
			await this.httpClient.get(
				`${platform_sdk_1.Helpers.randomHostFromConfig(this.configRepository)}/${path}`,
				query === null || query === void 0 ? void 0 : query.searchParams,
			)
		).json();
	}),
	(_ClientService_post = async function _ClientService_post(path, { body, searchParams }) {
		return (
			await this.httpClient.post(
				`${platform_sdk_1.Helpers.randomHostFromConfig(this.configRepository)}/${path}`,
				body,
				searchParams || undefined,
			)
		).json();
	}),
	(_ClientService_createMetaPagination = function _ClientService_createMetaPagination(body) {
		const getPage = (url) => {
			const match = RegExp(/page=(\d+)/).exec(url);
			return match ? match[1] || undefined : undefined;
		};
		return {
			prev: getPage(body.meta.previous) || undefined,
			self: getPage(body.meta.self) || undefined,
			next: getPage(body.meta.next) || undefined,
			last: getPage(body.meta.last) || undefined,
		};
	}),
	(_ClientService_createSearchParams = function _ClientService_createSearchParams(body) {
		if (Object.keys(body).length <= 0) {
			return { body: null, searchParams: null };
		}
		const result = {
			body,
			searchParams: {},
		};
		const mappings = {
			cursor: "page",
			limit: "limit",
			orderBy: "orderBy",
			memo: "vendorField",
		};
		if (__classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_isUpcoming).call(this)) {
			Object.assign(mappings, {
				address: "address",
				recipientId: "recipientId",
				senderId: "senderId",
				senderPublicKey: "senderPublicKey",
			});
		}
		for (const [alias, original] of Object.entries(mappings)) {
			if (body[alias]) {
				result.searchParams[original] = body[alias];
				delete result.body[alias];
			}
		}
		if (__classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_isUpcoming).call(this)) {
			// @ts-ignore
			const addresses = body.addresses;
			if (Array.isArray(addresses)) {
				result.searchParams.address = addresses.join(",");
				// @ts-ignore
				delete body.addresses;
			}
			result.searchParams = node_dotify_1.default({ ...result.searchParams, ...result.body });
			result.body = null;
		}
		return result;
	}),
	(_ClientService_handleBroadcastResponse = function _ClientService_handleBroadcastResponse(response) {
		const { data, errors } = response;
		const result = {
			accepted: [],
			rejected: [],
			errors: {},
		};
		if (Array.isArray(data.accept)) {
			result.accepted = data.accept;
		}
		if (Array.isArray(data.invalid)) {
			result.rejected = data.invalid;
		}
		if (errors) {
			const responseErrors = Object.entries(errors);
			for (const [key, value] of responseErrors) {
				if (Array.isArray(value)) {
					if (!Array.isArray(result.errors[key])) {
						result.errors[key] = [];
					}
					for (const error of value) {
						result.errors[key].push(client_service_errors_1.guessBroadcastError(error.message));
					}
				} else {
					result.errors[key] = [client_service_errors_1.guessBroadcastError(value.message)];
				}
			}
		}
		return result;
	}),
	(_ClientService_isUpcoming = function _ClientService_isUpcoming() {
		return this.configRepository.get("network.id") === "ark.devnet";
	});
ClientService = __decorate([platform_sdk_1.IoC.injectable()], ClientService);
exports.ClientService = ClientService;
//# sourceMappingURL=client.service.js.map
