// import {LotteryRepository as LotteryContract, CreateLotteryParams} from '../Contracts/lottery.js';
const {Lottery: LotteryORM} = require('./orm/lottery.js');
const {Lottery} = require ('../../Models/lottery.js');

class LotteryRepository {

  recordsQuantity = this.getRecordsQuantity();

  async getRecordsQuantity() {
    const lotteryRecordsQuantity = await LotteryORM.query()
      .select()
      .countDistinct('id', {as: 'id_count'});

    return lotteryRecordsQuantity[0].id_count  
  }  


  async createLotteryRecord(params) {
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

  async getNumberAbsoluteFrecuency(lotteryNumber, ballot)  {
    let ballot_position;
    if(ballot === 1) ballot_position = 'ballot_one';
    if(ballot === 2) ballot_position = 'ballot_two';
    if(ballot === 3) ballot_position = 'ballot_three';
    if(ballot === 4) ballot_position = 'ballot_four';
    if(ballot === 5) ballot_position = 'ballot_five';
    if(ballot === 6) ballot_position = 'ballot_super';

    const numberFrecuency = await LotteryORM.query()
      .select()
      .countDistinct('id', {as: 'id_count'})
      .where({
        [ballot_position]: lotteryNumber
      });
    
    return numberFrecuency[0].id_count
  
  }

  async getBallotModes(ballot, k) {
    let modeArray = [];
    let hashModeList = {}
    let resultArray = [];
    let iterationSize;

    if(ballot === 6) {
      iterationSize = 16;
    }
    else {
      iterationSize = 43;
    }

    for (let i = 1; i <= iterationSize; i += 1) {
      const numberAbsoluteFrecuency = await this.getNumberAbsoluteFrecuency(i, ballot);
      modeArray.push({
        number: i,
        frecuency: numberAbsoluteFrecuency
      });
    }
    modeArray.sort((a, b) => {return a.frecuency - b.frecuency});

    for (let i = 1; i <= k; i += 1) {
      resultArray.push(modeArray[modeArray.length - i].number);
    }

    return resultArray;
  }
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

exports.LotteryRepository = LotteryRepository

