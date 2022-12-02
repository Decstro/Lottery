import {Lottery} from '../../Models/lottery'

export type CreateLotteryParams = {
    winning_combination: string;
    isRematch: boolean;
    date: string;
};

export interface LotteryRepository {
  createLotteryRecord(params: CreateLotteryParams) : Promise<Lottery>
  getNumberFrecuency(lotteryNumber: number, column: number) :  Promise<number|null>;
  getColumnMode() : Promise<number|null>;
  getColumnRange() : Promise<number|null>;
  getDatesMode(startDate: string, endDate: string) : Promise<number|null>;
  getModeByDay(weekDay: string, column: number) : Promise<number|null>;
}