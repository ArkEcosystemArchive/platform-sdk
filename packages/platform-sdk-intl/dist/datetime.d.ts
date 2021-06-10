import dayjs, { ConfigType, QUnitType } from "dayjs";
declare type DateTimeLike = string | number | dayjs.Dayjs | DateTime;
/**
 * Simplifies working with dates and times through day.js
 *
 * @export
 * @class DateTime
 */
export declare class DateTime {
	#private;
	/**
	 * Creates an instance of DateTime.
	 *
	 * @param {DateTimeLike} [value]
	 * @param {*} [locale]
	 * @memberof DateTime
	 */
	private constructor();
	/**
	 * Creates an instance of DateTime.
	 *
	 * @static
	 * @param {DateTimeLike} [value]
	 * @param {string} [locale]
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	static make(value?: DateTimeLike, locale?: string): DateTime;
	/**
	 * Creates an instance of DateTime from a UNIX timestamp.
	 *
	 * @static
	 * @param {number} value
	 * @param {string} [locale]
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	static fromUnix(value: number, locale?: string): DateTime;
	/**
	 * Sets th Set the locale of the current instance.e locale that should be used for formatting.
	 *
	 * @param {string} locale
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	setLocale(locale: string): DateTime;
	/**
	 * Determines if the current instance is before the given value.
	 *
	 * @param {DateTimeLike} value
	 * @returns {boolean}
	 * @memberof DateTime
	 */
	isBefore(value: DateTimeLike): boolean;
	/**
	 * Determines if the current instance is the same as the given value.
	 *
	 * @param {DateTimeLike} value
	 * @returns {boolean}
	 * @memberof DateTime
	 */
	isSame(value: DateTimeLike): boolean;
	/**
	 * Determines if the current instance is after the given value.
	 *
	 * @param {DateTimeLike} value
	 * @returns {boolean}
	 * @memberof DateTime
	 */
	isAfter(value: DateTimeLike): boolean;
	/**
	 * Get the millisecond of the current instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	getMillisecond(): number;
	/**
	 * Get the second of the current instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	getSecond(): number;
	/**
	 * Get the minute of the current instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	getMinute(): number;
	/**
	 * Get the hour of the current instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	getHour(): number;
	/**
	 * Get the dayofmonth of the current instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	getDayOfMonth(): number;
	/**
	 * Get the day of the current instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	getDay(): number;
	/**
	 * Get the week of the current instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	getWeek(): number;
	/**
	 * Get the month of the current instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	getMonth(): number;
	/**
	 * Get the quarter of the current instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	getQuarter(): number;
	/**
	 * Get the year of the current instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	getYear(): number;
	/**
	 * Set the millisecond of the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	setMillisecond(value: number): DateTime;
	/**
	 * Set the second of the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	setSecond(value: number): DateTime;
	/**
	 * Set the minute of the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	setMinute(value: number): DateTime;
	/**
	 * Set the hour of the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	setHour(value: number): DateTime;
	/**
	 * Set the dayofmonth of the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	setDayOfMonth(value: number): DateTime;
	/**
	 * Set the day of the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	setDay(value: number): DateTime;
	/**
	 * Set the week of the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	setWeek(value: number): DateTime;
	/**
	 * Set the month of the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	setMonth(value: number): DateTime;
	/**
	 * Set the quarter of the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	setQuarter(value: number): DateTime;
	/**
	 * Set the year of the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	setYear(value: number): DateTime;
	/**
	 * Add millisecond to the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addMillisecond(): DateTime;
	/**
	 * Add milliseconds to the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addMilliseconds(value: number): DateTime;
	/**
	 * Add second to the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addSecond(): DateTime;
	/**
	 * Add seconds to the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addSeconds(value: number): DateTime;
	/**
	 * Add minute to the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addMinute(): DateTime;
	/**
	 * Add minutes to the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addMinutes(value: number): DateTime;
	/**
	 * Add hour to the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addHour(): DateTime;
	/**
	 * Add hours to the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addHours(value: number): DateTime;
	/**
	 * Add day to the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addDay(): DateTime;
	/**
	 * Add days to the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addDays(value: number): DateTime;
	/**
	 * Add week to the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addWeek(): DateTime;
	/**
	 * Add weeks to the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addWeeks(value: number): DateTime;
	/**
	 * Add month to the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addMonth(): DateTime;
	/**
	 * Add months to the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addMonths(value: number): DateTime;
	/**
	 * Add quarter to the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addQuarter(): DateTime;
	/**
	 * Add quarters to the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addQuarters(value: number): DateTime;
	/**
	 * Add year to the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addYear(): DateTime;
	/**
	 * Add years to the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addYears(value: number): DateTime;
	/**
	 * Subtract millisecond from the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subMillisecond(): DateTime;
	/**
	 * Subtract milliseconds from the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subMilliseconds(value: number): DateTime;
	/**
	 * Subtract second from the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subSecond(): DateTime;
	/**
	 * Subtract seconds from the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subSeconds(value: number): DateTime;
	/**
	 * Subtract minute from the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subMinute(): DateTime;
	/**
	 * Subtract minutes from the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subMinutes(value: number): DateTime;
	/**
	 * Subtract hour from the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subHour(): DateTime;
	/**
	 * Subtract hours from the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subHours(value: number): DateTime;
	/**
	 * Subtract day from the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subDay(): DateTime;
	/**
	 * Subtract days from the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subDays(value: number): DateTime;
	/**
	 * Subtract week from the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subWeek(): DateTime;
	/**
	 * Subtract weeks from the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subWeeks(value: number): DateTime;
	/**
	 * Subtract month from the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subMonth(): DateTime;
	/**
	 * Subtract months from the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subMonths(value: number): DateTime;
	/**
	 * Subtract quarter from the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subQuarter(): DateTime;
	/**
	 * Subtract quarters from the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subQuarters(value: number): DateTime;
	/**
	 * Subtract year from the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subYear(): DateTime;
	/**
	 * Subtract years from the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subYears(value: number): DateTime;
	/**
	 * Get the difference between the given and current instance in milliseconds.
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	diffInMilliseconds(value: DateTimeLike): number;
	/**
	 * Get the difference between the given and current instance in seconds.
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	diffInSeconds(value: DateTimeLike): number;
	/**
	 * Get the difference between the given and current instance in minutes.
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	diffInMinutes(value: DateTimeLike): number;
	/**
	 * Get the difference between the given and current instance in hours.
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	diffInHours(value: DateTimeLike): number;
	/**
	 * Get the difference between the given and current instance in days.
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	diffInDays(value: DateTimeLike): number;
	/**
	 * Get the difference between the given and current instance in weeks.
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	diffInWeeks(value: DateTimeLike): number;
	/**
	 * Get the difference between the given and current instance in months.
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	diffInMonths(value: DateTimeLike): number;
	/**
	 * Get the difference between the given and current instance in quarters.
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	diffInQuarters(value: DateTimeLike): number;
	/**
	 * Get the difference between the given and current instance in years.
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	diffInYears(value: DateTimeLike): number;
	/**
	 * Format the current instance according to the given format.
	 *
	 * @param {string} value
	 * @returns {string}
	 * @memberof DateTime
	 */
	format(value: string): string;
	/**
	 * Returns a cloned instance and sets it to the start of a unit of time.
	 *
	 * @param {QUnitType} unit
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	startOf(unit: QUnitType): DateTime;
	/**
	 * Returns the string of relative time from X.
	 *
	 * @param {ConfigType} compared
	 * @param {boolean} [withoutSuffix]
	 * @returns {string}
	 * @memberof DateTime
	 */
	from(compared: ConfigType, withoutSuffix?: boolean): string;
	/**
	 * Returns the string of relative time from now.
	 *
	 * @param {boolean} [withoutSuffix]
	 * @returns {string}
	 * @memberof DateTime
	 */
	fromNow(withoutSuffix?: boolean): string;
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
	toObject(): {
		years: number;
		months: number;
		date: number;
		hours: number;
		minutes: number;
		seconds: number;
		milliseconds: number;
	};
	/**
	 * Returns an ISO 8601 string representation of the date.
	 *
	 * @returns {string}
	 * @memberof DateTime
	 */
	toJSON(): string;
	/**
	 * Returns an ISO 8601 string representation of the date.
	 *
	 * @returns {string}
	 * @memberof DateTime
	 */
	toISOString(): string;
	/**
	 * Returns a string representation of the date.
	 *
	 * @returns {string}
	 * @memberof DateTime
	 */
	toString(): string;
	/**
	 * Returns the the number of seconds since the Unix Epoch of the instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	toUNIX(): number;
	/**
	 * Returns a native Date instance of the current instance.
	 *
	 * @returns {Date}
	 * @memberof DateTime
	 */
	toDate(): Date;
	/**
	 * Returns the number of milliseconds since the Unix Epoch of the instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	valueOf(): number;
}
export {};
