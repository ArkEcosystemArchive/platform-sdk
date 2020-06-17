import QRious from "qrious";

export class QRCode {
	readonly #instance: QRious;

	private constructor() {
		this.#instance = new QRious();
	}

	public static fromString(value: string): QRCode {
		return new QRCode().set({ value });
	}

	public static fromObject(value: object): QRCode {
		return new QRCode().set({
			value: JSON.stringify(value),
		});
	}

	public set(value: object): QRCode {
		this.#instance.set(value);

		return this;
	}

	public toDataURL(): string {
		return this.#instance.toDataURL("image/png");
	}
}
