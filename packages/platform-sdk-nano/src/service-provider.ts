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
import { SignatoryService } from "./services/signatory";
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
			signatory,
			transaction,
		] = await Promise.all<any>([
			ClientService.__construct(config),
			DataTransferObjectService.__construct(config),
			FeeService.__construct(config),
			IdentityService.__construct(config),
			KnownWalletService.__construct(config),
			LedgerService.__construct(config),
			LinkService.__construct(config),
			MessageService.__construct(config),
			MultiSignatureService.__construct(config),
			PeerService.__construct(config),
			SignatoryService.__construct(config),
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
			signatory,
			transaction,
		};
	}
}
