import { NumberLike } from "../contracts";

export class NumberFormatter {
	readonly #locale: string;
	readonly #options: Intl.NumberFormatOptions;

	public constructor (locale: string, options?: Intl.NumberFormatOptions) {
		this.#locale = locale;
		this.#options = options || {};
	}

	public format(value: NumberLike): string {
		return new Intl.NumberFormat(this.#locale).format(value);
	}

	public formatCurrency(value: NumberLike, currency: string): string {
		return new Intl.NumberFormat(this.#locale, {
			...this.#options,
			...{ currency }
		}).format(value);
	}
}
