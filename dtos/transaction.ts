export class Transaction {
    #id;
    #amount;

    public constructor({ id, amount }) {
        this.#id = id;
        this.#amount = amount;
    }

    public getId() {
        return this.#id;
    }

    public getAmount() {
        return this.#amount;
    }
}
