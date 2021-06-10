import { Coins } from "@arkecosystem/platform-sdk";
import {
	BigNum,
	Bip32PrivateKey,
	Bip32PublicKey,
	TransactionBuilder,
	TransactionInput,
} from "@emurgo/cardano-serialization-lib-nodejs";
import { HttpClient } from "@arkecosystem/platform-sdk-http";
import { UnspentTransaction } from "./transaction.models";
export declare const usedAddressesForAccount: (
	config: Coins.ConfigRepository,
	httpClient: HttpClient,
	accountPublicKey: string,
) => Promise<{
	usedSpendAddresses: Set<string>;
	usedChangeAddresses: Set<string>;
}>;
export declare const addressesChunk: (
	networkId: string,
	accountPublicKey: string,
	isChange: boolean,
	offset: number,
) => Promise<string[]>;
export declare const addUtxoInput: (
	txBuilder: TransactionBuilder,
	input: UnspentTransaction,
) => {
	added: boolean;
	amount: BigNum;
	fee: BigNum;
};
export declare const utxoToTxInput: (utxo: UnspentTransaction) => TransactionInput;
export declare const deriveAddressesAndSigningKeys: (
	publicKey: Bip32PublicKey,
	networkId: any,
	accountKey: Bip32PrivateKey,
) => Promise<{
	[index: number]: {};
}>;
