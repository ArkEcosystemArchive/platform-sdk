import { Builder } from "./builder";

export class Delegate extends Builder {
	public type(value: string): void {
		this.set("delegate.type", value);
	}

	public percentage(min: number, max: number): void {
		this.set("delegate.payout.percentage.min", min);
		this.set("delegate.payout.percentage.max", max);
	}

	public distribution(min: number, max: number): void {
		this.set("delegate.payout.distribution.min", min);
		this.set("delegate.payout.distribution.max", max);
	}

	public frequency(type: string, value: number): void {
		this.set("delegate.payout.frequency.type", type);
		this.set("delegate.payout.frequency.value", value);
	}
}
