import { interfaces } from "inversify";

import { CoinServices } from "../coins";
import { Container } from "./container";

export type ServiceList = Record<string, interfaces.Newable<any>>;

export const BINDING_TYPES = {
	// [Coin] Internals
	ConfigRepository: Symbol.for("Coin<ConfigRepository>"),
	HttpClient: Symbol.for("Coin<HttpClient>"),
	Manifest: Symbol.for("Coin<Manifest>"),
	Network: Symbol.for("Coin<Network>"),
	NetworkRepository: Symbol.for("Coin<NetworkRepository>"),
	Specification: Symbol.for("Coin<Specification>"),
	// [Coin] Services
	BigNumberService: Symbol.for("Coin<BigNumberService>"),
	ClientService: Symbol.for("Coin<ClientService>"),
	DataTransferObjectService: Symbol.for("Coin<DataTransferObjectService>"),
	FeeService: Symbol.for("Coin<FeeService>"),
	IdentityService: Symbol.for("Coin<IdentityService>"),
	KnownWalletService: Symbol.for("Coin<KnownWalletService>"),
	LedgerService: Symbol.for("Coin<LedgerService>"),
	LinkService: Symbol.for("Coin<LinkService>"),
	MessageService: Symbol.for("Coin<MessageService>"),
	MultiSignatureService: Symbol.for("Coin<MultiSignatureService>"),
	SignatoryService: Symbol.for("Coin<SignatoryService>"),
	TransactionService: Symbol.for("Coin<TransactionService>"),
	WalletDiscoveryService: Symbol.for("Coin<WalletDiscoveryService>"),
};

export interface IServiceProvider {
	make(container: Container): Promise<CoinServices>;
}
