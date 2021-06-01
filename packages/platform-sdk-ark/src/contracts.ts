export interface CryptoConfig {
	pubKeyHash: number;
	wif: number;
}

export const Bindings = {
	Crypto: Symbol("Crypto"),
	Status: Symbol("Status"),
};
