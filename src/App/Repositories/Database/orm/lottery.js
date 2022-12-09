import { Model } from 'objection';

export class Lottery extends Model {
  id: number;
  ballot_one: number;
  ballot_two: number;
  ballot_three: number;
  ballot_four: number;
  ballot_five: number;
  ballot_super: number;
  is_rematch: boolean;
  week_day: string;
  date: string;

  static get tableName() {
    return 'lotteries';
  }

  static get idColumn() {
    return 'id';
  }
}