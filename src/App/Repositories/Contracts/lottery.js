import {Lottery} from '../../Models/lottery'

export type CreateLotteryParams = {
  ballot_one: number,
  ballot_two: number,
  ballot_three: number,
  ballot_four: number,
  ballot_five: number,
  ballot_super: number,
  is_rematch: boolean,
  week_day: string,
  date: string,
};

export interface LotteryRepository {
  createLotteryRecord(params: CreateLotteryParams) : Promise<Lottery>
  getNumberFrecuency(lotteryNumber: number, column: number) :  Promise<number|null>;
  getColumnMode() : Promise<number|null>;
  getColumnRange() : Promise<number|null>;
  getDatesMode(startDate: string, endDate: string) : Promise<number|null>;
  getModeByDay(weekDay: string, column: number) : Promise<number|null>;
}