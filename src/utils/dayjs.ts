import day from "dayjs";
import utc from "dayjs/plugin/utc";

day.extend(utc);

export const dayjs = day.utc;
