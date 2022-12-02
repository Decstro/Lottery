import {Model} from './model';

export class Lottery extends Model {
  public id(): string {
    return this.get('id');
  }
  public winningCombination(): boolean {
    return this.get('winning_combination');
  }
  public isRematch(): boolean {
    return this.get('isRematch');
  }
  public date(): boolean {
    return this.get('date');
  }
}