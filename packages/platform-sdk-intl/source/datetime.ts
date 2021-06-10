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
 * Simplifies working with dates and times through day.js
 *
 * @export
 * @class DateTime
 */
export class DateTime {
	/**
	 * The date and time that is being represented.
	 *
	 * @type {dayjs.Dayjs}
	 * @memberof DateTime
	 */
	readonly #instance: dayjs.Dayjs;

	/**
	 * The locale that should be used for formatting.
	 *
	 * @type {(string | undefined)}
	 * @memberof DateTime
	 */
	readonly #locale: string | undefined;

	/**
	 * Creates an instance of DateTime.
	 *
	 * @param {DateTimeLike} [value]
	 * @param {*} [locale]
	 * @memberof DateTime
	 */
	private constructor(value?: DateTimeLike, locale?: any) {
		this.#instance = this.#toUTC(value);
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
	 * Creates an instance of DateTime.
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
	 * Creates an instance of DateTime from a UNIX timestamp.
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
	 * Sets th Set the locale of the current instance.e locale that should be used for formatting.
	 *
	 * @param {string} locale
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public setLocale(locale: string): DateTime {
		return DateTime.make(this.valueOf(), locale);
	}

	/**
	 * Determines if the current instance is before the given value.
	 *
	 * @param {DateTimeLike} value
	 * @returns {boolean}
	 * @memberof DateTime
	 */
	public isBefore(value: DateTimeLike): boolean {
		return this.#instance.isBefore(this.#toUTC(value));
	}

	/**
	 * Determines if the current instance is the same as the given value.
	 *
	 * @param {DateTimeLike} value
	 * @returns {boolean}
	 * @memberof DateTime
	 */
	public isSame(value: DateTimeLike): boolean {
		return this.#instance.isSame(this.#toUTC(value));
	}

	/**
	 * Determines if the current instance is after the given value.
	 *
	 * @param {DateTimeLike} value
	 * @returns {boolean}
	 * @memberof DateTime
	 */
	public isAfter(value: DateTimeLike): boolean {
		return this.#instance.isAfter(this.#toUTC(value));
	}

	/**
	 * Get the millisecond of the current instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	public getMillisecond(): number {
		return this.#instance.millisecond();
	}

	/**
	 * Get the second of the current instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	public getSecond(): number {
		return this.#instance.second();
	}

	/**
	 * Get the minute of the current instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	public getMinute(): number {
		return this.#instance.minute();
	}

	/**
	 * Get the hour of the current instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	public getHour(): number {
		return this.#instance.hour();
	}

	/**
	 * Get the dayofmonth of the current instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	public getDayOfMonth(): number {
		return this.#instance.date();
	}

	/**
	 * Get the day of the current instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	public getDay(): number {
		return this.#instance.dayOfYear();
	}

	/**
	 * Get the week of the current instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	public getWeek(): number {
		return this.#instance.week();
	}

	/**
	 * Get the month of the current instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	public getMonth(): number {
		return this.#instance.month();
	}

	/**
	 * Get the quarter of the current instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	public getQuarter(): number {
		return this.#instance.quarter();
	}

	/**
	 * Get the year of the current instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	public getYear(): number {
		return this.#instance.year();
	}

	/**
	 * Set the millisecond of the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public setMillisecond(value: number): DateTime {
		return DateTime.make(this.#instance.millisecond(value), this.#locale);
	}

	/**
	 * Set the second of the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public setSecond(value: number): DateTime {
		return DateTime.make(this.#instance.second(value), this.#locale);
	}

	/**
	 * Set the minute of the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public setMinute(value: number): DateTime {
		return DateTime.make(this.#instance.minute(value), this.#locale);
	}

	/**
	 * Set the hour of the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public setHour(value: number): DateTime {
		return DateTime.make(this.#instance.hour(value), this.#locale);
	}

	/**
	 * Set the dayofmonth of the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public setDayOfMonth(value: number): DateTime {
		return DateTime.make(this.#instance.date(value), this.#locale);
	}

	/**
	 * Set the day of the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public setDay(value: number): DateTime {
		return DateTime.make(this.#instance.dayOfYear(value), this.#locale);
	}

	/**
	 * Set the week of the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public setWeek(value: number): DateTime {
		return DateTime.make(this.#instance.week(value), this.#locale);
	}

	/**
	 * Set the month of the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public setMonth(value: number): DateTime {
		return DateTime.make(this.#instance.month(value), this.#locale);
	}

	/**
	 * Set the quarter of the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public setQuarter(value: number): DateTime {
		return DateTime.make(this.#instance.quarter(value), this.#locale);
	}

	/**
	 * Set the year of the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public setYear(value: number): DateTime {
		return DateTime.make(this.#instance.year(value), this.#locale);
	}

	/**
	 * Add millisecond to the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addMillisecond(): DateTime {
		return this.addMilliseconds(1);
	}

	/**
	 * Add milliseconds to the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addMilliseconds(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "millisecond"), this.#locale);
	}

	/**
	 * Add second to the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addSecond(): DateTime {
		return this.addSeconds(1);
	}

	/**
	 * Add seconds to the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addSeconds(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "second"), this.#locale);
	}

	/**
	 * Add minute to the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addMinute(): DateTime {
		return this.addMinutes(1);
	}

	/**
	 * Add minutes to the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addMinutes(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "minute"), this.#locale);
	}

	/**
	 * Add hour to the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addHour(): DateTime {
		return this.addHours(1);
	}

	/**
	 * Add hours to the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addHours(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "hour"), this.#locale);
	}

	/**
	 * Add day to the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addDay(): DateTime {
		return this.addDays(1);
	}

	/**
	 * Add days to the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addDays(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "day"), this.#locale);
	}

	/**
	 * Add week to the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addWeek(): DateTime {
		return this.addWeeks(1);
	}

	/**
	 * Add weeks to the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addWeeks(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "week"), this.#locale);
	}

	/**
	 * Add month to the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addMonth(): DateTime {
		return this.addMonths(1);
	}

	/**
	 * Add months to the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addMonths(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "month"), this.#locale);
	}

	/**
	 * Add quarter to the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addQuarter(): DateTime {
		return this.addQuarters(1);
	}

	/**
	 * Add quarters to the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addQuarters(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "quarter"), this.#locale);
	}

	/**
	 * Add year to the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addYear(): DateTime {
		return this.addYears(1);
	}

	/**
	 * Add years to the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public addYears(value: number): DateTime {
		return DateTime.make(this.#instance.add(value, "year"), this.#locale);
	}

	/**
	 * Subtract millisecond from the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subMillisecond(): DateTime {
		return this.subMilliseconds(1);
	}

	/**
	 * Subtract milliseconds from the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subMilliseconds(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "millisecond"), this.#locale);
	}

	/**
	 * Subtract second from the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subSecond(): DateTime {
		return this.subSeconds(1);
	}

	/**
	 * Subtract seconds from the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subSeconds(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "second"), this.#locale);
	}

	/**
	 * Subtract minute from the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subMinute(): DateTime {
		return this.subMinutes(1);
	}

	/**
	 * Subtract minutes from the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subMinutes(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "minute"), this.#locale);
	}

	/**
	 * Subtract hour from the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subHour(): DateTime {
		return this.subHours(1);
	}

	/**
	 * Subtract hours from the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subHours(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "hour"), this.#locale);
	}

	/**
	 * Subtract day from the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subDay(): DateTime {
		return this.subDays(1);
	}

	/**
	 * Subtract days from the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subDays(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "day"), this.#locale);
	}

	/**
	 * Subtract week from the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subWeek(): DateTime {
		return this.subWeeks(1);
	}

	/**
	 * Subtract weeks from the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subWeeks(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "week"), this.#locale);
	}

	/**
	 * Subtract month from the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subMonth(): DateTime {
		return this.subMonths(1);
	}

	/**
	 * Subtract months from the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subMonths(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "month"), this.#locale);
	}

	/**
	 * Subtract quarter from the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subQuarter(): DateTime {
		return this.subQuarters(1);
	}

	/**
	 * Subtract quarters from the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subQuarters(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "quarter"), this.#locale);
	}

	/**
	 * Subtract year from the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subYear(): DateTime {
		return this.subYears(1);
	}

	/**
	 * Subtract years from the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public subYears(value: number): DateTime {
		return DateTime.make(this.#instance.subtract(value, "year"), this.#locale);
	}

	/**
	 * Get the difference between the given and current instance in milliseconds.
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	public diffInMilliseconds(value: DateTimeLike): number {
		return this.#instance.diff(this.#toUTC(value), "millisecond");
	}

	/**
	 * Get the difference between the given and current instance in seconds.
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	public diffInSeconds(value: DateTimeLike): number {
		return this.#instance.diff(this.#toUTC(value), "second");
	}

	/**
	 * Get the difference between the given and current instance in minutes.
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	public diffInMinutes(value: DateTimeLike): number {
		return this.#instance.diff(this.#toUTC(value), "minute");
	}

	/**
	 * Get the difference between the given and current instance in hours.
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	public diffInHours(value: DateTimeLike): number {
		return this.#instance.diff(this.#toUTC(value), "hour");
	}

	/**
	 * Get the difference between the given and current instance in days.
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	public diffInDays(value: DateTimeLike): number {
		return this.#instance.diff(this.#toUTC(value), "day");
	}

	/**
	 * Get the difference between the given and current instance in weeks.
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	public diffInWeeks(value: DateTimeLike): number {
		return this.#instance.diff(this.#toUTC(value), "week");
	}

	/**
	 * Get the difference between the given and current instance in months.
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	public diffInMonths(value: DateTimeLike): number {
		return this.#instance.diff(this.#toUTC(value), "month");
	}

	/**
	 * Get the difference between the given and current instance in quarters.
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	public diffInQuarters(value: DateTimeLike): number {
		return this.#instance.diff(this.#toUTC(value), "quarter");
	}

	/**
	 * Get the difference between the given and current instance in years.
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	public diffInYears(value: DateTimeLike): number {
		return this.#instance.diff(this.#toUTC(value), "year");
	}

	/**
	 * Format the current instance according to the given format.
	 *
	 * @param {string} value
	 * @returns {string}
	 * @memberof DateTime
	 */
	public format(value: string): string {
		return this.#instance.format(value);
	}

	/**
	 * Returns a cloned instance and sets it to the start of a unit of time.
	 *
	 * @param {QUnitType} unit
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	public startOf(unit: QUnitType): DateTime {
		return DateTime.make(this.#instance.startOf(unit), this.#locale);
	}

	/**
	 * Returns the string of relative time from X.
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
	 * Returns the string of relative time from now.
	 *
	 * @param {boolean} [withoutSuffix]
	 * @returns {string}
	 * @memberof DateTime
	 */
	public fromNow(withoutSuffix?: boolean): string {
		return this.#instance.fromNow(withoutSuffix);
	}

	/**
	 * Returns an object containing all segments of the current instance.
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
	 * Returns an ISO 8601 string representation of the date.
	 *
	 * @returns {string}
	 * @memberof DateTime
	 */
	public toJSON(): string {
		return this.#instance.toJSON();
	}

	/**
	 * Returns an ISO 8601 string representation of the date.
	 *
	 * @returns {string}
	 * @memberof DateTime
	 */
	public toISOString(): string {
		return this.#instance.toISOString();
	}

	/**
	 * Returns a string representation of the date.
	 *
	 * @returns {string}
	 * @memberof DateTime
	 */
	public toString(): string {
		return this.#instance.toString();
	}

	/**
	 * Returns the the number of seconds since the Unix Epoch of the instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	public toUNIX(): number {
		return this.#instance.unix();
	}

	/**
	 * Returns a native Date instance of the current instance.
	 *
	 * @returns {Date}
	 * @memberof DateTime
	 */
	public toDate(): Date {
		return this.#instance.toDate();
	}

	/**
	 * Returns the number of milliseconds since the Unix Epoch of the instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	public valueOf(): number {
		return this.#instance.valueOf();
	}

	/**
	 * Normalises the given value to the UTC timezone.
	 *
	 * @private
	 * @param {DateTimeLike} [value]
	 * @returns {dayjs.Dayjs}
	 * @memberof DateTime
	 */
	#toUTC(value?: DateTimeLike): dayjs.Dayjs {
		if (value instanceof DateTime) {
			return dayjs.utc(value.valueOf());
		}

		return dayjs.utc(value);
	}
}
