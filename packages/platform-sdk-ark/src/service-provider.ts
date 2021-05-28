import { Managers } from "@arkecosystem/crypto";
import { Coins, Contracts, Helpers } from "@arkecosystem/platform-sdk";

import { ClientService } from "./services/client";
import { DataTransferObjectService } from "./services/data-transfer-object";
import { FeeService } from "./services/fee";
import { IdentityService } from "./services/identity";
import { KnownWalletService } from "./services/known-wallets";
import { LedgerService } from "./services/ledger";
import { LinkService } from "./services/link";
import { MessageService } from "./services/message";
import { MultiSignatureService } from "./services/multi-signature";
import { SignatoryService } from "./services/signatory";
import { TransactionService } from "./services/transaction";

export class ServiceProvider {
	public static async make(coin: Coins.CoinSpec, config: Coins.Config): Promise<Coins.CoinServices> {
		config.set("NETWORK_CONFIGURATION", await ServiceProvider.retrieveNetworkConfiguration(config));

		const multiSignature = await MultiSignatureService.__construct(config);

		const [
			client,
			dataTransferObject,
			fee,
			identity,
			knownWallets,
			ledger,
			link,
			message,
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
			signatory,
			transaction,
		};
	}

	private static async retrieveNetworkConfiguration(config: Coins.Config): Promise<{ crypto; peer; status }> {
		const http: Contracts.HttpClient = config.get<Contracts.HttpClient>(Coins.ConfigKey.HttpClient);

		let peer: string = Helpers.randomHostFromConfig(config, "full").host;

		const [crypto, status] = await Promise.all([
			http.get(`${peer}/node/configuration/crypto`),
			http.get(`${peer}/node/syncing`),
		]);

		const dataCrypto = crypto.json().data;
		const dataStatus = status.json().data;

		if (dataCrypto.network.client.token !== config.get(Coins.ConfigKey.CurrencyTicker)) {
			throw new Error(`Failed to connect to ${peer} because it is on another network.`);
		}

		Managers.configManager.setConfig(dataCrypto);
		Managers.configManager.setHeight(dataStatus.height);

		return { crypto: dataCrypto, peer, status: dataStatus };
	}
}
