import { Coins } from "@arkecosystem/platform-sdk";

import { ClientService } from "./services/client";
import { FeeService } from "./services/fee";
import { IdentityService } from "./services/identity";
import { KnownWalletService } from "./services/known-wallets";
import { LedgerService } from "./services/ledger";
import { LinkService } from "./services/link";
import { MessageService } from "./services/message";
import { MultiSignatureService } from "./services/multi-signature";
import { PeerService } from "./services/peer";
import { TransactionService } from "./services/transaction";

export class ServiceProvider {
	public static async make(coin: Coins.CoinSpec, config: Coins.Config): Promise<Coins.CoinServices> {
		const [client, fee, identity, knownWallets, ledger, link, message, multiSignature, peer, transaction] = await Promise.all([
			ClientService.construct(config),
			FeeService.construct(config),
			IdentityService.construct(config),
			KnownWalletService.construct(config),
			LedgerService.construct(config),
			LinkService.construct(config),
			MessageService.construct(config),
			MultiSignatureService.construct(config),
			PeerService.construct(config),
			TransactionService.construct(config),
		]);

		return {
			client,
			fee,
			identity,
			knownWallets,
			ledger,
			link,
			message,
			multiSignature,
			peer,
			transaction,
		};
	}
}
