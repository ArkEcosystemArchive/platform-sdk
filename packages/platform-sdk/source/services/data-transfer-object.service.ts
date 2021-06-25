/* istanbul ignore file */

import { get } from "dot-prop";

import { ConfigKey, ConfigRepository } from "../coins";
import { ConfirmedTransactionDataCollection } from "../collections";
import { WalletData } from "../contracts";
import * as DataTransferObjects from "../dto";
import { ConfirmedTransactionData } from "../dto/confirmed-transaction.contract";
import { SignedTransactionData } from "../dto/signed-transaction.contract";
import { Container, inject, injectable } from "../ioc";
import { BindingType } from "../ioc/service-provider.contract";
import { MetaPagination } from "./client.contract";
import { DataTransferObjectService } from "./data-transfer-object.contract";

@injectable()
export class AbstractDataTransferObjectService implements DataTransferObjectService {
	// @TODO: rework so that the container is not needed, this is a weird setup
	@inject(BindingType.Container)
	protected readonly container!: Container;

	@inject(BindingType.ConfigRepository)
	protected readonly configRepository!: ConfigRepository;

	@inject(BindingType.DataTransferObjects)
	protected readonly dataTransferObjects!: Record<string, any>;

	public signedTransaction(identifier: string, signedData: string, broadcastData: any): SignedTransactionData {
		return this.container
			.resolve<SignedTransactionData>(this.dataTransferObjects.SignedTransactionData)
			.configure(
				identifier,
				signedData,
				broadcastData,
				this.configRepository.get<number>(ConfigKey.CurrencyDecimals),
			);
	}

	public transaction(transaction: unknown): ConfirmedTransactionData {
		return this.#resolveTransactionClass("ConfirmedTransactionData", transaction);
	}

	public transactions(transactions: unknown[], meta: MetaPagination): ConfirmedTransactionDataCollection {
		return new ConfirmedTransactionDataCollection(
			transactions.map((transaction) => this.transaction(transaction)),
			meta,
		);
	}

	public wallet(wallet: unknown): WalletData {
		return this.container.resolve<WalletData>(this.dataTransferObjects.WalletData).fill(wallet);
	}

	#resolveTransactionClass(klass: string, transaction: unknown): ConfirmedTransactionData {
		return this.container
			.resolve<ConfirmedTransactionData>(
				(get(this.dataTransferObjects, klass) || get(DataTransferObjects, klass))!,
			)
			.configure(transaction)
			.withDecimals(this.configRepository.get(ConfigKey.CurrencyDecimals));
	}
}
