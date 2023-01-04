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

  async getNumberAbsoluteFrecuency(lotteryNumber, ballot, startDate, endDate)  {
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
      })
      .andWhere('date', '>=', startDate)
      .andWhere('date', '<=', endDate)
    
    return numberFrecuency[0].id_count
  
  }

  async getNumberAbsoluteFrecuencyByWeekDay(lotteryNumber, ballot, startDate, endDate, weekDay)  {
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
      })
      .andWhere('week_day', '=', weekDay)
      .andWhere('date', '>=', startDate)
      .andWhere('date', '<=', endDate)
    
    return numberFrecuency[0].id_count
  
  }

  async getNumberAbsoluteFrecuencyByRematch(lotteryNumber, ballot, startDate, endDate, isRematch)  {
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
      })
      .andWhere('is_rematch', '=', isRematch)
      .andWhere('date', '>=', startDate)
      .andWhere('date', '<=', endDate)
    
    return numberFrecuency[0].id_count
  
  }

  async getNumberAbsoluteFrecuencyByWeekDayAndRematch(lotteryNumber, ballot, startDate, endDate, weekDay, isRematch )  {
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
      })
      .andWhere('week_day', '=', weekDay)
      .andWhere('is_rematch', '=', isRematch)
      .andWhere('date', '>=', startDate)
      .andWhere('date', '<=', endDate)
    
    return numberFrecuency[0].id_count
  
  }

  async getAllBallotModes(ballot, k, startDate, endDate) {
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
      const numberAbsoluteFrecuency = await this.getNumberAbsoluteFrecuency(i, ballot, startDate, endDate);
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
  };

  async getBallotModesByWeekDay(ballot, k, startDate, endDate, weekDay) {
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
      const numberAbsoluteFrecuency = await this.getNumberAbsoluteFrecuencyByWeekDay(i, ballot, startDate, endDate, weekDay);
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
  };

  async getBallotModesByRematch(ballot, k, startDate, endDate, isRematch) {
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
      const numberAbsoluteFrecuency = await this.getNumberAbsoluteFrecuencyByRematch(i, ballot, startDate, endDate, isRematch);
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
  };

  async getBallotModesByDayAndRematch(ballot, k, startDate, endDate, weekDay, isRematch) {
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
      const numberAbsoluteFrecuency = await this.getNumberAbsoluteFrecuencyByWeekDayAndRematch(i, ballot, startDate, endDate, weekDay, isRematch);
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

  async getMediaDifferencesVertical(isRematch) {
    const ballotOneValues = await LotteryORM.query().select('ballot_one').where('is_rematch', '=', isRematch);
    const ballotTwoValues = await LotteryORM.query().select('ballot_two').where('is_rematch', '=', isRematch);
    const ballotThreeValues = await LotteryORM.query().select('ballot_three').where('is_rematch', '=', isRematch);
    const ballotFourValues = await LotteryORM.query().select('ballot_four').where('is_rematch', '=', isRematch);
    const ballotFiveValues = await LotteryORM.query().select('ballot_five').where('is_rematch', '=', isRematch);

    const size = ballotOneValues.length;

    let sumBetweenOneAndTwo = 0;
    let sumBetweenTwoAndThree = 0;
    let sumBetweenThreeAndFour = 0;
    let sumBetweenFourAndFive = 0;

    for (let i = 0; i < size ; i += 1) {
      sumBetweenOneAndTwo += ballotTwoValues[i].ballot_two - ballotOneValues[i].ballot_one;
      sumBetweenTwoAndThree += ballotThreeValues[i].ballot_three - ballotTwoValues[i].ballot_two;
      sumBetweenThreeAndFour += ballotFourValues[i].ballot_four - ballotThreeValues[i].ballot_three;
      sumBetweenFourAndFive += ballotFiveValues[i].ballot_five - ballotFourValues[i].ballot_four;
    }

    return [sumBetweenOneAndTwo/size , sumBetweenTwoAndThree/size, sumBetweenThreeAndFour/size, sumBetweenFourAndFive/size]
  }
}

exports.LotteryRepository = LotteryRepository

