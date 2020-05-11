import { NumberLike } from "../contracts";

export class NumberFormatter {
	readonly #locale: string;
	readonly #style: number;

	public constructor(locale: string, style: number) {
		this.#locale = locale;
		this.#style = style;
	}

	public static format(value: NumberLike): string {
		return "";
	}

	public static formatCurrency(value: NumberLike, currency: string): string {
		return "";
	}
}
