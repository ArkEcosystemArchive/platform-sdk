import TronWeb from "tronweb";

import { NotImplemented } from "../../exceptions";
import { KeyValuePair } from "../../types";
import { Crypto } from "../contracts/crypto";

export class Tron implements Crypto {
	readonly #connection: TronWeb;

	public constructor(network: string) {
		this.#connection = new TronWeb({
			fullHost: network, // todo: for tron we need a peer, not a network identifier
		});
	}

	public async createTransfer(data: KeyValuePair): Promise<object> {
		const transaction = await this.#connection.transactionBuilder.sendTrx(data.to, data.amount, data.from, 1);

		return this.#connection.trx.sign(transaction, data.privateKey);
	}

	public async createSecondSignature(data: KeyValuePair): Promise<object> {
		throw new NotImplemented(this.constructor.name, "createSecondSignature");
	}

	public async createDelegateRegistration(data: KeyValuePair): Promise<object> {
		throw new NotImplemented(this.constructor.name, "createDelegateRegistration");
	}

	public async createVote(data: KeyValuePair): Promise<object> {
		throw new NotImplemented(this.constructor.name, "createVote");
	}

	public async createMultiSignature(data: KeyValuePair): Promise<object> {
		throw new NotImplemented(this.constructor.name, "createMultiSignature");
	}

	public async createIpfs(data: KeyValuePair): Promise<object> {
		throw new NotImplemented(this.constructor.name, "createIpfs");
	}

	public async createMultiPayment(data: KeyValuePair): Promise<object> {
		throw new NotImplemented(this.constructor.name, "createMultiPayment");
	}

	public async createDelegateResignation(data: KeyValuePair): Promise<object> {
		throw new NotImplemented(this.constructor.name, "createDelegateResignation");
	}

	public async createHtlcLock(data: KeyValuePair): Promise<object> {
		throw new NotImplemented(this.constructor.name, "createHtlcLock");
	}

	public async createHtlcClaim(data: KeyValuePair): Promise<object> {
		throw new NotImplemented(this.constructor.name, "createHtlcClaim");
	}

	public async createHtlcRefund(data: KeyValuePair): Promise<object> {
		throw new NotImplemented(this.constructor.name, "createHtlcRefund");
	}
}
