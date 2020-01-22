export class Wallet {
    #address;
    #publicKey;

    public constructor({ address, publicKey }) {
        this.#address = address;
        this.#publicKey = publicKey;
    }

    public getAddress() {
        return this.#address;
    }

    public getPublicKey() {
        return this.#publicKey;
    }
}
