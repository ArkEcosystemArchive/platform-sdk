import { Managers, Transactions } from "@arkecosystem/crypto";
import { Contracts } from "@arkecosystem/platform-sdk";

export class TransactionService implements Contracts.TransactionService {
	public constructor(network: string) {
		Managers.configManager.setFromPreset(network as any);
		Managers.configManager.setHeight(10_000_000);
	}

	public async createTransfer(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		return this.createFromData("transfer", data, ({ transaction, data }) => {
			transaction.recipientId(data.recipientId);

			if (data.vendorField) {
				transaction.vendorField(data.vendorField);
			}
		});
	}

	public async createSecondSignature(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		return this.createFromData("secondSignature", data, ({ transaction, data }) =>
			transaction.signatureAsset(data.secondSignature),
		);
	}

	public async createDelegateRegistration(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		return this.createFromData("delegateRegistration", data, ({ transaction, data }) =>
			transaction.usernameAsset(data.asset),
		);
	}

	public async createVote(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		return this.createFromData("vote", data, ({ transaction, data }) => transaction.votesAsset(data.asset));
	}

	public async createMultiSignature(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		return this.createFromData("multiSignature", data, ({ transaction, data }) => {
			transaction.multiSignatureAsset(data.asset);

			transaction.senderPublicKey(data.senderPublicKey);
		});
	}

	public async createIpfs(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		return this.createFromData("ipfs", data, ({ transaction, data }) => transaction.ipfsAsset(data.asset));
	}

	public async createMultiPayment(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		return this.createFromData("multiPayment", data, ({ transaction, data }) => {
			for (const payment of data.payments) {
				transaction.addPayment(payment.recipientId, payment.amount);
			}
		});
	}

	public async createDelegateResignation(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		return this.createFromData("delegateResignation", data);
	}

	public async createHtlcLock(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		return this.createFromData("htlcLock", data, ({ transaction, data }) => {
			transaction.amount(data.amount);

			transaction.recipientId(data.recipientId);

			transaction.htlcLockAsset(data.asset);
		});
	}

	public async createHtlcClaim(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		return this.createFromData("htlcClaim", data, ({ transaction, data }) =>
			transaction.htlcClaimAsset(data.asset),
		);
	}

	public async createHtlcRefund(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		return this.createFromData("htlcRefund", data, ({ transaction, data }) =>
			transaction.htlcRefundAsset(data.asset),
		);
	}

	private async createFromData(type: string, data: Contracts.KeyValuePair, callback?: Function): Promise<Contracts.SignedTransaction> {
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
