import "jest-extended";

import { DateTime } from "./datetime";

let subject: DateTime;
beforeEach(() => (subject = DateTime.make("2020-01-01")));

test("#make", () => {
	const consoleSpy = jest.spyOn(console, "debug").mockReturnValue();

	DateTime.make("2020-01-01 12:00:00", "invalid");

	expect(consoleSpy).toHaveBeenCalledWith("Failed to load data for the [invalid] locale.");
});

test("#setLocale", () => {
	const subject = DateTime.fromUnix(1596534984);

	expect(subject.format("L LTS")).toBe("08/04/2020 9:56:24 AM");

	subject.setLocale("de");

	expect(subject.format("L LTS")).toBe("08/04/2020 9:56:24 AM");
});

test("#fromUnix", () => {
	const subject = DateTime.fromUnix(1596534984);

	expect(subject.format("YYYY-MM-DDTHH:mm:ssZ[Z]")).toBe("2020-08-04T09:56:24+00:00Z");
	expect(subject.format("DD/MM/YYYY")).toBe("04/08/2020");
	expect(subject.format("L h:mm:ss A")).toBe("08/04/2020 9:56:24 AM");
	expect(subject.format("L HH:mm:ss")).toBe("08/04/2020 09:56:24");
	expect(subject.format("L LTS")).toBe("08/04/2020 9:56:24 AM");
});

test("#isBefore", () => {
	expect(subject.isBefore(DateTime.make("2020-01-01").addDay())).toBeTrue();
	expect(subject.isBefore(DateTime.make("2020-01-01").subDay())).toBeFalse();
});

test("#isSame", () => {
	expect(subject.isSame(subject)).toBeTrue();
	expect(subject.isSame(DateTime.make("2020-01-01").addDay())).toBeFalse();
});

test("#isAfter", () => {
	expect(subject.isAfter(DateTime.make("2020-01-01").subDay())).toBeTrue();
	expect(subject.isAfter(DateTime.make("2020-01-01").addDay())).toBeFalse();
});

test("#getMillisecond", () => {
	expect(subject.getMillisecond()).toEqual(0);
});

test("#getSecond", () => {
	expect(subject.getSecond()).toEqual(0);
});

test("#getMinute", () => {
	expect(subject.getMinute()).toEqual(0);
});

test("#getHour", () => {
	expect(subject.getHour()).toEqual(0);
});

test("#getDayOfMonth", () => {
	expect(subject.getDayOfMonth()).toEqual(1);
});

test("#getDay", () => {
	expect(subject.getDay()).toEqual(1);
});

test("#getWeek", () => {
	expect(subject.getWeek()).toEqual(1);
});

test("#getMonth", () => {
	expect(subject.getMonth()).toEqual(0);
});

test("#getQuarter", () => {
	expect(subject.getQuarter()).toEqual(1);
});

test("#getYear", () => {
	expect(subject.getYear()).toEqual(2020);
});

test("#setMillisecond", () => {
	expect(subject.setMillisecond(500).getMillisecond()).toEqual(500);
});

test("#setSecond", () => {
	expect(subject.setSecond(30).getSecond()).toEqual(30);
});

test("#setMinute", () => {
	expect(subject.setMinute(30).getMinute()).toEqual(30);
});

test("#setHour", () => {
	expect(subject.setHour(12).getHour()).toEqual(12);
});

test("#setDayOfMonth", () => {
	expect(subject.setDayOfMonth(15).getDayOfMonth()).toEqual(15);
});

test("#setDay", () => {
	expect(subject.setDay(123).getDay()).toEqual(123);
});

test("#setWeek", () => {
	expect(subject.setWeek(26).getWeek()).toEqual(26);
});

test("#setMonth", () => {
	expect(subject.setMonth(3).getMonth()).toEqual(3);
});

test("#setQuarter", () => {
	expect(subject.setQuarter(2).getQuarter()).toEqual(2);
});

test("#setYear", () => {
	expect(subject.setYear(123).getYear()).toEqual(123);
});

test("#addMillisecond", () => {
	expect(subject.addMillisecond()).not.toEqual(subject.toString());
});

test("#addMilliseconds", () => {
	expect(subject.addMilliseconds(5)).not.toEqual(subject.toString());
});

test("#addSecond", () => {
	expect(subject.addSecond()).not.toEqual(subject.toString());
});

test("#addSeconds", () => {
	expect(subject.addSeconds(5)).not.toEqual(subject.toString());
});

test("#addMinute", () => {
	expect(subject.addMinute()).not.toEqual(subject.toString());
});

test("#addMinutes", () => {
	expect(subject.addMinutes(5)).not.toEqual(subject.toString());
});

test("#addHour", () => {
	expect(subject.addHour()).not.toEqual(subject.toString());
});

test("#addHours", () => {
	expect(subject.addHours(5)).not.toEqual(subject.toString());
});

test("#addDay", () => {
	expect(subject.addDay()).not.toEqual(subject.toString());
});

test("#addDays", () => {
	expect(subject.addDays(5)).not.toEqual(subject.toString());
});

test("#addWeek", () => {
	expect(subject.addWeek()).not.toEqual(subject.toString());
});

test("#addWeeks", () => {
	expect(subject.addWeeks(5)).not.toEqual(subject.toString());
});

test("#addMonth", () => {
	expect(subject.addMonth()).not.toEqual(subject.toString());
});

test("#addMonths", () => {
	expect(subject.addMonths(5)).not.toEqual(subject.toString());
});

