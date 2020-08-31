import { Coins } from "@arkecosystem/platform-sdk";

export interface ContactAddressInput {
	coin: string;
	network: string;
	name: string;
	address: string;
}

export interface ContactAddressProps {
	id: string;
	coin: string;
	network: string | Coins.CoinNetwork;
	name: string;
	address: string;
}
