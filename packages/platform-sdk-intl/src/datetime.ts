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

/**
 *
 *
 * @export
 * @class DateTime
 */
export class DateTime {
	/**
	 *
	 *
	 * @type {dayjs.Dayjs}
	 * @memberof DateTime
	 */
	readonly #instance: dayjs.Dayjs;

	/**
	 *
	 *
	 * @type {(string | undefined)}
	 * @memberof DateTime
	 */
	readonly #locale: string | undefined;

	/**
	 *Creates an instance of DateTime.
	 * @param {DateTimeLike} [value]
	 * @param {*} [locale]
	 * @memberof DateTime
	 */
	private constructor(value?: DateTimeLike, locale?: any) {
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

	/**
	 *
	 *
	 * @static
	 * @param {DateTimeLike} [value]
	 * @param {string} [locale]
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public static make(value?: DateTimeLike, locale?: string): DateTime {
		return new DateTime(value, locale);
	}

	/**
	 *
	 *
	 * @static
	 * @param {number} value
	 * @param {string} [locale]
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public static fromUnix(value: number, locale?: string): DateTime {
		return new DateTime(dayjs.unix(value), locale);
	}

	/**
	 *
	 *
	 * @param {string} locale
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public setLocale(locale: string): DateTime {
		return DateTime.make(this.valueOf(), locale);
	}

	/**
	 *
	 *
	 * @param {DateTimeLike} value
	 * @returns {boolean}
	 * @memberof DateTime
	 */
	public isBefore(value: DateTimeLike): boolean {
		return this.#instance.isBefore(this.toUTC(value));
	}

	/**
	 *
	 *
	 * @param {DateTimeLike} value
	 * @returns {boolean}
	 * @memberof DateTime
	 */
	public isSame(value: DateTimeLike): boolean {
		return this.#instance.isSame(this.toUTC(value));
	}

	/**
	 *
	 *
	 * @param {DateTimeLike} value
	 * @returns {boolean}
	 * @memberof DateTime
	 */
	public isAfter(value: DateTimeLike): boolean {
		return this.#instance.isAfter(this.toUTC(value));
	}

	/**
	 *
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	public getMillisecond(): number {
		return this.#instance.millisecond();
	}

	/**
	 *
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	public getSecond(): number {
		return this.#instance.second();
	}

	/**
	 *
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	public getMinute(): number {
		return this.#instance.minute();
	}

	/**
	 *
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	public getHour(): number {
		return this.#instance.hour();
	}

	/**
	 *
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	public getDayOfMonth(): number {
		return this.#instance.date();
	}

	/**
	 *
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	public getDay(): number {
		return this.#instance.dayOfYear();
	}

	/**
	 *
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	public getWeek(): number {
		return this.#instance.week();
	}

	/**
	 *
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	public getMonth(): number {
		return this.#instance.month();
	}

	/**
	 *
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	public getQuarter(): number {
		return this.#instance.quarter();
	}

	/**
	 *
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	public getYear(): number {
		return this.#instance.year();
	}

	/**
	 *
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public setMillisecond(value: number): DateTime {
		return DateTime.make(this.#instance.millisecond(value), this.#locale);
	}

	/**
	 *
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public setSecond(value: number): DateTime {
		return DateTime.make(this.#instance.second(value), this.#locale);
	}

	/**
	 *
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public setMinute(value: number): DateTime {
		return DateTime.make(this.#instance.minute(value), this.#locale);
	}

	/**
	 *
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public setHour(value: number): DateTime {
		return DateTime.make(this.#instance.hour(value), this.#locale);
	}

	/**
	 *
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public setDayOfMonth(value: number): DateTime {
		return DateTime.make(this.#instance.date(value), this.#locale);
	}

	/**
	 *
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public setDay(value: number): DateTime {
		return DateTime.make(this.#instance.dayOfYear(value), this.#locale);
	}

	/**
	 *
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public setWeek(value: number): DateTime {
		return DateTime.make(this.#instance.week(value), this.#locale);
	}

	/**
	 *
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public setMonth(value: number): DateTime {
		return DateTime.make(this.#instance.month(value), this.#locale);
	}

	/**
	 *
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public setQuarter(value: number): DateTime {
		return DateTime.make(this.#instance.quarter(value), this.#locale);
	}

	/**
	 *
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public setYear(value: number): DateTime {
		return DateTime.make(this.#instance.year(value), this.#locale);
	}

	/**
	 *
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addMillisecond(): DateTime {
		return this.addMilliseconds(1);
	}

	/**
	 *
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addMilliseconds(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "millisecond"), this.#locale);
	}

	/**
	 *
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addSecond(): DateTime {
		return this.addSeconds(1);
	}

	/**
	 *
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addSeconds(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "second"), this.#locale);
	}

	/**
	 *
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addMinute(): DateTime {
		return this.addMinutes(1);
	}

	/**
	 *
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addMinutes(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "minute"), this.#locale);
	}

	/**
	 *
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addHour(): DateTime {
		return this.addHours(1);
	}

	/**
	 *
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addHours(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "hour"), this.#locale);
	}

	/**
	 *
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addDay(): DateTime {
		return this.addDays(1);
	}

	/**
	 *
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addDays(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "day"), this.#locale);
	}

	/**
	 *
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addWeek(): DateTime {
		return this.addWeeks(1);
	}

	/**
	 *
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addWeeks(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "week"), this.#locale);
	}

	/**
	 *
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addMonth(): DateTime {
		return this.addMonths(1);
	}

	/**
	 *
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addMonths(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "month"), this.#locale);
	}

	/**
	 *
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addQuarter(): DateTime {
		return this.addQuarters(1);
	}

	/**
	 *
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addQuarters(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "quarter"), this.#locale);
	}

	/**
	 *
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addYear(): DateTime {
		return this.addYears(1);
	}

	/**
	 *
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addYears(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "year"), this.#locale);
	}

	/**
	 *
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subMillisecond(): DateTime {
		return this.subMilliseconds(1);
	}

	/**
	 *
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subMilliseconds(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "millisecond"), this.#locale);
	}

	/**
	 *
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subSecond(): DateTime {
		return this.subSeconds(1);
	}

	/**
	 *
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subSeconds(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "second"), this.#locale);
	}

	/**
	 *
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subMinute(): DateTime {
		return this.subMinutes(1);
	}

	/**
	 *
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subMinutes(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "minute"), this.#locale);
	}

	/**
	 *
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subHour(): DateTime {
		return this.subHours(1);
	}

	/**
	 *
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subHours(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "hour"), this.#locale);
	}

	/**
	 *
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subDay(): DateTime {
		return this.subDays(1);
	}

	/**
	 *
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subDays(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "day"), this.#locale);
	}

	/**
	 *
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subWeek(): DateTime {
		return this.subWeeks(1);
	}

	/**
	 *
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subWeeks(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "week"), this.#locale);
	}

	/**
	 *
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subMonth(): DateTime {
		return this.subMonths(1);
	}

	/**
	 *
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subMonths(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "month"), this.#locale);
	}

	/**
	 *
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subQuarter(): DateTime {
		return this.subQuarters(1);
	}

	/**
	 *
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subQuarters(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "quarter"), this.#locale);
	}

	/**
	 *
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subYear(): DateTime {
		return this.subYears(1);
	}

	/**
	 *
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subYears(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "year"), this.#locale);
	}

	/**
	 *
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	public diffInMilliseconds(value: DateTimeLike): number {
		return this.#instance.diff(this.toUTC(value), "millisecond");
	}

	/**
	 *
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	public diffInSeconds(value: DateTimeLike): number {
		return this.#instance.diff(this.toUTC(value), "second");
	}

	/**
	 *
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	public diffInMinutes(value: DateTimeLike): number {
		return this.#instance.diff(this.toUTC(value), "minute");
	}

	/**
	 *
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	public diffInHours(value: DateTimeLike): number {
		return this.#instance.diff(this.toUTC(value), "hour");
	}

	/**
	 *
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	public diffInDays(value: DateTimeLike): number {
		return this.#instance.diff(this.toUTC(value), "day");
	}

	/**
	 *
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	public diffInWeeks(value: DateTimeLike): number {
		return this.#instance.diff(this.toUTC(value), "week");
	}

	/**
	 *
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	public diffInMonths(value: DateTimeLike): number {
		return this.#instance.diff(this.toUTC(value), "month");
	}

	/**
	 *
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	public diffInQuarters(value: DateTimeLike): number {
		return this.#instance.diff(this.toUTC(value), "quarter");
	}

	/**
	 *
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	public diffInYears(value: DateTimeLike): number {
		return this.#instance.diff(this.toUTC(value), "year");
	}

	/**
	 *
	 *
	 * @param {string} value
	 * @returns {string}
	 * @memberof DateTime
	 */
	public format(value: string): string {
		return this.#instance.format(value);
	}

	/**
	 *
	 *
	 * @param {QUnitType} unit
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public startOf(unit: QUnitType): DateTime {
		return DateTime.make(this.#instance.startOf(unit), this.#locale);
	}

	/**
	 *
	 *
	 * @param {ConfigType} compared
	 * @param {boolean} [withoutSuffix]
	 * @returns {string}
	 * @memberof DateTime
	 */
	public from(compared: ConfigType, withoutSuffix?: boolean): string {
		return this.#instance.from(compared, withoutSuffix);
	}

	/**
	 *
	 *
	 * @param {boolean} [withoutSuffix]
	 * @returns {string}
	 * @memberof DateTime
	 */
	public fromNow(withoutSuffix?: boolean): string {
		return this.#instance.fromNow(withoutSuffix);
	}

	/**
	 *
	 *
	 * @returns {{
	 * 		years: number;
	 * 		months: number;
	 * 		date: number;
	 * 		hours: number;
	 * 		minutes: number;
	 * 		seconds: number;
	 * 		milliseconds: number;
	 * 	}}
	 * @memberof DateTime
	 */
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

	/**
	 *
	 *
	 * @returns {string}
	 * @memberof DateTime
	 */
	public toJSON(): string {
		return this.#instance.toJSON();
	}

	/**
	 *
	 *
	 * @returns {string}
	 * @memberof DateTime
	 */
	public toISOString(): string {
		return this.#instance.toISOString();
	}

	/**
	 *
	 *
	 * @returns {string}
	 * @memberof DateTime
	 */
	public toString(): string {
		return this.#instance.toString();
	}

	/**
	 *
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	public toUNIX(): number {
		return this.#instance.unix();
	}

	/**
	 *
	 *
	 * @returns {Date}
	 * @memberof DateTime
	 */
	public toDate(): Date {
		return this.#instance.toDate();
	}

	/**
	 *
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	public valueOf(): number {
		return this.#instance.valueOf();
	}

	/**
	 *
	 *
	 * @private
	 * @param {DateTimeLike} [value]
	 * @returns {dayjs.Dayjs}
	 * @memberof DateTime
	 */
	private toUTC(value?: DateTimeLike): dayjs.Dayjs {
		if (value instanceof DateTime) {
			return dayjs.utc(value.valueOf());
		}

		return dayjs.utc(value);
	}
}
