import { Arr } from "@arkecosystem/platform-sdk-support";
import { BigNumber, NumberLike } from "@arkecosystem/platform-sdk-support";
import { ConfigRepository } from "./coins";
import { NetworkHost, NetworkHostType } from "./networks";

export const filterHosts = (hosts: NetworkHost[], type: NetworkHostType): NetworkHost[] =>
	hosts.filter((host: NetworkHost) => host.type === type);

export const randomHost = (hosts: NetworkHost[], type: NetworkHostType): NetworkHost =>
	Arr.randomElement(filterHosts(hosts, type));

// DRY helpers for coin implementations
export const filterHostsFromConfig = (config: ConfigRepository, type: NetworkHostType): NetworkHost[] =>
	filterHosts(config.get<NetworkHost[]>("network.hosts"), type);

export const randomNetworkHostFromConfig = (config: ConfigRepository, type: NetworkHostType = "full"): NetworkHost =>
	randomHost(config.get<NetworkHost[]>("network.hosts"), type);

export const randomHostFromConfig = (config: ConfigRepository, type: NetworkHostType = "full"): string =>
	randomNetworkHostFromConfig(config, type).host;

export const pluckAddress = (query): string => {
	if (query.senderId) {
		return query.senderId;
	}

	if (query.recipientId) {
		return query.recipientId;
	}

	if (query.address) {
		return query.address;
	}

	if (Array.isArray(query.addresses) && query.addresses[0]) {
		return query.addresses[0];
	}

	throw new Error("Failed to pluck any address.");
};

export const toRawUnit = (value: NumberLike, config: ConfigRepository) => {
	const decimals = config.get<number>("network.currency.decimals");
	const denomination = BigNumber.make(`1${"0".repeat(decimals)}`); // poor man's bigint exponentiation
	return denomination.times(value);
};
