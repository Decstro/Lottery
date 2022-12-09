import {LotteryRepository as LotteryContract, CreateLotteryParams} from '../Contracts/lottery.js';
import {Lottery as LotteryORM} from './orm/lottery.js';
import {Lottery} from '../../Models/lottery.js';

export class LotteryRepository implements LotteryContract {
  public async createLotteryRecord(params: CreateLotteryParams) : Promise<Lottery> {
    const lotteryRecord = await LotteryORM.query()
      .insert({
        ballot_one: params.ballot_one,
        ballot_two: params.ballot_two,
        ballot_three: params.ballot_three,
        ballot_four: params.ballot_four,
        ballot_five: params.ballot_five,
        ballot_super: params.ballot_super,
        is_rematch: params.is_rematch,
        week_day: params.week_day,
        date: params.date
      });
    return new Lottery({...(lotteryRecord)});
  }
  // public async getNumberFrecuency(lotteryNumber: number, column: number) :  Promise<number|null> {
  //
  // }
  // public async getColumnMode() : Promise<number|null> {
  //
  // }
  // public async getColumnRange() : Promise<number|null> {
  //
  // }
  // public async getDatesMode(startDate: string, endDate: string) : Promise<number|null> {
  //
  // }
  // public async getModeByDay(weekDay: string, column: number) : Promise<number|null> {
  //
  // }
}

