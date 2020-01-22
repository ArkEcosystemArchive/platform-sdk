export class Block {
    #id;
    #height;

    public constructor({ id, height }) {
        this.#id = id;
        this.#height = height;
    }

    public getId() {
        return this.#id;
    }

    public getHeight() {
        return this.#height;
    }
}
