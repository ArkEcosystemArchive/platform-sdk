"use strict";
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var __classPrivateFieldSet =
	(this && this.__classPrivateFieldSet) ||
	function (receiver, state, value, kind, f) {
		if (kind === "m") throw new TypeError("Private method is not writable");
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot write private member to an object whose class did not declare it");
		return kind === "a" ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value;
	};
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
var _DateTime_instances, _DateTime_instance, _DateTime_locale, _DateTime_toUTC;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTime = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const advancedFormat_1 = __importDefault(require("dayjs/plugin/advancedFormat"));
const dayOfYear_1 = __importDefault(require("dayjs/plugin/dayOfYear"));
const localizedFormat_1 = __importDefault(require("dayjs/plugin/localizedFormat"));
const quarterOfYear_1 = __importDefault(require("dayjs/plugin/quarterOfYear"));
const relativeTime_1 = __importDefault(require("dayjs/plugin/relativeTime"));
const toObject_1 = __importDefault(require("dayjs/plugin/toObject"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const weekOfYear_1 = __importDefault(require("dayjs/plugin/weekOfYear"));
dayjs_1.default.extend(advancedFormat_1.default);
dayjs_1.default.extend(dayOfYear_1.default);
dayjs_1.default.extend(localizedFormat_1.default);
dayjs_1.default.extend(quarterOfYear_1.default);
dayjs_1.default.extend(toObject_1.default);
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(weekOfYear_1.default);
dayjs_1.default.extend(relativeTime_1.default);
/**
 * Simplifies working with dates and times through day.js
 *
 * @export
 * @class DateTime
 */
class DateTime {
	/**
	 * Creates an instance of DateTime.
	 *
	 * @param {DateTimeLike} [value]
	 * @param {*} [locale]
	 * @memberof DateTime
	 */
	constructor(value, locale) {
		_DateTime_instances.add(this);
		/**
		 * The date and time that is being represented.
		 *
		 * @type {dayjs.Dayjs}
		 * @memberof DateTime
		 */
		_DateTime_instance.set(this, void 0);
		/**
		 * The locale that should be used for formatting.
		 *
		 * @type {(string | undefined)}
		 * @memberof DateTime
		 */
		_DateTime_locale.set(this, void 0);
		__classPrivateFieldSet(
			this,
			_DateTime_instance,
			__classPrivateFieldGet(this, _DateTime_instances, "m", _DateTime_toUTC).call(this, value),
			"f",
		);
		__classPrivateFieldSet(this, _DateTime_locale, locale, "f");
		if (!locale) {
			locale = "en";
		}
		try {
			require(`dayjs/locale/${locale}.js`);
			__classPrivateFieldGet(this, _DateTime_instance, "f").locale(locale);
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
	static make(value, locale) {
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
	static fromUnix(value, locale) {
		return new DateTime(dayjs_1.default.unix(value), locale);
	}
	/**
	 * Sets th Set the locale of the current instance.e locale that should be used for formatting.
	 *
	 * @param {string} locale
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	setLocale(locale) {
		return DateTime.make(this.valueOf(), locale);
	}
	/**
	 * Determines if the current instance is before the given value.
	 *
	 * @param {DateTimeLike} value
	 * @returns {boolean}
	 * @memberof DateTime
	 */
	isBefore(value) {
		return __classPrivateFieldGet(this, _DateTime_instance, "f").isBefore(
			__classPrivateFieldGet(this, _DateTime_instances, "m", _DateTime_toUTC).call(this, value),
		);
	}
	/**
	 * Determines if the current instance is the same as the given value.
	 *
	 * @param {DateTimeLike} value
	 * @returns {boolean}
	 * @memberof DateTime
	 */
	isSame(value) {
		return __classPrivateFieldGet(this, _DateTime_instance, "f").isSame(
			__classPrivateFieldGet(this, _DateTime_instances, "m", _DateTime_toUTC).call(this, value),
		);
	}
	/**
	 * Determines if the current instance is after the given value.
	 *
	 * @param {DateTimeLike} value
	 * @returns {boolean}
	 * @memberof DateTime
	 */
	isAfter(value) {
		return __classPrivateFieldGet(this, _DateTime_instance, "f").isAfter(
			__classPrivateFieldGet(this, _DateTime_instances, "m", _DateTime_toUTC).call(this, value),
		);
	}
	/**
	 * Get the millisecond of the current instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	getMillisecond() {
		return __classPrivateFieldGet(this, _DateTime_instance, "f").millisecond();
	}
	/**
	 * Get the second of the current instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	getSecond() {
		return __classPrivateFieldGet(this, _DateTime_instance, "f").second();
	}
	/**
	 * Get the minute of the current instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	getMinute() {
		return __classPrivateFieldGet(this, _DateTime_instance, "f").minute();
	}
	/**
	 * Get the hour of the current instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	getHour() {
		return __classPrivateFieldGet(this, _DateTime_instance, "f").hour();
	}
	/**
	 * Get the dayofmonth of the current instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	getDayOfMonth() {
		return __classPrivateFieldGet(this, _DateTime_instance, "f").date();
	}
	/**
	 * Get the day of the current instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	getDay() {
		return __classPrivateFieldGet(this, _DateTime_instance, "f").dayOfYear();
	}
	/**
	 * Get the week of the current instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	getWeek() {
		return __classPrivateFieldGet(this, _DateTime_instance, "f").week();
	}
	/**
	 * Get the month of the current instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	getMonth() {
		return __classPrivateFieldGet(this, _DateTime_instance, "f").month();
	}
	/**
	 * Get the quarter of the current instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	getQuarter() {
		return __classPrivateFieldGet(this, _DateTime_instance, "f").quarter();
	}
	/**
	 * Get the year of the current instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	getYear() {
		return __classPrivateFieldGet(this, _DateTime_instance, "f").year();
	}
	/**
	 * Set the millisecond of the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	setMillisecond(value) {
		return DateTime.make(
			__classPrivateFieldGet(this, _DateTime_instance, "f").millisecond(value),
			__classPrivateFieldGet(this, _DateTime_locale, "f"),
		);
	}
	/**
	 * Set the second of the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	setSecond(value) {
		return DateTime.make(
			__classPrivateFieldGet(this, _DateTime_instance, "f").second(value),
			__classPrivateFieldGet(this, _DateTime_locale, "f"),
		);
	}
	/**
	 * Set the minute of the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	setMinute(value) {
		return DateTime.make(
			__classPrivateFieldGet(this, _DateTime_instance, "f").minute(value),
			__classPrivateFieldGet(this, _DateTime_locale, "f"),
		);
	}
	/**
	 * Set the hour of the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	setHour(value) {
		return DateTime.make(
			__classPrivateFieldGet(this, _DateTime_instance, "f").hour(value),
			__classPrivateFieldGet(this, _DateTime_locale, "f"),
		);
	}
	/**
	 * Set the dayofmonth of the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	setDayOfMonth(value) {
		return DateTime.make(
			__classPrivateFieldGet(this, _DateTime_instance, "f").date(value),
			__classPrivateFieldGet(this, _DateTime_locale, "f"),
		);
	}
	/**
	 * Set the day of the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	setDay(value) {
		return DateTime.make(
			__classPrivateFieldGet(this, _DateTime_instance, "f").dayOfYear(value),
			__classPrivateFieldGet(this, _DateTime_locale, "f"),
		);
	}
	/**
	 * Set the week of the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	setWeek(value) {
		return DateTime.make(
			__classPrivateFieldGet(this, _DateTime_instance, "f").week(value),
			__classPrivateFieldGet(this, _DateTime_locale, "f"),
		);
	}
	/**
	 * Set the month of the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	setMonth(value) {
		return DateTime.make(
			__classPrivateFieldGet(this, _DateTime_instance, "f").month(value),
			__classPrivateFieldGet(this, _DateTime_locale, "f"),
		);
	}
	/**
	 * Set the quarter of the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	setQuarter(value) {
		return DateTime.make(
			__classPrivateFieldGet(this, _DateTime_instance, "f").quarter(value),
			__classPrivateFieldGet(this, _DateTime_locale, "f"),
		);
	}
	/**
	 * Set the year of the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	setYear(value) {
		return DateTime.make(
			__classPrivateFieldGet(this, _DateTime_instance, "f").year(value),
			__classPrivateFieldGet(this, _DateTime_locale, "f"),
		);
	}
	/**
	 * Add millisecond to the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addMillisecond() {
		return this.addMilliseconds(1);
	}
	/**
	 * Add milliseconds to the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addMilliseconds(value) {
		return DateTime.make(
			__classPrivateFieldGet(this, _DateTime_instance, "f").add(value, "millisecond"),
			__classPrivateFieldGet(this, _DateTime_locale, "f"),
		);
	}
	/**
	 * Add second to the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addSecond() {
		return this.addSeconds(1);
	}
	/**
	 * Add seconds to the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addSeconds(value) {
		return DateTime.make(
			__classPrivateFieldGet(this, _DateTime_instance, "f").add(value, "second"),
			__classPrivateFieldGet(this, _DateTime_locale, "f"),
		);
	}
	/**
	 * Add minute to the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addMinute() {
		return this.addMinutes(1);
	}
	/**
	 * Add minutes to the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addMinutes(value) {
		return DateTime.make(
			__classPrivateFieldGet(this, _DateTime_instance, "f").add(value, "minute"),
			__classPrivateFieldGet(this, _DateTime_locale, "f"),
		);
	}
	/**
	 * Add hour to the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addHour() {
		return this.addHours(1);
	}
	/**
	 * Add hours to the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addHours(value) {
		return DateTime.make(
			__classPrivateFieldGet(this, _DateTime_instance, "f").add(value, "hour"),
			__classPrivateFieldGet(this, _DateTime_locale, "f"),
		);
	}
	/**
	 * Add day to the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addDay() {
		return this.addDays(1);
	}
	/**
	 * Add days to the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addDays(value) {
		return DateTime.make(
			__classPrivateFieldGet(this, _DateTime_instance, "f").add(value, "day"),
			__classPrivateFieldGet(this, _DateTime_locale, "f"),
		);
	}
	/**
	 * Add week to the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addWeek() {
		return this.addWeeks(1);
	}
	/**
	 * Add weeks to the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addWeeks(value) {
		return DateTime.make(
			__classPrivateFieldGet(this, _DateTime_instance, "f").add(value, "week"),
			__classPrivateFieldGet(this, _DateTime_locale, "f"),
		);
	}
	/**
	 * Add month to the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addMonth() {
		return this.addMonths(1);
	}
	/**
	 * Add months to the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addMonths(value) {
		return DateTime.make(
			__classPrivateFieldGet(this, _DateTime_instance, "f").add(value, "month"),
			__classPrivateFieldGet(this, _DateTime_locale, "f"),
		);
	}
	/**
	 * Add quarter to the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addQuarter() {
		return this.addQuarters(1);
	}
	/**
	 * Add quarters to the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addQuarters(value) {
		return DateTime.make(
			__classPrivateFieldGet(this, _DateTime_instance, "f").add(value, "quarter"),
			__classPrivateFieldGet(this, _DateTime_locale, "f"),
		);
	}
	/**
	 * Add year to the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addYear() {
		return this.addYears(1);
	}
	/**
	 * Add years to the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	addYears(value) {
		return DateTime.make(
			__classPrivateFieldGet(this, _DateTime_instance, "f").add(value, "year"),
			__classPrivateFieldGet(this, _DateTime_locale, "f"),
		);
	}
	/**
	 * Subtract millisecond from the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subMillisecond() {
		return this.subMilliseconds(1);
	}
	/**
	 * Subtract milliseconds from the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subMilliseconds(value) {
		return DateTime.make(
			__classPrivateFieldGet(this, _DateTime_instance, "f").subtract(value, "millisecond"),
			__classPrivateFieldGet(this, _DateTime_locale, "f"),
		);
	}
	/**
	 * Subtract second from the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subSecond() {
		return this.subSeconds(1);
	}
	/**
	 * Subtract seconds from the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subSeconds(value) {
		return DateTime.make(
			__classPrivateFieldGet(this, _DateTime_instance, "f").subtract(value, "second"),
			__classPrivateFieldGet(this, _DateTime_locale, "f"),
		);
	}
	/**
	 * Subtract minute from the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subMinute() {
		return this.subMinutes(1);
	}
	/**
	 * Subtract minutes from the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subMinutes(value) {
		return DateTime.make(
			__classPrivateFieldGet(this, _DateTime_instance, "f").subtract(value, "minute"),
			__classPrivateFieldGet(this, _DateTime_locale, "f"),
		);
	}
	/**
	 * Subtract hour from the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subHour() {
		return this.subHours(1);
	}
	/**
	 * Subtract hours from the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subHours(value) {
		return DateTime.make(
			__classPrivateFieldGet(this, _DateTime_instance, "f").subtract(value, "hour"),
			__classPrivateFieldGet(this, _DateTime_locale, "f"),
		);
	}
	/**
	 * Subtract day from the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subDay() {
		return this.subDays(1);
	}
	/**
	 * Subtract days from the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subDays(value) {
		return DateTime.make(
			__classPrivateFieldGet(this, _DateTime_instance, "f").subtract(value, "day"),
			__classPrivateFieldGet(this, _DateTime_locale, "f"),
		);
	}
	/**
	 * Subtract week from the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subWeek() {
		return this.subWeeks(1);
	}
	/**
	 * Subtract weeks from the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subWeeks(value) {
		return DateTime.make(
			__classPrivateFieldGet(this, _DateTime_instance, "f").subtract(value, "week"),
			__classPrivateFieldGet(this, _DateTime_locale, "f"),
		);
	}
	/**
	 * Subtract month from the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subMonth() {
		return this.subMonths(1);
	}
	/**
	 * Subtract months from the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subMonths(value) {
		return DateTime.make(
			__classPrivateFieldGet(this, _DateTime_instance, "f").subtract(value, "month"),
			__classPrivateFieldGet(this, _DateTime_locale, "f"),
		);
	}
	/**
	 * Subtract quarter from the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subQuarter() {
		return this.subQuarters(1);
	}
	/**
	 * Subtract quarters from the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subQuarters(value) {
		return DateTime.make(
			__classPrivateFieldGet(this, _DateTime_instance, "f").subtract(value, "quarter"),
			__classPrivateFieldGet(this, _DateTime_locale, "f"),
		);
	}
	/**
	 * Subtract year from the current instance.
	 *
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subYear() {
		return this.subYears(1);
	}
	/**
	 * Subtract years from the current instance.
	 *
	 * @param {number} value
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	subYears(value) {
		return DateTime.make(
			__classPrivateFieldGet(this, _DateTime_instance, "f").subtract(value, "year"),
			__classPrivateFieldGet(this, _DateTime_locale, "f"),
		);
	}
	/**
	 * Get the difference between the given and current instance in milliseconds.
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	diffInMilliseconds(value) {
		return __classPrivateFieldGet(this, _DateTime_instance, "f").diff(
			__classPrivateFieldGet(this, _DateTime_instances, "m", _DateTime_toUTC).call(this, value),
			"millisecond",
		);
	}
	/**
	 * Get the difference between the given and current instance in seconds.
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	diffInSeconds(value) {
		return __classPrivateFieldGet(this, _DateTime_instance, "f").diff(
			__classPrivateFieldGet(this, _DateTime_instances, "m", _DateTime_toUTC).call(this, value),
			"second",
		);
	}
	/**
	 * Get the difference between the given and current instance in minutes.
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	diffInMinutes(value) {
		return __classPrivateFieldGet(this, _DateTime_instance, "f").diff(
			__classPrivateFieldGet(this, _DateTime_instances, "m", _DateTime_toUTC).call(this, value),
			"minute",
		);
	}
	/**
	 * Get the difference between the given and current instance in hours.
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	diffInHours(value) {
		return __classPrivateFieldGet(this, _DateTime_instance, "f").diff(
			__classPrivateFieldGet(this, _DateTime_instances, "m", _DateTime_toUTC).call(this, value),
			"hour",
		);
	}
	/**
	 * Get the difference between the given and current instance in days.
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	diffInDays(value) {
		return __classPrivateFieldGet(this, _DateTime_instance, "f").diff(
			__classPrivateFieldGet(this, _DateTime_instances, "m", _DateTime_toUTC).call(this, value),
			"day",
		);
	}
	/**
	 * Get the difference between the given and current instance in weeks.
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	diffInWeeks(value) {
		return __classPrivateFieldGet(this, _DateTime_instance, "f").diff(
			__classPrivateFieldGet(this, _DateTime_instances, "m", _DateTime_toUTC).call(this, value),
			"week",
		);
	}
	/**
	 * Get the difference between the given and current instance in months.
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	diffInMonths(value) {
		return __classPrivateFieldGet(this, _DateTime_instance, "f").diff(
			__classPrivateFieldGet(this, _DateTime_instances, "m", _DateTime_toUTC).call(this, value),
			"month",
		);
	}
	/**
	 * Get the difference between the given and current instance in quarters.
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	diffInQuarters(value) {
		return __classPrivateFieldGet(this, _DateTime_instance, "f").diff(
			__classPrivateFieldGet(this, _DateTime_instances, "m", _DateTime_toUTC).call(this, value),
			"quarter",
		);
	}
	/**
	 * Get the difference between the given and current instance in years.
	 *
	 * @param {DateTimeLike} value
	 * @returns {number}
	 * @memberof DateTime
	 */
	diffInYears(value) {
		return __classPrivateFieldGet(this, _DateTime_instance, "f").diff(
			__classPrivateFieldGet(this, _DateTime_instances, "m", _DateTime_toUTC).call(this, value),
			"year",
		);
	}
	/**
	 * Format the current instance according to the given format.
	 *
	 * @param {string} value
	 * @returns {string}
	 * @memberof DateTime
	 */
	format(value) {
		return __classPrivateFieldGet(this, _DateTime_instance, "f").format(value);
	}
	/**
	 * Returns a cloned instance and sets it to the start of a unit of time.
	 *
	 * @param {QUnitType} unit
	 * @returns {DateTime}
	 * @memberof DateTime
	 */
	startOf(unit) {
		return DateTime.make(
			__classPrivateFieldGet(this, _DateTime_instance, "f").startOf(unit),
			__classPrivateFieldGet(this, _DateTime_locale, "f"),
		);
	}
	/**
	 * Returns the string of relative time from X.
	 *
	 * @param {ConfigType} compared
	 * @param {boolean} [withoutSuffix]
	 * @returns {string}
	 * @memberof DateTime
	 */
	from(compared, withoutSuffix) {
		return __classPrivateFieldGet(this, _DateTime_instance, "f").from(compared, withoutSuffix);
	}
	/**
	 * Returns the string of relative time from now.
	 *
	 * @param {boolean} [withoutSuffix]
	 * @returns {string}
	 * @memberof DateTime
	 */
	fromNow(withoutSuffix) {
		return __classPrivateFieldGet(this, _DateTime_instance, "f").fromNow(withoutSuffix);
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
	toObject() {
		return __classPrivateFieldGet(this, _DateTime_instance, "f").toObject();
	}
	/**
	 * Returns an ISO 8601 string representation of the date.
	 *
	 * @returns {string}
	 * @memberof DateTime
	 */
	toJSON() {
		return __classPrivateFieldGet(this, _DateTime_instance, "f").toJSON();
	}
	/**
	 * Returns an ISO 8601 string representation of the date.
	 *
	 * @returns {string}
	 * @memberof DateTime
	 */
	toISOString() {
		return __classPrivateFieldGet(this, _DateTime_instance, "f").toISOString();
	}
	/**
	 * Returns a string representation of the date.
	 *
	 * @returns {string}
	 * @memberof DateTime
	 */
	toString() {
		return __classPrivateFieldGet(this, _DateTime_instance, "f").toString();
	}
	/**
	 * Returns the the number of seconds since the Unix Epoch of the instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	toUNIX() {
		return __classPrivateFieldGet(this, _DateTime_instance, "f").unix();
	}
	/**
	 * Returns a native Date instance of the current instance.
	 *
	 * @returns {Date}
	 * @memberof DateTime
	 */
	toDate() {
		return __classPrivateFieldGet(this, _DateTime_instance, "f").toDate();
	}
	/**
	 * Returns the number of milliseconds since the Unix Epoch of the instance.
	 *
	 * @returns {number}
	 * @memberof DateTime
	 */
	valueOf() {
		return __classPrivateFieldGet(this, _DateTime_instance, "f").valueOf();
	}
}
exports.DateTime = DateTime;
(_DateTime_instance = new WeakMap()),
	(_DateTime_locale = new WeakMap()),
	(_DateTime_instances = new WeakSet()),
	(_DateTime_toUTC = function _DateTime_toUTC(value) {
		if (value instanceof DateTime) {
			return dayjs_1.default.utc(value.valueOf());
		}
		return dayjs_1.default.utc(value);
	});
//# sourceMappingURL=datetime.js.map
