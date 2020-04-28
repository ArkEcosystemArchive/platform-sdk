import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";

day.extend(advancedFormat);
day.extend(localizedFormat);
day.extend(utc);

export const dayjs = day.utc;
