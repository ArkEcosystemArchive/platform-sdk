import BaseCode, { QRCodeToDataURLOptions } from "qrcode";

type StringType = "utf8" | "svg" | "terminal" | undefined;

export class QRCode {
	readonly #value: string;

	private constructor(value: string) {
		this.#value = value;
	}

	public static fromString(value: string): QRCode {
		return new QRCode(value);
	}

	public static fromObject(value: object): QRCode {
		return new QRCode(JSON.stringify(value));
	}

	public async toDataURL(options: QRCodeToDataURLOptions = {}): Promise<string> {
		return BaseCode.toDataURL(this.#value, options);
	}

    /* istanbul ignore next */
	public async toString(type: StringType = "utf8"): Promise<string> {
		return BaseCode.toString(this.#value, { type });
	}
}
