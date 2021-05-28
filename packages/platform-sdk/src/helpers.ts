import { Arr } from "@arkecosystem/platform-sdk-support";
import { Config, NetworkHost, NetworkHostType, TransactionDataCollection } from "./coins";
import { MetaPagination, TransactionDataType } from "./contracts";

export const createTransactionDataWithType = (transaction: unknown, dtos: Record<string, any>): TransactionDataType => {
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

	return instance;
};

export const createTransactionDataCollectionWithType = (
	transactions: unknown[],
	meta: MetaPagination,
	classes: Record<string, any>,
): TransactionDataCollection =>
	new TransactionDataCollection(
		transactions.map((transaction) => createTransactionDataWithType(transaction, classes)),
		meta,
	);

export const filterHosts = (hosts: NetworkHost[], type: NetworkHostType): NetworkHost[] =>
	hosts.filter((host: NetworkHost) => host.type === type);

export const randomHost = (hosts: NetworkHost[], type: NetworkHostType): NetworkHost =>
	Arr.randomElement(filterHosts(hosts, type));

// DRY helpers for coin implementations
export const filterHostsFromConfig = (config: Config, type: NetworkHostType): NetworkHost[] =>
	filterHosts(config.get<NetworkHost[]>("network.hosts"), type);

export const randomNetworkHostFromConfig = (config: Config, type: NetworkHostType = "full"): NetworkHost =>
	randomHost(config.get<NetworkHost[]>("network.hosts"), type);

export const randomHostFromConfig = (config: Config, type: NetworkHostType = "full"): string =>
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
