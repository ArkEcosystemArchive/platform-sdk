import { Contracts, DTO, IoC } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { get, has } from "dot-prop";

@IoC.injectable()
export class WalletData extends DTO.AbstractWalletData implements Contracts.WalletData {
	public primaryKey(): string {
		return this.address();
	}

	public address(): string {
		return this.data.address;
	}

	public publicKey(): string | undefined {
		return this.data.publicKey;
	}

	public balance(): Contracts.WalletBalance {
		return {
			available: BigNumber.make(this.data.balance),
			fees: BigNumber.make(this.data.balance),
		};
	}

	public nonce(): BigNumber {
		return BigNumber.make(this.data.nonce);
	}

	public secondPublicKey(): string | undefined {
		return this.#getProperty(["secondPublicKey", "attributes.secondPublicKey"]);
	}

	public username(): string | undefined {
		return this.#getProperty(["username", "attributes.delegate.username"]);
	}

	public rank(): number | undefined {
		return this.#getProperty(["rank", "attributes.delegate.rank"]);
	}

	public votes(): BigNumber | undefined {
		const balance: string | undefined = this.#getProperty(["votes", "attributes.delegate.voteBalance"]);

		if (balance === undefined) {
			return undefined;
		}

		return BigNumber.make(balance);
	}

	public multiSignature(): Contracts.WalletMultiSignature {
		if (!this.isMultiSignatureRegistration()) {
			throw new Error("This wallet does not have a multi-signature registered.");
		}

		return this.#getProperty(["multiSignature", "attributes.multiSignature"]) as Contracts.WalletMultiSignature;
	}

	public isDelegate(): boolean {
		if (this.isResignedDelegate()) {
			return false;
		}

		return !!this.#getProperty(["username", "attributes.delegate.username"]);
	}

	public isResignedDelegate(): boolean {
		return !!this.#getProperty(["isResigned", "attributes.delegate.resigned"]);
	}

	public isMultiSignatureRegistration(): boolean {
		return !!this.#getProperty(["multiSignature", "attributes.multiSignature"]);
	}

	public isSecondSignature(): boolean {
		return !!this.#getProperty(["secondPublicKey", "attributes.secondPublicKey"]);
	}

	#getProperty<T>(keys: string[]): T | undefined {
		for (const key of keys) {
			if (has(this.data, key)) {
				return get(this.data, key);
			}
		}

		return undefined;
	}
}
