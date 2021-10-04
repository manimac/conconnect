
export interface ObjectIndexer<T> {
  [id: string]: T;
}

export interface datePipe extends ObjectIndexer <number> {
  year: number;
  month: number;
  week: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}
