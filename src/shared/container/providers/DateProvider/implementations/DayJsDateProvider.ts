import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayJsDateProvider implements IDateProvider {
  convertToUtc(date: Date): string {
    return dayjs(date).utc().format();
  }

  isAfter(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isAfter(dayjs(end_date));
  }

  compareInHours(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUtc(end_date);
    const start_date_utc = this.convertToUtc(start_date);

    return dayjs(end_date_utc).diff(dayjs(start_date_utc), "hours");
  }
}

export { DayJsDateProvider };
