import { Coins, Helpers } from "@arkecosystem/platform-sdk";
import { HttpClient } from "@arkecosystem/platform-sdk-http";

import { UnspentTransaction } from "./transaction.models";

const postGraphql = async (
	config: Coins.ConfigRepository,
	httpClient: HttpClient,
	query: string,
): Promise<Record<string, any>> => {
	const response = await httpClient.post(Helpers.randomHostFromConfig(config), { query });

	const json = response.json();

	if (json.errors) {
		throw Error(json.errors);
	}

	return json.data;
};

export const submitTransaction = async (
	config: Coins.ConfigRepository,
	httpClient: HttpClient,
	toBroadcast: string,
): Promise<string> => {
	return (
		await postGraphql(config, httpClient, `mutation { submitTransaction(transaction: "${toBroadcast}") { hash } }`)
	).hash;
};

export const fetchTransaction = async (
	id: string,
	config: Coins.ConfigRepository,
	httpClient: HttpClient,
): Promise<object[]> => {
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

export const fetchTransactions = async (
	config: Coins.ConfigRepository,
	httpClient: HttpClient,
	addresses: string[],
): Promise<object[]> => {
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

export const fetchNetworkTip = async (config: Coins.ConfigRepository, httpClient: HttpClient): Promise<number> => {
	const query = `{ cardano { tip { slotNo } } }`;

	return parseInt((await postGraphql(config, httpClient, query)).cardano.tip.slotNo);
};

export const fetchUsedAddressesData = async (
	config: Coins.ConfigRepository,
	httpClient: HttpClient,
	addresses: string[],
): Promise<string[]> => {
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

export const listUnspentTransactions = async (
	config: Coins.ConfigRepository,
	httpClient: HttpClient,
	addresses: string[],
): Promise<UnspentTransaction[]> => {
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

export const fetchUtxosAggregate = async (
	config: Coins.ConfigRepository,
	httpClient: HttpClient,
	addresses: string[],
): Promise<string> => {
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
