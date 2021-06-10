/* istanbul ignore file */

import { WalletData } from "../contracts";
import { NotImplemented } from "../exceptions";
import { inject, injectable } from "../ioc";
import { BindingType } from "../ioc/service-provider.contract";
import { DataTransferObjectService } from "./data-transfer-object.contract";
import { LedgerService, LedgerTransport, LedgerWalletList } from "./ledger.contract";

@injectable()
export class AbstractLedgerService implements LedgerService {
	@inject(BindingType.DataTransferObjectService)
	private readonly dataTransferObjectService!: DataTransferObjectService;

	public async __destruct(): Promise<void> {
		await this.disconnect();
	}

	public async connect(transport: LedgerTransport): Promise<void> {
		throw new NotImplemented(this.constructor.name, this.connect.name);
	}

	public async disconnect(): Promise<void> {
		throw new NotImplemented(this.constructor.name, this.disconnect.name);
	}

	public async getVersion(): Promise<string> {
		throw new NotImplemented(this.constructor.name, this.getVersion.name);
	}

	public async getPublicKey(path: string): Promise<string> {
		throw new NotImplemented(this.constructor.name, this.getPublicKey.name);
	}

	public async getExtendedPublicKey(path: string): Promise<string> {
		throw new NotImplemented(this.constructor.name, this.getExtendedPublicKey.name);
	}

	public async signTransaction(path: string, payload: Buffer): Promise<string> {
		throw new NotImplemented(this.constructor.name, this.signTransaction.name);
	}

	public async signMessage(path: string, payload: Buffer): Promise<string> {
		throw new NotImplemented(this.constructor.name, this.signMessage.name);
	}

	public async scan(options?: { useLegacy: boolean }): Promise<LedgerWalletList> {
		throw new NotImplemented(this.constructor.name, this.scan.name);
	}

	protected mapPathsToWallets(
		addressCache: Record<string, { address: string; publicKey: string }>,
		wallets: WalletData[],
	): LedgerWalletList {
		let foundFirstCold = false;
		const ledgerWallets: LedgerWalletList = {};

		for (const [path, { address, publicKey }] of Object.entries(addressCache)) {
			const matchingWallet: WalletData | undefined = wallets.find(
				(wallet: WalletData) => wallet.address() === address,
			);

			if (matchingWallet === undefined) {
				if (foundFirstCold) {
					continue;
				}
				foundFirstCold = true;

				ledgerWallets[path] = this.dataTransferObjectService.wallet({
					address,
					publicKey,
					balance: 0,
				});
			} else {
				ledgerWallets[path] = matchingWallet;
			}
		}
		return ledgerWallets;
	}
}
