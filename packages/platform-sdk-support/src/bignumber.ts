import BigNumberJS from "bignumber.js";

export type NumberLike = string | number | BigNumberJS | BigNumber;

const BigNumberClone = BigNumberJS.clone({ DECIMAL_PLACES: 8, EXPONENTIAL_AT: 1e9 });

// This implementation is significantly slower than the native BigInt but for
// applications that use the Platform SDK this performance loss is acceptable.
export class BigNumber {
	public static readonly ZERO: BigNumber = new BigNumber(0);
	public static readonly ONE: BigNumber = new BigNumber(1);
	public static readonly SATOSHI: BigNumber = new BigNumber(1e8);

	readonly #value: BigNumberJS;

	private constructor(value: NumberLike, decimals?: number) {
		this.#value = this.toBigNumber(value);

		if (decimals !== undefined) {
			this.#value = this.#value.decimalPlaces(decimals);
		}
	}

	public static make(value: NumberLike, decimals?: number): BigNumber {
		return new BigNumber(value, decimals);
	}

	public decimalPlaces(decimals?: number): BigNumber {
		return BigNumber.make(this.#value, decimals);
	}

	public plus(value: NumberLike): BigNumber {
		return BigNumber.make(this.#value.plus(this.toBigNumber(value)));
	}

	public minus(value: NumberLike): BigNumber {
		return BigNumber.make(this.#value.minus(this.toBigNumber(value)));
	}

	public divide(value: NumberLike): BigNumber {
		return BigNumber.make(this.#value.dividedBy(this.toBigNumber(value)));
	}

	public times(value: NumberLike): BigNumber {
		return BigNumber.make(this.#value.multipliedBy(this.toBigNumber(value)));
	}

	public isNaN(): boolean {
		return this.#value.isNaN();
	}

	public isPositive(): boolean {
		return this.#value.isPositive();
	}

	public isFinite(): boolean {
		return this.#value.isFinite();
	}

	public comparedTo(value: NumberLike): number {
		return this.#value.comparedTo(this.toBigNumber(value));
	}

	public isEqualTo(value: NumberLike): boolean {
		return this.#value.isEqualTo(this.toBigNumber(value));
	}

	public isGreaterThan(value: NumberLike): boolean {
		return this.#value.isGreaterThan(this.toBigNumber(value));
	}

	public isGreaterThanOrEqualTo(value: NumberLike): boolean {
		return this.#value.isGreaterThanOrEqualTo(this.toBigNumber(value));
	}

	public isLessThan(value: NumberLike): boolean {
		return this.#value.isLessThan(this.toBigNumber(value));
	}

	public isLessThanOrEqualTo(value: NumberLike): boolean {
		return this.#value.isLessThanOrEqualTo(this.toBigNumber(value));
	}

	public toSatoshi(): BigNumber {
		return BigNumber.make(this.#value.multipliedBy(1e8));
	}

	public toFixed(decimals?: number): string {
		return decimals ? this.#value.toFixed(decimals) : this.#value.toFixed();
	}

	public toNumber(): number {
		return this.#value.toNumber();
	}

	public toString(): string {
		return this.#value.toString();
	}

	public valueOf(): string {
		return this.#value.valueOf();
	}

	private toBigNumber(value: NumberLike): BigNumberJS {
		if (value instanceof BigNumber) {
			return new BigNumberClone(value.valueOf());
		}

		return new BigNumberClone(value);
	}
}
