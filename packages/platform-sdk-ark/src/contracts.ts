export interface CryptoConfig {
	pubKeyHash: number;
	wif: number;
}

export const Bindings = {
	Crypto: Symbol.for("ARK<Crypto>"),
	Height: Symbol.for("ARK<Height>"),
};
