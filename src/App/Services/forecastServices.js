const {LotteryRepository} = require('../Repositories/Database/lottery');

class ForecastService {
  lotteryRepository = new LotteryRepository();

  async getWinningCombinations(k, startDate, endDate, weekDay, isRematch) {
    let arrayOfCombinations = []
    const arrayOfProbableNumbers = await this.getMostProbableNumbers(k, startDate, endDate, weekDay, isRematch);
    
  };
  
  async getMostProbableNumbers(k, startDate, endDate, weekDay, isRematch) {
    if( weekDay === null || weekDay === undefined) {
      if( isRematch === null || isRematch === undefined){
        const result = await this.calculateMostProbableNumbers(startDate, endDate, k);
        return result;
      }  
    }
    if( weekDay === null || weekDay === undefined) {
        const result = await this.calculateRematchMostProbableNumbers(isRematch, startDate, endDate, k);
        return result;
    }
    if( isRematch === null || isRematch === undefined){
        const result = await this.calculateWeekDayMostProbableNumbers(weekDay, startDate, endDate, k);
        return result;
    }
    const result = await this.calculateRematchDayMostProbableNumbers(weekDay, isRematch, startDate, endDate, k);
    return result

  };

  async calculateMostProbableNumbers(startDate, endDate, k) {
    const result = []
    for ( let i = 1; i <= 6; i += 1){
      const modeArray = await this.lotteryRepository.getAllBallotModes(i, k, startDate, endDate);
      result.push(modeArray);
    }
    return result
  };

  async calculateRematchMostProbableNumbers(isRematch, startDate, endDate, k) {
    const result = []
    for ( let i = 1; i <= 6; i += 1){
      const modeArray = await this.lotteryRepository.getBallotModesByRematch(i, k, startDate, endDate, isRematch);
      result.push(modeArray);
    }
    return result
  };

  async calculateWeekDayMostProbableNumbers(weekDay, startDate, endDate, k) {
    const result = []
    for ( let i = 1; i <= 6; i += 1){
      const modeArray = await this.lotteryRepository.getBallotModesByWeekDay(i, k, startDate, endDate, weekDay);
      result.push(modeArray);
    }
    return result
  };

  async calculateRematchDayMostProbableNumbers(weekDay, isRematch, startDate, endDate, k) {
    const result = []
    for ( let i = 1; i <= 6; i += 1){
      const modeArray = await this.lotteryRepository.getBallotModesByDayAndRematch(i, k, startDate, endDate, weekDay, isRematch);
      result.push(modeArray);
    }
    return result
  };
}

module.exports = { ForecastService }