import {Model} from './model';

export class Lottery extends Model {
  public id(): string {
    return this.get('id');
  }
  public ballotOne(): boolean {
    return this.get('ballot_one');
  }
  public ballotTwo(): boolean {
    return this.get('ballot_two');
  }
  public ballotThree(): boolean {
    return this.get('ballot_three');
  }
  public ballotFour(): boolean {
    return this.get('ballot_four');
  }
  public ballotFive(): boolean {
    return this.get('ballot_five');
  }
  public ballotSuper(): boolean {
    return this.get('ballot_super');
  }
  public weekDay(): boolean {
    return this.get('week_day');
  }
  public isRematch(): boolean {
    return this.get('is_rematch');
  }
  public date(): boolean {
    return this.get('date');
  }
}