interface IDateProvider {
  addDays(days: number): Date;
  addHours(hours: number): Date;
  dateNow(): Date;
  compareInHours(start_date: Date, end_date: Date): number;
  compareInDays(start_date: Date, end_date: Date): number;
  convertToUtc(date: Date): string;
  isAfter(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };
