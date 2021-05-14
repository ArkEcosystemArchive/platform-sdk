import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { get, has } from "dot-prop";

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
		return this.getProperty(["secondPublicKey", "attributes.secondPublicKey"]);
	}

	public username(): string | undefined {
		return this.getProperty(["username", "attributes.delegate.username"]);
	}

	public rank(): number | undefined {
		return this.getProperty(["rank", "attributes.delegate.rank"]);
	}

	public votes(): BigNumber | undefined {
		const balance: string | undefined = this.getProperty(["votes", "attributes.delegate.voteBalance"]);

		if (balance === undefined) {
			return undefined;
		}

		return BigNumber.make(balance);
	}

	public entities(): Contracts.Entity[] {
		return Object.entries(this.data.attributes?.entities || {}).map(([id, entity]: [string, any]) => ({
			id,
			type: entity.type,
			subType: entity.subType,
			name: entity.data.name,
			hash: entity.data.ipfsData,
		}));
	}

	public multiSignature(): Contracts.WalletMultiSignature {
		if (!this.isMultiSignature()) {
			throw new Error("This wallet does not have a multi-signature registered.");
		}

		return this.getProperty(["multiSignature", "attributes.multiSignature"]) as Contracts.WalletMultiSignature;
	}

	public isDelegate(): boolean {
		if (this.isResignedDelegate()) {
			return false;
		}

		return !!this.getProperty(["username", "attributes.delegate.username"]);
	}

	public isResignedDelegate(): boolean {
		return !!this.getProperty(["isResigned", "attributes.delegate.resigned"]);
	}

	public isMultiSignature(): boolean {
		return !!this.getProperty(["multiSignature", "attributes.multiSignature"]);
	}

	public isSecondSignature(): boolean {
		return !!this.getProperty(["secondPublicKey", "attributes.secondPublicKey"]);
	}

	private getProperty<T>(keys: string[]): T | undefined {
		for (const key of keys) {
			if (has(this.data, key)) {
				return get(this.data, key);
			}
		}

		return undefined;
	}
}
