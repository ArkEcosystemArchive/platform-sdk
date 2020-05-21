import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import toObject from "dayjs/plugin/toObject";
import utc from "dayjs/plugin/utc";

dayjs.extend(advancedFormat);
dayjs.extend(localizedFormat);
dayjs.extend(quarterOfYear);
dayjs.extend(toObject);
dayjs.extend(utc);

type DateTimeLike = string | number | dayjs.Dayjs | DateTime;

export class DateTime {
	#instance: dayjs.Dayjs;

	private constructor(value?: DateTimeLike, locale?: string) {
		this.#instance = this.toUTC(value);

		if (!locale) {
			locale = "en";
		}

		require(`dayjs/locale/${locale}`);

		this.#instance.locale(locale);
	}

	public static make(value?: DateTimeLike, locale?: string): DateTime {
		return new DateTime(value, locale);
	}

	public setLocale(locale: string): DateTime {
		return DateTime.make(this.valueOf(), locale);
	}

	public isBefore(value: DateTimeLike): boolean {
		return this.#instance.isBefore(this.toUTC(value));
	}

	public isSame(value: DateTimeLike): boolean {
		return this.#instance.isSame(this.toUTC(value));
	}

	public isAfter(value: DateTimeLike): boolean {
		return this.#instance.isAfter(this.toUTC(value));
	}

	public addMillisecond(): DateTime {
		return this.addMilliseconds(1);
	}

	public addMilliseconds(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "millisecond"));
	}

	public addSecond(): DateTime {
		return this.addSeconds(1);
	}

	public addSeconds(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "second"));
	}

	public addMinute(): DateTime {
		return this.addMinutes(1);
	}

	public addMinutes(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "minute"));
	}

	public addHour(): DateTime {
		return this.addHours(1);
	}

	public addHours(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "hour"));
	}

	public addDay(): DateTime {
		return this.addDays(1);
	}

	public addDays(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "day"));
	}

	public addWeek(): DateTime {
		return this.addWeeks(1);
	}

	public addWeeks(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "week"));
	}

	public addMonth(): DateTime {
		return this.addMonths(1);
	}

	public addMonths(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "month"));
	}

	public addQuarter(): DateTime {
		return this.addQuarters(1);
	}

	public addQuarters(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "quarter"));
	}

	public addYear(): DateTime {
		return this.addYears(1);
	}

	public addYears(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "year"));
	}

	public subMillisecond(): DateTime {
		return this.subMilliseconds(1);
	}

	public subMilliseconds(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "millisecond"));
	}

	public subSecond(): DateTime {
		return this.subSeconds(1);
	}

	public subSeconds(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "second"));
	}

	public subMinute(): DateTime {
		return this.subMinutes(1);
	}

	public subMinutes(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "minute"));
	}

	public subHour(): DateTime {
		return this.subHours(1);
	}

	public subHours(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "hour"));
	}

	public subDay(): DateTime {
		return this.subDays(1);
	}

	public subDays(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "day"));
	}

	public subWeek(): DateTime {
		return this.subWeeks(1);
	}

	public subWeeks(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "week"));
	}

	public subMonth(): DateTime {
		return this.subMonths(1);
	}

	public subMonths(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "month"));
	}

	public subQuarter(): DateTime {
		return this.subQuarters(1);
	}

	public subQuarters(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "quarter"));
	}

	public subYear(): DateTime {
		return this.subYears(1);
	}

	public subYears(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "year"));
	}

	public diffInMilliseconds(value: DateTimeLike): number {
		return this.#instance.diff(this.toUTC(value), "millisecond");
	}

	public diffInSeconds(value: DateTimeLike): number {
		return this.#instance.diff(this.toUTC(value), "second");
	}

	public diffInMinutes(value: DateTimeLike): number {
		return this.#instance.diff(this.toUTC(value), "minute");
	}

	public diffInHours(value: DateTimeLike): number {
		return this.#instance.diff(this.toUTC(value), "hour");
	}

	public diffInDays(value: DateTimeLike): number {
		return this.#instance.diff(this.toUTC(value), "date");
	}

	public diffInWeeks(value: DateTimeLike): number {
		return this.#instance.diff(this.toUTC(value), "week");
	}

	public diffInMonths(value: DateTimeLike): number {
		return this.#instance.diff(this.toUTC(value), "month");
	}

	public diffInQuarters(value: DateTimeLike): number {
		return this.#instance.diff(this.toUTC(value), "quarter");
	}

	public diffInYears(value: DateTimeLike): number {
		return this.#instance.diff(this.toUTC(value), "year");
	}

	public format(value: string): string {
		return this.#instance.format(value);
	}

	public toObject(): {
		years: number;
		months: number;
		date: number;
		hours: number;
		minutes: number;
		seconds: number;
		milliseconds: number;
	} {
		return this.#instance.toObject();
	}

	public toJSON(): string {
		return this.#instance.toJSON();
	}

	public toISOString(): string {
		return this.#instance.toISOString();
	}

	public toString(): string {
		return this.#instance.toString();
	}

	public toUNIX(): number {
		return this.#instance.unix();
	}

	public valueOf(): number {
		return this.#instance.valueOf();
	}

	private toUTC(value?: DateTimeLike): dayjs.Dayjs {
		if (value instanceof DateTime) {
			return dayjs.utc(value.valueOf());
		}

		return dayjs.utc(value);
	}
}
