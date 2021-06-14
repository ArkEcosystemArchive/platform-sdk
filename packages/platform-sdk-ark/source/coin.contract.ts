export interface CryptoConfig {
	pubKeyHash: number;
	wif: number;
}

export const Bindings = {
	Crypto: Symbol.for("ARK<Crypto>"),
	Height: Symbol.for("ARK<Height>"),
	MultiSignatureSigner: Symbol.for("ARK<MultiSignatureSigner>"),
};
