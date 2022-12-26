const {Model} = require('./model')

class Lottery extends Model {
  id() {
    return this.get('id');
  }
  ballotOne() {
    return this.get('ballot_one');
  }
  ballotTwo() {
    return this.get('ballot_two');
  }
  ballotThree() {
    return this.get('ballot_three');
  }
  ballotFour() {
    return this.get('ballot_four');
  }
  ballotFive() {
    return this.get('ballot_five');
  }
  ballotSuper() {
    return this.get('ballot_super');
  }
  weekDay() {
    return this.get('week_day');
  }
  isRematch() {
    return this.get('is_rematch');
  }
  date() {
    return this.get('date');
  }
}

exports.Lottery = Lottery