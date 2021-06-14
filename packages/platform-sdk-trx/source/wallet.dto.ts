import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class WalletData extends DTO.AbstractWalletData implements Contracts.WalletData {
	public primaryKey(): string {
		return this.address();
	}

	public address(): string {
		return this.data.address;
	}

	public publicKey(): string | undefined {
		return undefined;
	}

	public balance(): Contracts.WalletBalance {
		const tokens = {};

		if (this.data.trc20) {
			for (const trc20 of Object.values(this.data.trc20) as any) {
				for (const [address, balance] of Object.entries(trc20)) {
					tokens[address] = BigNumber.make(balance as number).times(1e2);
				}
			}
		}

		const available = BigNumber.make(this.data.balance).times(1e2);

		return {
			available,
			fees: available,
			locked: this.data.frozen?.frozen_balance
				? BigNumber.make(this.data.frozen?.frozen_balance).times(1e2)
				: BigNumber.ZERO,
			tokens,
		};
	}

	public nonce(): BigNumber {
		return BigNumber.ZERO;
	}

	public secondPublicKey(): string | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, this.secondPublicKey.name);
	}

	public username(): string | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, this.username.name);
	}

	public rank(): number | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, this.rank.name);
	}

	public votes(): BigNumber | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, this.votes.name);
	}

	public multiSignature(): Contracts.WalletMultiSignature {
		throw new Exceptions.NotImplemented(this.constructor.name, this.multiSignature.name);
	}

	public isDelegate(): boolean {
		return false;
	}

	public isResignedDelegate(): boolean {
		return false;
	}

	public isMultiSignatureRegistration(): boolean {
		return false;
	}

	public isSecondSignature(): boolean {
		return false;
	}
}
