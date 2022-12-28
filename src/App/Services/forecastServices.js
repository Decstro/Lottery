const {LotteryRepository} = require('../Repositories/Database/lottery');

class ForecastService {
  lotteryRepository = new LotteryRepository();
  
  async getWinningCombination(k, startDate, endDate, weekDay, isRematch) {
    if( weekDay === null || weekDay === undefined) {
      if( isRematch === null || isRematch === undefined){
        const result = await this.calculateWinningCombination(startDate, endDate, k);
        return result;
      }  
    }
    if( weekDay === null || weekDay === undefined) {
        const result = await this.calculateRematchWinningCombination(isRematch, startDate, endDate, k);
        return result;
    }
    if( isRematch === null || isRematch === undefined){
        const result = await this.calculateWeekDayWinningCombination(weekDay, startDate, endDate, k);
        return result;
    }
    const result = await this.calculateRematchDayWinningCombination(weekDay, isRematch, startDate, endDate, k);
    return result

  };

  async calculateWinningCombination(startDate, endDate, k) {
    const result = []
    for ( let i = 1; i <= 6; i += 1){
      const modeArray = await this.lotteryRepository.getAllBallotModes(i, k, startDate, endDate);
      result.push(modeArray);
    }
    return result
  };

  async calculateRematchWinningCombination(isRematch, startDate, endDate, k) {
    const result = []
    for ( let i = 1; i <= 6; i += 1){
      const modeArray = await this.lotteryRepository.getBallotModesByRematch(i, k, startDate, endDate, isRematch);
      result.push(modeArray);
    }
    return result
  };

  async calculateWeekDayWinningCombination(weekDay, startDate, endDate, k) {
    const result = []
    for ( let i = 1; i <= 6; i += 1){
      const modeArray = await this.lotteryRepository.getBallotModesByWeekDay(i, k, startDate, endDate, weekDay);
      result.push(modeArray);
    }
    return result
  };

  async calculateRematchDayWinningCombination(weekDay, isRematch, startDate, endDate, k) {
    const result = []
    for ( let i = 1; i <= 6; i += 1){
      const modeArray = await this.lotteryRepository.getBallotModesByDayAndRematch(i, k, startDate, endDate, weekDay, isRematch);
      result.push(modeArray);
    }
    return result
  };
}

module.exports = { ForecastService }