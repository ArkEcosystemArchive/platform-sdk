"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUtxosAggregate = exports.listUnspentTransactions = exports.fetchUsedAddressesData = exports.fetchNetworkTip = exports.fetchTransactions = exports.fetchTransaction = exports.submitTransaction = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const postGraphql = async (config, httpClient, query) => {
	const response = await httpClient.post(platform_sdk_1.Helpers.randomHostFromConfig(config), { query });
	const json = response.json();
	if (json.errors) {
		throw Error(json.errors);
	}
	return json.data;
};
const submitTransaction = async (config, httpClient, toBroadcast) => {
	return (
		await postGraphql(config, httpClient, `mutation { submitTransaction(transaction: "${toBroadcast}") { hash } }`)
	).hash;
};
exports.submitTransaction = submitTransaction;
const fetchTransaction = async (id, config, httpClient) => {
	const query = `
			{
				transactions(
						where: {
							hash: {
								_eq: "${id}"
							}
						}
					) {
						hash
						includedAt
						fee
						inputs {
							sourceTransaction {
       					hash
      				}
						  value
							address
						}
						outputs {
						  index
						  value
							address
					}
				}
			}`;
	return (await postGraphql(config, httpClient, query)).transactions[0];
};
exports.fetchTransaction = fetchTransaction;
const fetchTransactions = async (config, httpClient, addresses) => {
	const query = `
			{
				transactions(
					where: {
						_or: [
							{
								inputs: {
									address: {
										_in: [
											${addresses.map((a) => '"' + a + '"').join("\n")}
										]
									}
								}
							}
							{
							outputs: {
								address: {
										_in: [
											${addresses.map((a) => '"' + a + '"').join("\n")}
										]
									}
								}
							}
						]
					}
					) {
						hash
						includedAt
						fee
						inputs {
							sourceTransaction {
       					hash
      				}
						  value
							address
						}
						outputs {
						  index
						  value
							address
						}
				}
			}`;
	return (await postGraphql(config, httpClient, query)).transactions;
};
exports.fetchTransactions = fetchTransactions;
const fetchNetworkTip = async (config, httpClient) => {
	const query = `{ cardano { tip { slotNo } } }`;
	return parseInt((await postGraphql(config, httpClient, query)).cardano.tip.slotNo);
};
exports.fetchNetworkTip = fetchNetworkTip;
const fetchUsedAddressesData = async (config, httpClient, addresses) => {
	const query = `
			{
				transactions(
					where: {
						_or: [
							{
								inputs: {
									address: {
										_in: [
											${addresses.map((a) => '"' + a + '"').join("\n")}
										]
									}
								}
							}
							{
							outputs: {
								address: {
										_in: [
											${addresses.map((a) => '"' + a + '"').join("\n")}
										]
									}
								}
							}
						]
					}
				) {
					inputs {
						address
					}
					outputs {
						address
					}
				}
			}`;
	return (await postGraphql(config, httpClient, query)).transactions
		.flatMap((tx) => tx.inputs.map((i) => i.address).concat(tx.outputs.map((o) => o.address)))
		.sort();
};
exports.fetchUsedAddressesData = fetchUsedAddressesData;
const listUnspentTransactions = async (config, httpClient, addresses) => {
	return (
		await postGraphql(
			config,
			httpClient,
			`{
				utxos(
				  where: {
					  address: {
							_in: [
								${addresses.map((a) => '"' + a + '"').join("\n")}
							]
					  }
				  }
				  order_by: { value: desc }
				) {
				  address
				  index
				  txHash
				  value
				}
			}`,
		)
	).utxos;
};
exports.listUnspentTransactions = listUnspentTransactions;
const fetchUtxosAggregate = async (config, httpClient, addresses) => {
	const query = `
			{
				utxos_aggregate(
					where: {
						address: {
							_in: [
								${addresses.map((a) => '"' + a + '"').join("\n")}
							]
						}
					}
				) {
					aggregate {
						sum {
							value
						}
					}
				}
			}`;
	return (await postGraphql(config, httpClient, query)).utxos_aggregate.aggregate.sum.value;
};
exports.fetchUtxosAggregate = fetchUtxosAggregate;
//# sourceMappingURL=graphql-helpers.js.map
