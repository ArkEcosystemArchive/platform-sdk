export class Block {
	private readonly id: string;
	private readonly height: string;

	public constructor({ id, height }) {
		this.id = id;
		this.height = height;
	}

	public getId() {
		return this.id;
	}

	public getHeight() {
		return this.height;
	}
}
