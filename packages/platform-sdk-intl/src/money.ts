import Dinero from "dinero.js";

export class Money {
	readonly #value: Dinero.Dinero;
	readonly #currency: string;

	private constructor(options) {
		if (!Number.isInteger(options.amount)) {
			options.amount = options.amount.getAmount();
		}

		this.#value = Dinero(options);
		this.#currency = options.currency;
	}

	public static make(amount: string | number | Dinero.Dinero, currency: string): Money {
		return new Money({ amount, currency });
	}

	public setLocale(locale: string): Money {
		return Money.make(this.#value.setLocale(locale), this.#currency);
	}

	public plus(value: Money): Money {
		return Money.make(this.#value.add(this.toDinero(value)), this.#currency);
	}

	public minus(value: Money): Money {
		return Money.make(this.#value.subtract(this.toDinero(value)), this.#currency);
	}

	public times(value: number): Money {
		return Money.make(this.#value.multiply(value), this.#currency);
	}

	public divide(value: number): Money {
		return Money.make(this.#value.divide(value), this.#currency);
	}

	public isEqualTo(value: Money): boolean {
		return this.#value.equalsTo(this.toDinero(value));
	}

	public isLessThan(value: Money): boolean {
		return this.#value.lessThan(this.toDinero(value));
	}

	public isLessThanOrEqual(value: Money): boolean {
		return this.#value.lessThanOrEqual(this.toDinero(value));
	}

	public isGreaterThan(value: Money): boolean {
		return this.#value.greaterThan(this.toDinero(value));
	}

	public isGreaterThanOrEqual(value: Money): boolean {
		return this.#value.greaterThanOrEqual(this.toDinero(value));
	}

	public isPositive(): boolean {
		return this.#value.isPositive();
	}

	public isNegative(): boolean {
		return this.#value.isNegative();
	}

	public getAmount(): number {
		return this.#value.getAmount();
	}

	public getCurrency(): any {
		return this.#value.getCurrency();
	}

	public format(format?: string | undefined): string {
		return this.#value.toFormat(format);
	}

	public toUnit(): number {
		return this.#value.toUnit();
	}

	private toDinero(value: Money): Dinero.Dinero {
		return Dinero({ amount: value.getAmount(), currency: value.getCurrency() });
	}
}
