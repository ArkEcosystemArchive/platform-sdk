import { Managers, Transactions } from "@arkecosystem/crypto";

import { KeyValuePair } from "../../types";
import { Crypto } from "../contracts/crypto";

export class Ark implements Crypto {
	public constructor(network: string) {
		Managers.configManager.setFromPreset(network as any);
		Managers.configManager.setHeight(10_000_000);
	}

	public createTransfer(data: KeyValuePair): object {
		return this.createFromData("transfer", data, ({ transaction, data }) => {
			transaction.recipientId(data.recipientId);

			if (data.vendorField) {
				transaction.vendorField(data.vendorField);
			}
		});
	}

	public createSecondSignature(data: KeyValuePair): object {
		return this.createFromData("secondSignature", data, ({ transaction, data }) =>
			transaction.signatureAsset(data.secondSignature),
		);
	}

	public createDelegateRegistration(data: KeyValuePair): object {
		return this.createFromData("delegateRegistration", data, ({ transaction, data }) =>
			transaction.usernameAsset(data.asset),
		);
	}

	public createVote(data: KeyValuePair): object {
		return this.createFromData("vote", data, ({ transaction, data }) => transaction.votesAsset(data.asset));
	}

	public createMultiSignature(data: KeyValuePair): object {
		return this.createFromData("multiSignature", data, ({ transaction, data }) => {
			transaction.multiSignatureAsset(data.asset);

			transaction.senderPublicKey(data.senderPublicKey);
		});
	}

	public createIpfs(data: KeyValuePair): object {
		return this.createFromData("ipfs", data, ({ transaction, data }) => transaction.ipfsAsset(data.asset));
	}

	public createMultiPayment(data: KeyValuePair): object {
		return this.createFromData("multiPayment", data, ({ transaction, data }) => {
			for (const payment of data.payments) {
				transaction.addPayment(payment.recipientId, payment.amount);
			}
		});
	}

	public createDelegateResignation(data: KeyValuePair): object {
		return this.createFromData("delegateResignation", data);
	}

	public createHtlcLock(data: KeyValuePair): object {
		return this.createFromData("htlcLock", data, ({ transaction, data }) => {
			transaction.amount(data.amount);

			transaction.recipientId(data.recipientId);

			transaction.htlcLockAsset(data.asset);
		});
	}

	public createHtlcClaim(data: KeyValuePair): object {
		return this.createFromData("htlcClaim", data, ({ transaction, data }) =>
			transaction.htlcClaimAsset(data.asset),
		);
	}

	public createHtlcRefund(data: KeyValuePair): object {
		return this.createFromData("htlcRefund", data, ({ transaction, data }) =>
			transaction.htlcRefundAsset(data.asset),
		);
	}

	private createFromData(type: string, data: KeyValuePair, callback?: Function): object {
		const transaction = Transactions.BuilderFactory[type]().version(2).nonce(data.nonce);

		if (data.amount) {
			transaction.amount(data.amount);
		}

		if (data.fee) {
			transaction.fee(data.fee);
		}

		if (callback) {
			callback({ transaction, data });
		}

		if (Array.isArray(data.passphrases)) {
			for (let i = 0; i < data.passphrases.length; i++) {
				transaction.multiSign(data.passphrases[i], i);
			}
		}

		if (data.passphrase) {
			transaction.sign(data.passphrase);
		}

		if (data.secondPassphrase) {
			transaction.secondSign(data.secondPassphrase);
		}

		if (data.wif) {
			transaction.signWithWif(data.wif);
		}

		if (data.secondWif) {
			transaction.secondSignWithWif(data.secondWif);
		}

		return transaction.build().toJson();
	}
}
