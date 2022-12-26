const {Model} = require('objection');

class Lottery extends Model {

  static get tableName() {
    return 'lotteries';
  }

  static get idColumn() {
    return 'id';
  }
}

module.exports = {Lottery};