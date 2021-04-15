import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";

import { UnspentTransaction } from "./transaction.models";

const postGraphql = async (config: Coins.Config, query: string): Promise<Record<string, any>> => {
	const response = await config
		.get<Contracts.HttpClient>("httpClient")
		.post(Arr.randomElement(config.get<string[]>("network.networking.hosts")), { query });

	const json = response.json();

	if (json.errors) {
		throw Error(json.errors);
	}

	return json.data;
};

export const submitTransaction = async (toBroadcast: string, config: Coins.Config): Promise<string> => {
	return ((await postGraphql(
		config,
		`mutation { submitTransaction(transaction: "${toBroadcast}") { hash } }`,
	)) as any).hash;
};

export const fetchTransaction = async (id: string, config: Coins.Config): Promise<object[]> => {
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
				}
			}`;

	return (await postGraphql(config, query)).transactions[0];
};

export const fetchTransactions = async (addresses: string[], config: Coins.Config): Promise<object[]> => {
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
				}
			}`;

	return ((await postGraphql(config, query)) as any).transactions;
};

export const fetchNetworkTip = async (config: Coins.Config): Promise<number> => {
	const query = `{ cardano { tip { slotNo } } }`;

	return parseInt(((await postGraphql(config, query)) as any).cardano.tip.slotNo);
};

export const fetchUsedAddressesData = async (config: Coins.Config, addresses: string[]): Promise<string[]> => {
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
	return ((await postGraphql(config, query)) as any).transactions
		.flatMap((tx) => tx.inputs.map((i) => i.address).concat(tx.outputs.map((o) => o.address)))
		.sort();
};

export const listUnspentTransactions = async (
	addresses: string[],
	config: Coins.Config,
): Promise<UnspentTransaction[]> => {
	return (
		await postGraphql(
			config,
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

export const fetchUtxosAggregate = async (addresses: string[], config: Coins.Config): Promise<string> => {
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
	return ((await postGraphql(config, query)) as any).utxos_aggregate.aggregate.sum.value;
};
