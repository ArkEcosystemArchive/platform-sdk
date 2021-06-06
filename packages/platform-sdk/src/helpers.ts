import { Arr } from "@arkecosystem/platform-sdk-support";
import { BigNumber, NumberLike } from "@arkecosystem/platform-sdk-support";
import { ConfigRepository } from "./coins";
import { NetworkHost, NetworkHostType } from "./networks";
import { TransactionDataCollection } from "./collections";
import { TransactionDataType } from "./contracts";
import { AbstractTransactionData } from "./dto";
import { MetaPagination } from "./services";

export const createTransactionDataWithType = (
	transaction: unknown,
	dtos: Record<string, any>,
): TransactionDataType & AbstractTransactionData => {
	const instance: TransactionDataType = new dtos.TransactionData(transaction);

	if (instance.isDelegateRegistration()) {
		return new dtos.DelegateRegistrationData(transaction);
	}

	if (instance.isDelegateResignation()) {
		return new dtos.DelegateResignationData(transaction);
	}

	if (instance.isHtlcClaim()) {
		return new dtos.HtlcClaimData(transaction);
	}

	if (instance.isHtlcLock()) {
		return new dtos.HtlcLockData(transaction);
	}

	if (instance.isHtlcRefund()) {
		return new dtos.HtlcRefundData(transaction);
	}

	if (instance.isIpfs()) {
		return new dtos.IpfsData(transaction);
	}

	if (instance.isMultiPayment()) {
		return new dtos.MultiPaymentData(transaction);
	}

	if (instance.isMultiSignature()) {
		return new dtos.MultiSignatureData(transaction);
	}

	if (instance.isSecondSignature()) {
		return new dtos.SecondSignatureData(transaction);
	}

	if (instance.isTransfer()) {
		return new dtos.TransferData(transaction);
	}

	if (instance.isVote()) {
		return new dtos.VoteData(transaction);
	}

	if (instance.isUnvote()) {
		return new dtos.VoteData(transaction);
	}

	return instance as AbstractTransactionData;
};

export const createTransactionDataCollectionWithType = (
	transactions: unknown[],
	meta: MetaPagination,
	classes: Record<string, any>,
	decimals?: number | string,
): TransactionDataCollection =>
	new TransactionDataCollection(
		transactions.map((transaction) => createTransactionDataWithType(transaction, classes).withDecimals(decimals)),
		meta,
	);

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
