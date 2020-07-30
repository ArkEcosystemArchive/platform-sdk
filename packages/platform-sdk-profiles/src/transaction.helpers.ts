import { Coins } from "@arkecosystem/platform-sdk";

import { TransactionData } from "./transaction";
import * as TransactionTypes from "./transactions";

export const createTransactionDataCollection = ({ meta, data }, wallet) => ({
	meta,
	data: new Coins.TransactionDataCollection(
		data.all().map((transaction) => {
			const instance = new TransactionData(transaction, wallet);

			if (instance.isTransfer()) {
				return new TransactionTypes.Transfer(transaction, wallet);
			}

			if (instance.isSecondSignature()) {
				return new TransactionTypes.SecondSignature(transaction, wallet);
			}

			if (instance.isDelegateRegistration()) {
				return new TransactionTypes.DelegateRegistration(transaction, wallet);
			}

			if (instance.isVote()) {
				return new TransactionTypes.Vote(transaction, wallet);
			}

			if (instance.isUnvote()) {
				return new TransactionTypes.Unvote(transaction, wallet);
			}

			if (instance.isMultiSignature()) {
				return new TransactionTypes.MultiSignature(transaction, wallet);
			}

			if (instance.isIpfs()) {
				return new TransactionTypes.Ipfs(transaction, wallet);
			}

			if (instance.isMultiPayment()) {
				return new TransactionTypes.MultiPayment(transaction, wallet);
			}

			if (instance.isDelegateResignation()) {
				return new TransactionTypes.DelegateResignation(transaction, wallet);
			}

			if (instance.isHtlcLock()) {
				return new TransactionTypes.HtlcLock(transaction, wallet);
			}

			if (instance.isHtlcClaim()) {
				return new TransactionTypes.HtlcClaim(transaction, wallet);
			}

			if (instance.isHtlcRefund()) {
				return new TransactionTypes.HtlcRefund(transaction, wallet);
			}

			if (instance.isBusinessRegistration()) {
				return new TransactionTypes.BusinessRegistration(transaction, wallet);
			}

			if (instance.isBusinessResignation()) {
				return new TransactionTypes.BusinessResignation(transaction, wallet);
			}

			if (instance.isBusinessUpdate()) {
				return new TransactionTypes.BusinessUpdate(transaction, wallet);
			}

			if (instance.isBridgechainRegistration()) {
				return new TransactionTypes.BridgechainRegistration(transaction, wallet);
			}

			if (instance.isBridgechainResignation()) {
				return new TransactionTypes.BridgechainResignation(transaction, wallet);
			}

			if (instance.isBridgechainUpdate()) {
				return new TransactionTypes.BridgechainUpdate(transaction, wallet);
			}

			if (instance.isEntityRegistration()) {
				return new TransactionTypes.EntityRegistration(transaction, wallet);
			}

			if (instance.isEntityResignation()) {
				return new TransactionTypes.EntityResignation(transaction, wallet);
			}

			if (instance.isEntityUpdate()) {
				return new TransactionTypes.EntityUpdate(transaction, wallet);
			}

			return instance;
		}),
	),
});
