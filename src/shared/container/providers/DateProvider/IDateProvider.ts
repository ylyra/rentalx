interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUtc(date: Date): string;
  isAfter(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };
