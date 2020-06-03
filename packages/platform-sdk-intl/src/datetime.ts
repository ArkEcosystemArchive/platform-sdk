import dayjs, { ConfigType, QUnitType } from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import dayOfYear from "dayjs/plugin/dayOfYear";
import localizedFormat from "dayjs/plugin/localizedFormat";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import relativeTime from "dayjs/plugin/relativeTime";
import toObject from "dayjs/plugin/toObject";
import utc from "dayjs/plugin/utc";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(advancedFormat);
dayjs.extend(dayOfYear);
dayjs.extend(localizedFormat);
dayjs.extend(quarterOfYear);
dayjs.extend(toObject);
dayjs.extend(utc);
dayjs.extend(weekOfYear);
dayjs.extend(relativeTime);

type DateTimeLike = string | number | dayjs.Dayjs | DateTime;

export class DateTime {
	readonly #instance: dayjs.Dayjs;
	readonly #locale: string | undefined;

	private constructor(value?: DateTimeLike, locale?: string) {
		this.#instance = this.toUTC(value);
		this.#locale = locale;

		if (!locale) {
			locale = "en";
		}

		try {
			require(`dayjs/locale/${locale}.js`);

			this.#instance.locale(locale);
		} catch {
			console.debug(`Failed to load data for the [${locale}] locale.`);
		}
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

	public getMillisecond(): number {
		return this.#instance.millisecond();
	}

	public getSecond(): number {
		return this.#instance.second();
	}

	public getMinute(): number {
		return this.#instance.minute();
	}

	public getHour(): number {
		return this.#instance.hour();
	}

	public getDayOfMonth(): number {
		return this.#instance.date();
	}

	public getDay(): number {
		return this.#instance.dayOfYear();
	}

	public getWeek(): number {
		return this.#instance.week();
	}

	public getMonth(): number {
		return this.#instance.month();
	}

	public getQuarter(): number {
		return this.#instance.quarter();
	}

	public getYear(): number {
		return this.#instance.year();
	}

	public setMillisecond(value: number): DateTime {
		return DateTime.make(this.#instance.millisecond(value), this.#locale);
	}

	public setSecond(value: number): DateTime {
		return DateTime.make(this.#instance.second(value), this.#locale);
	}

	public setMinute(value: number): DateTime {
		return DateTime.make(this.#instance.minute(value), this.#locale);
	}

	public setHour(value: number): DateTime {
		return DateTime.make(this.#instance.hour(value), this.#locale);
	}

	public setDayOfMonth(value: number): DateTime {
		return DateTime.make(this.#instance.date(value), this.#locale);
	}

	public setDay(value: number): DateTime {
		return DateTime.make(this.#instance.dayOfYear(value), this.#locale);
	}

	public setWeek(value: number): DateTime {
		return DateTime.make(this.#instance.week(value), this.#locale);
	}

	public setMonth(value: number): DateTime {
		return DateTime.make(this.#instance.month(value), this.#locale);
	}

	public setQuarter(value: number): DateTime {
		return DateTime.make(this.#instance.quarter(value), this.#locale);
	}

	public setYear(value: number): DateTime {
		return DateTime.make(this.#instance.year(value), this.#locale);
	}

	public addMillisecond(): DateTime {
		return this.addMilliseconds(1);
	}

	public addMilliseconds(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "millisecond"), this.#locale);
	}

	public addSecond(): DateTime {
		return this.addSeconds(1);
	}

	public addSeconds(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "second"), this.#locale);
	}

	public addMinute(): DateTime {
		return this.addMinutes(1);
	}

	public addMinutes(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "minute"), this.#locale);
	}

	public addHour(): DateTime {
		return this.addHours(1);
	}

	public addHours(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "hour"), this.#locale);
	}

	public addDay(): DateTime {
		return this.addDays(1);
	}

	public addDays(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "day"), this.#locale);
	}

	public addWeek(): DateTime {
		return this.addWeeks(1);
	}

	public addWeeks(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "week"), this.#locale);
	}

	public addMonth(): DateTime {
		return this.addMonths(1);
	}

	public addMonths(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "month"), this.#locale);
	}

	public addQuarter(): DateTime {
		return this.addQuarters(1);
	}

	public addQuarters(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "quarter"), this.#locale);
	}

	public addYear(): DateTime {
		return this.addYears(1);
	}

	public addYears(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "year"), this.#locale);
	}

	public subMillisecond(): DateTime {
		return this.subMilliseconds(1);
	}

	public subMilliseconds(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "millisecond"), this.#locale);
	}

	public subSecond(): DateTime {
		return this.subSeconds(1);
	}

	public subSeconds(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "second"), this.#locale);
	}

	public subMinute(): DateTime {
		return this.subMinutes(1);
	}

	public subMinutes(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "minute"), this.#locale);
	}

	public subHour(): DateTime {
		return this.subHours(1);
	}

	public subHours(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "hour"), this.#locale);
	}

	public subDay(): DateTime {
		return this.subDays(1);
	}

	public subDays(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "day"), this.#locale);
	}

	public subWeek(): DateTime {
		return this.subWeeks(1);
	}

	public subWeeks(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "week"), this.#locale);
	}

	public subMonth(): DateTime {
		return this.subMonths(1);
	}

	public subMonths(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "month"), this.#locale);
	}

	public subQuarter(): DateTime {
		return this.subQuarters(1);
	}

	public subQuarters(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "quarter"), this.#locale);
	}

	public subYear(): DateTime {
		return this.subYears(1);
	}

	public subYears(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "year"), this.#locale);
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

	public startOf(unit: QUnitType): DateTime {
		return DateTime.make(this.#instance.startOf(unit), this.#locale);
	}

	public from(compared: ConfigType, withoutSuffix?: boolean): string {
		return this.#instance.from(compared, withoutSuffix);
	}

	public fromNow(withoutSuffix?: boolean): string {
		return this.#instance.fromNow(withoutSuffix);
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

	public toDate(): Date {
		return this.#instance.toDate();
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
