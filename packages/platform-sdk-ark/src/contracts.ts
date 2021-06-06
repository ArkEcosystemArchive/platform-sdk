export interface CryptoConfig {
	pubKeyHash: number;
	wif: number;
}

export const Bindings = {
	Crypto: Symbol("ARK<Crypto>"),
	Height: Symbol("ARK<Height>"),
};
