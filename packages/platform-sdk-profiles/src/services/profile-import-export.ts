import { Profile } from "../profiles/profile";
import { ProfileExportOptions } from "../profiles/profile.models";
import { WalletRepository } from "../repositories/wallet-repository";

export class ProfileImportExport {
	public static import(data: string): Profile {
		return ProfileImportExport.fromProfileInput(data);
	}

	public static export(profile: Profile, options: ProfileExportOptions): { data; passwordHash } {
		const dumped = profile.dump();
		return {
			data: dumped.data,
			passwordHash: dumped.password,
		};
	}

	public static filter(profile: Profile, options: ProfileExportOptions): Profile {
		const editableProfile: Profile = profile.clone();
		// console.log("copy", editableProfile.wallets().keys(), profile.wallets().keys());

		const wallets: WalletRepository = editableProfile.wallets();
		// console.log("copy", editableProfile.dump(), wallets.keys());

		for (const walletKey in wallets.keys()) {
			const wallet = wallets.findById(walletKey);
			console.log('network', wallet.network());

			if (options.excludeEmptyWallets && wallet.balance().isZero()) {
				wallets.forget(walletKey);
			} else if (options.excludeWalletsWithoutName && wallet.displayName()?.length === 0) {
				wallets.forget(walletKey);
			} else if (options.excludeLedgerWallets && wallet.isLedger()) {
				wallets.forget(walletKey);
			}

			if (!options.saveGeneralSettings) {
				editableProfile.settings().flush();
			}
		}

		return editableProfile;
	}

	private static fromProfileInput(data: string): Profile {
		return new Profile({
			data: "",
			id: "",
			name: "",
		});
	}
}
