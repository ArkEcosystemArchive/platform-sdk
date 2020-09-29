interface Currency {
	ticker: string;
	symbol: string;
}

interface Crypto {
	networkId?: string;
	slip44: number;
	bech32?: string;
}

interface Voting {
	enabled: boolean;
	maximum: number;
	maximumPerTransaction: number;
}

interface Client {
	transaction: boolean;
	transactions: boolean;
	wallet: boolean;
	wallets: boolean;
	delegate: boolean;
	delegates: boolean;
	votes: boolean;
	voters: boolean;
	configuration: boolean;
	fees: boolean;
	syncing: boolean;
	broadcast: boolean;
}

interface Fee {
	all: boolean;
}

interface Address {
	mnemonic: boolean;
	multiSignature: boolean;
	publicKey: boolean;
	privateKey: boolean;
	wif: boolean;
}

interface PublicKey {
	mnemonic: boolean;
	multiSignature: boolean;
	wif: boolean;
}

interface PrivateKey {
	mnemonic: boolean;
	wif: boolean;
}

interface Wif {
	mnemonic: boolean;
}

interface KeyPair {
	mnemonic: boolean;
	privateKey: boolean;
	wif: boolean;
}

interface Identity {
	address: Address;
	publicKey: PublicKey;
	privateKey: PrivateKey;
	wif: Wif;
	keyPair: KeyPair;
}

interface Ledger {
	getVersion: boolean;
	getPublicKey: boolean;
	signTransaction: boolean;
	signMessage: boolean;
}

interface Link {
	block: boolean;
	transaction: boolean;
	wallet: boolean;
}

interface Message {
	sign: boolean;
	verify: boolean;
}

interface Peer {
	search: boolean;
}

interface Transaction {
	transfer: boolean;
	secondSignature: boolean;
	delegateRegistration: boolean;
	vote: boolean;
	multiSignature: boolean;
	ipfs: boolean;
	multiPayment: boolean;
	delegateResignation: boolean;
	htlcLock: boolean;
	htlcClaim: boolean;
	htlcRefund: boolean;
	entityRegistration: boolean;
	entityResignation: boolean;
	entityUpdate: boolean;
}

interface Abilities {
	Client: Client;
	Fee: Fee;
	Identity: Identity;
	Ledger: Ledger;
	Link: Link;
	Message: Message;
	Peer: Peer;
	Transaction: Transaction;
}

interface SigningMethods {
	mnemonic: boolean;
	privateKey: boolean;
	wif: boolean;
}

export interface CoinNetwork {
	id: string;
	type: string;
	name: string;
	explorer: string;
	currency: Currency;
	crypto: Crypto;
	hosts: string[];
	hostsMultiSignature: string[];
	voting: Voting;
	abilities: Abilities;
	signingMethods: SigningMethods;
}
