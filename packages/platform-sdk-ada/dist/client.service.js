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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const wallet_dto_1 = require("./wallet.dto");
const graphql_helpers_1 = require("./graphql-helpers");
const helpers_1 = require("./helpers");
let ClientService = class ClientService extends platform_sdk_1.Services.AbstractClientService {
	async transaction(id, input) {
		return this.dataTransferObjectService.transaction(
			await graphql_helpers_1.fetchTransaction(id, this.configRepository, this.httpClient),
		);
	}
	async transactions(query) {
		if (query.senderPublicKey === undefined) {
			throw new platform_sdk_1.Exceptions.MissingArgument(
				this.constructor.name,
				this.transactions.name,
				"senderPublicKey",
			);
		}
		const { usedSpendAddresses, usedChangeAddresses } = await helpers_1.usedAddressesForAccount(
			this.configRepository,
			this.httpClient,
			query.senderPublicKey,
		);
		const transactions = await graphql_helpers_1.fetchTransactions(
			this.configRepository,
			this.httpClient,
			Array.from(usedSpendAddresses.values()).concat(Array.from(usedChangeAddresses.values())),
		);
		return this.dataTransferObjectService.transactions(transactions, {
			prev: undefined,
			self: undefined,
			next: undefined,
			last: undefined,
		});
	}
	async wallet(id) {
		const { usedSpendAddresses, usedChangeAddresses } = await helpers_1.usedAddressesForAccount(
			this.configRepository,
			this.httpClient,
			id,
		);
		const balance = await graphql_helpers_1.fetchUtxosAggregate(
			this.configRepository,
			this.httpClient,
			Array.from(usedSpendAddresses.values()).concat(Array.from(usedChangeAddresses.values())),
		);
		return new wallet_dto_1.WalletData({
			id,
			balance,
		});
	}
	async broadcast(transactions) {
		const result = {
			accepted: [],
			rejected: [],
			errors: {},
		};
		for (const transaction of transactions) {
			try {
				await graphql_helpers_1.submitTransaction(
					this.configRepository,
					this.httpClient,
					transaction.toBroadcast(),
				);
				result.accepted.push(transaction.id());
			} catch (error) {
				result.rejected.push(transaction.id());
				result.errors[transaction.id()] = error.message;
			}
		}
		return result;
	}
};
ClientService = __decorate([platform_sdk_1.IoC.injectable()], ClientService);
exports.ClientService = ClientService;
//# sourceMappingURL=client.service.js.map
