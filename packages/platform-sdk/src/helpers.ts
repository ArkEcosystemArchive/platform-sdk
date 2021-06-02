import { Arr } from "@arkecosystem/platform-sdk-support";
import { Config, NetworkHost, NetworkHostType, TransactionDataCollection } from "./coins";
import { TransactionDataType } from "./contracts";
import { AbstractTransactionData } from "./dto";
import { MetaPagination } from "./services";

// TODO: following line unnecessary in TypeScript 4.3+
type AbstractConstructorParameters<T> = ConstructorParameters<(new (...args) => unknown) & T>;
type TransactionDataArgs = AbstractConstructorParameters<typeof AbstractTransactionData>;

export const createTransactionDataWithType = (args: TransactionDataArgs, dtos: Record<string, any>): TransactionDataType => {
	const instance: TransactionDataType = new dtos.TransactionData(...args);

	if (instance.isDelegateRegistration()) {
		return new dtos.DelegateRegistrationData(...args);
	}

	if (instance.isDelegateResignation()) {
		return new dtos.DelegateResignationData(...args);
	}

	if (instance.isHtlcClaim()) {
		return new dtos.HtlcClaimData(...args);
	}

	if (instance.isHtlcLock()) {
		return new dtos.HtlcLockData(...args);
	}

	if (instance.isHtlcRefund()) {
		return new dtos.HtlcRefundData(...args);
	}

	if (instance.isIpfs()) {
		return new dtos.IpfsData(...args);
	}

	if (instance.isMultiPayment()) {
		return new dtos.MultiPaymentData(...args);
	}

	if (instance.isMultiSignature()) {
		return new dtos.MultiSignatureData(...args);
	}

	if (instance.isSecondSignature()) {
		return new dtos.SecondSignatureData(...args);
	}

	if (instance.isTransfer()) {
		return new dtos.TransferData(...args);
	}

	if (instance.isVote()) {
		return new dtos.VoteData(...args);
	}

	if (instance.isUnvote()) {
		return new dtos.VoteData(...args);
	}

	return instance;
};

export const createTransactionDataCollectionWithType = (
	argsList: TransactionDataArgs[],
	meta: MetaPagination,
	classes: Record<string, any>,
): TransactionDataCollection =>
	new TransactionDataCollection(
		argsList.map((args) => createTransactionDataWithType(args, classes)),
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
