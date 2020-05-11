import BigNumberJS from "bignumber.js";

import { NumberLike } from "../contracts";

// This implementation is significantly slower than the native BigInt but for
// applications that use the Platform SDK this performance loss is acceptable.
export class BigNumber {
	#value: BigNumberJS;
	#decimals = 8;

	private constructor(value: NumberLike) {
		const BigNumberClone = BigNumberJS.clone({ DECIMAL_PLACES: 8, EXPONENTIAL_AT: 1e9 });

		this.#value = new BigNumberClone(value);

		this.decimalPlaces();
	}

	public static make(value: NumberLike): BigNumber {
		return new BigNumber(value);
	}

	public decimalPlaces(decimals = 8): BigNumber {
		this.#decimals = Math.pow(10, decimals);

		this.#value = this.#value.decimalPlaces(decimals);

		return this;
	}

	public add(value: NumberLike): BigNumber {
		this.#value = this.#value.plus(value);

		return this;
	}

	public subtract(value: NumberLike): BigNumber {
		this.#value = this.#value.minus(value);

		return this;
	}

	public multiply(value: NumberLike): BigNumber {
		this.#value = this.#value.multipliedBy(value);

		return this;
	}

	public isEqualTo(value: NumberLike): boolean {
		return this.#value.eq(value);
	}

	public toHuman(): BigNumber {
		this.#value = this.#value.dividedBy(this.#decimals);

		return this;
	}

	public toSatoshi(): BigNumber {
		this.#value = this.#value.multipliedBy(this.#decimals);

		return this;
	}

	public toFixed(): string {
		return this.#value.toFixed();
	}

	public toString(): string {
		return this.#value.toString();
	}

	public valueOf(): BigNumberJS {
		return this.#value;
	}
}