test("#addYear", () => {
	expect(subject.addYear()).not.toEqual(subject.toString());
});

test("#addYears", () => {
	expect(subject.addYears(5)).not.toEqual(subject.toString());
});

test("#subMillisecond", () => {
	expect(subject.subMillisecond()).not.toEqual(subject.toString());
});

test("#subMilliseconds", () => {
	expect(subject.subMilliseconds(5)).not.toEqual(subject.toString());
});

test("#subSecond", () => {
	expect(subject.subSecond()).not.toEqual(subject.toString());
});

test("#subSeconds", () => {
	expect(subject.subSeconds(5)).not.toEqual(subject.toString());
});

test("#subMinute", () => {
	expect(subject.subMinute()).not.toEqual(subject.toString());
});

test("#subMinutes", () => {
	expect(subject.subMinutes(5)).not.toEqual(subject.toString());
});

test("#subHour", () => {
	expect(subject.subHour()).not.toEqual(subject.toString());
});

test("#subHours", () => {
	expect(subject.subHours(5)).not.toEqual(subject.toString());
});

test("#subDay", () => {
	expect(subject.subDay()).not.toEqual(subject.toString());
});

test("#subDays", () => {
	expect(subject.subDays(5)).not.toEqual(subject.toString());
});

test("#subWeek", () => {
	expect(subject.subWeek()).not.toEqual(subject.toString());
});

test("#subWeeks", () => {
	expect(subject.subWeeks(5)).not.toEqual(subject.toString());
});

test("#subMonth", () => {
	expect(subject.subMonth()).not.toEqual(subject.toString());
});

test("#subMonths", () => {
	expect(subject.subMonths(5)).not.toEqual(subject.toString());
});

test("#subQuarter", () => {
	expect(subject.subQuarter()).not.toEqual(subject.toString());
});

test("#subQuarters", () => {
	expect(subject.subQuarters(5)).not.toEqual(subject.toString());
});

test("#subYear", () => {
	expect(subject.subYear()).not.toEqual(subject.toString());
});

test("#subYears", () => {
	expect(subject.subYears(5)).not.toEqual(subject.toString());
});

test("#diffInMilliseconds", () => {
	expect(subject.diffInMilliseconds(subject.addMillisecond())).toBe(-1);
});

test("#diffInSeconds", () => {
	expect(subject.diffInSeconds(subject.addSecond())).toBe(-1);
});

test("#diffInMinutes", () => {
	expect(subject.diffInMinutes(subject.addMinute())).toBe(-1);
});

test("#diffInHours", () => {
	expect(subject.diffInHours(subject.addHour())).toBe(-1);
});

test("#diffInDays", () => {
	expect(subject.diffInDays(subject.addDay())).toBe(-1);
});

test("#diffInWeeks", () => {
	expect(subject.diffInWeeks(subject.addWeek())).toBe(-1);
});

test("#diffInMonths", () => {
	expect(subject.diffInMonths(subject.addMonth())).toBe(-1);
});

test("#diffInQuarters", () => {
	expect(subject.diffInQuarters(subject.addQuarter())).toBe(-1);
});

test("#diffInYears", () => {
	expect(subject.diffInYears(subject.addYear())).toBe(-1);
});

test("#format", () => {
	expect(subject.format("YYYY-MM-DDTHH:mm:ssZ[Z]")).toBe("2020-01-01T00:00:00+00:00Z");
	expect(subject.format("DD/MM/YYYY")).toBe("01/01/2020");
	expect(subject.format("L h:mm:ss A")).toBe("01/01/2020 12:00:00 AM");
	expect(subject.format("L HH:mm:ss")).toBe("01/01/2020 00:00:00");
	expect(subject.format("L LTS")).toBe("01/01/2020 12:00:00 AM");
});

test("#toObject", () => {
	expect(subject.toObject()).toEqual({
		date: 1,
		hours: 0,
		milliseconds: 0,
		minutes: 0,
		months: 0,
		seconds: 0,
		years: 2020,
	});
});

test("#toJSON", () => {
	expect(subject.toJSON()).toBe("2020-01-01T00:00:00.000Z");
});

test("#toISOString", () => {
	expect(subject.toISOString()).toBe("2020-01-01T00:00:00.000Z");
});

test("#toString", () => {
	expect(subject.toString()).toBe("Wed, 01 Jan 2020 00:00:00 GMT");
});

test("#toUNIX", () => {
	expect(subject.toUNIX()).toBe(1577836800);
});

test("#valueOf", () => {
	expect(subject.valueOf()).toBe(1577836800000);
});

test("#toDate", () => {
	expect(subject.toDate()).toBeDate();
});

test("#startOf", () => {
	expect(subject.startOf("year").toISOString()).toBe("2020-01-01T00:00:00.000Z");
});

test("#from", () => {
	expect(subject.from("2019")).toBe("in a year");
	expect(subject.from("2019", true)).toBe("a year");

	expect(subject.from("2018")).toBe("in 2 years");
	expect(subject.from("2018", true)).toBe("2 years");

	expect(subject.from("2021")).toBe("a year ago");
	expect(subject.from("2021", true)).toBe("a year");

	expect(subject.from("2022")).toBe("2 years ago");
	expect(subject.from("2022", true)).toBe("2 years");
});

test("#fromNow", () => {
	const now = DateTime.make().toString();
	const fromNow = subject.from(now).toString();
	expect(subject.fromNow()).toBe(fromNow);
});
