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
var _ClientService_instances,
	_ClientService_peer,
	_ClientService_broadcastErrors,
	_ClientService_get,
	_ClientService_post,
	_ClientService_createSearchParams,
	_ClientService_createPagination;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const wallet_dto_1 = require("./wallet.dto");
let ClientService = class ClientService extends platform_sdk_1.Services.AbstractClientService {
	constructor() {
		super(...arguments);
		_ClientService_instances.add(this);
		_ClientService_peer.set(this, void 0);
		_ClientService_broadcastErrors.set(this, {
			"Invalid sender publicKey": "ERR_INVALID_SENDER_PUBLICKEY",
			"Account does not have enough LSK": "ERR_INSUFFICIENT_FUNDS",
			"Sender does not have a secondPublicKey": "ERR_MISSING_SECOND_PUBLICKEY",
			"Missing signSignature": "ERR_MISSING_SIGNATURE",
			"Sender is not a multisignature account": "ERR_MISSING_MULTISIGNATURE",
		});
	}
	onPostConstruct() {
		__classPrivateFieldSet(
			this,
			_ClientService_peer,
			`${platform_sdk_1.Helpers.randomHostFromConfig(this.configRepository)}/api`,
			"f",
		);
	}
	async transaction(id, input) {
		const result = await __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_get).call(
			this,
			"transactions",
			{ id },
		);
		return this.dataTransferObjectService.transaction(result.data[0]);
	}
	async transactions(query) {
		// @ts-ignore
		const result = await __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_get).call(
			this,
			"transactions",
			__classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_createSearchParams).call(this, {
				sort: "timestamp:desc",
				...query,
			}),
		);
		return this.dataTransferObjectService.transactions(
			result.data,
			__classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_createPagination).call(
				this,
				result.data,
				result.meta,
			),
		);
	}
	async wallet(id) {
		const result = await __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_get).call(
			this,
			"accounts",
			{ address: id },
		);
		return new wallet_dto_1.WalletData(result.data[0]);
	}
	async wallets(query) {
		const result = await __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_get).call(
			this,
			"accounts",
			query,
		);
		return new platform_sdk_1.Collections.WalletDataCollection(
			result.data.map((wallet) => new wallet_dto_1.WalletData(wallet)),
			__classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_createPagination).call(
				this,
				result.data,
				result.meta,
			),
		);
	}
	async delegate(id) {
		const result = await __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_get).call(
			this,
			"delegates",
			{ username: id },
		);
		return new wallet_dto_1.WalletData(result.data[0]);
	}
	async delegates(query) {
		const result = await __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_get).call(
			this,
			"delegates",
			__classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_createSearchParams).call(this, {
				limit: 101,
				...query,
			}),
		);
		return new platform_sdk_1.Collections.WalletDataCollection(
			result.data.map((wallet) => new wallet_dto_1.WalletData(wallet)),
			__classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_createPagination).call(
				this,
				result.data,
				result.meta,
			),
		);
	}
	async votes(id) {
		const { data } = await __classPrivateFieldGet(
			this,
			_ClientService_instances,
			"m",
			_ClientService_get,
		).call(this, "votes", { address: id, limit: 101 });
		return {
			used: data.votesUsed,
			available: data.votesAvailable,
			publicKeys: data.votes.map((vote) => vote.publicKey),
		};
	}
	async broadcast(transactions) {
		const result = {
			accepted: [],
			rejected: [],
			errors: {},
		};
		for (const transaction of transactions) {
			const { data, errors } = await __classPrivateFieldGet(
				this,
				_ClientService_instances,
				"m",
				_ClientService_post,
			).call(this, "transactions", transaction.toBroadcast());
			if (data) {
				result.accepted.push(transaction.id());
			}
			if (errors) {
				result.rejected.push(transaction.id());
				if (!Array.isArray(result.errors[transaction.id()])) {
					result.errors[transaction.id()] = [];
				}
				for (const [key, value] of Object.entries(
					__classPrivateFieldGet(this, _ClientService_broadcastErrors, "f"),
				)) {
					if (errors[0].message.includes(key)) {
						result.errors[transaction.id()].push(value);
					}
				}
			}
		}
		return result;
	}
};
(_ClientService_peer = new WeakMap()),
	(_ClientService_broadcastErrors = new WeakMap()),
	(_ClientService_instances = new WeakSet()),
	(_ClientService_get = async function _ClientService_get(path, query) {
		const response = await this.httpClient.get(
			`${__classPrivateFieldGet(this, _ClientService_peer, "f")}/${path}`,
			query,
		);
		return response.json();
	}),
	(_ClientService_post = async function _ClientService_post(path, body) {
		const response = await this.httpClient.post(
			`${__classPrivateFieldGet(this, _ClientService_peer, "f")}/${path}`,
			body,
		);
		return response.json();
	}),
	(_ClientService_createSearchParams = function _ClientService_createSearchParams(searchParams) {
		if (!searchParams) {
			searchParams = {};
		}
		if (searchParams.cursor) {
			// @ts-ignore
			searchParams.offset = searchParams.cursor - 1;
			delete searchParams.cursor;
		}
		// What is used as "address" with ARK is "senderIdOrRecipientId" with LSK.
		if (searchParams.address) {
			// @ts-ignore - This field doesn't exist on the interface but are needed.
			searchParams.senderIdOrRecipientId = searchParams.address;
			delete searchParams.address;
		}
		// LSK doesn't support bulk lookups so we will simply use the first address.
		if (searchParams.addresses) {
			// @ts-ignore - This field doesn't exist on the interface but are needed.
			searchParams.senderIdOrRecipientId = searchParams.addresses[0];
			delete searchParams.addresses;
		}
		return searchParams;
	}),
	(_ClientService_createPagination = function _ClientService_createPagination(data, meta) {
		const hasPreviousPage = data && data.length === meta.limit && meta.offset !== 0;
		const hasNextPage = data && data.length === meta.limit;
		return {
			prev: hasPreviousPage ? Number(meta.offset) - Number(meta.limit) : undefined,
			self: meta.offset,
			next: hasNextPage ? Number(meta.offset) + Number(meta.limit) : undefined,
			last: undefined,
		};
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
