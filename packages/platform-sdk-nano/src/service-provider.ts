import { Coins } from "@arkecosystem/platform-sdk";

import { ClientService } from "./services/client";
import { DataTransferObjectService } from "./services/data-transfer-object";
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
		const [
			client,
			dataTransferObject,
			fee,
			identity,
			knownWallets,
			ledger,
			link,
			message,
			multiSignature,
			peer,
			transaction,
		] = await Promise.all([
			ClientService.__construct(config) as any,
			DataTransferObjectService.__construct(config),
			FeeService.__construct(config),
			IdentityService.__construct(config),
			KnownWalletService.__construct(config),
			LedgerService.__construct(config),
			LinkService.__construct(config),
			MessageService.__construct(config),
			MultiSignatureService.__construct(config),
			PeerService.__construct(config),
			TransactionService.__construct(config),
		]);

		return {
			client,
			dataTransferObject,
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
