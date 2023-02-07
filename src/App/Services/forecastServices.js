const {LotteryRepository} = require('../Repositories/Database/lottery');

class ForecastService {
  lotteryRepository = new LotteryRepository();

  

  async getWinningCombinations(k, startDate, endDate, weekDay, isRematch) {
    let arrayOfCombinations = []
    const arrayOfProbableNumbers = await this.getMostProbableNumbers(k, startDate, endDate, weekDay, isRematch);
    for (let i = 1; i <= 2; i += 1) {
      for (let j = 1; j <= 32; j += 1) {
        if ( i === 1 ) {
          if ( j <= 16 ) {
            arrayOfCombinations.push([arrayOfProbableNumbers[0][0], arrayOfProbableNumbers[1][0]])
          }
          else {
            arrayOfCombinations.push([arrayOfProbableNumbers[0][0], arrayOfProbableNumbers[1][1]])
          }
        }
        else {
          if ( j <= 16 ) {
            arrayOfCombinations.push([arrayOfProbableNumbers[0][1], arrayOfProbableNumbers[1][0]])
          }
          else {
            arrayOfCombinations.push([arrayOfProbableNumbers[0][1], arrayOfProbableNumbers[1][1]])
          }
        }
      }
    }
    
    let count = 0
    for (let i = 1; i <= 8; i += 1) {
      for (let j = 1; j <= 8; j += 1) { 
        count += 1            
        if ( i%2 === 0 ) { 
          if ( j <= 4) {
            arrayOfCombinations[count - 1].push(arrayOfProbableNumbers[2][0])
            arrayOfCombinations[count - 1].push(arrayOfProbableNumbers[3][0])
          } 
          else {
            arrayOfCombinations[count - 1].push(arrayOfProbableNumbers[2][0])
            arrayOfCombinations[count - 1].push(arrayOfProbableNumbers[3][1])
          } 
        }
        else {
          if ( j <= 4) {
            arrayOfCombinations[count - 1].push(arrayOfProbableNumbers[2][1])
            arrayOfCombinations[count - 1].push(arrayOfProbableNumbers[3][0])
          } 
          else {
            arrayOfCombinations[count - 1].push(arrayOfProbableNumbers[2][1])
            arrayOfCombinations[count - 1].push(arrayOfProbableNumbers[3][1])
          }
        }
      }
    }

    let count2 = 0
    for (let i = 1; i <= 32; i += 1) {
      for (let j = 1; j <= 2; j += 1) { 
        count2 += 1            
        if ( i%2 === 0 ) { 
          if ( j === 1) {
            arrayOfCombinations[count2 - 1].push(arrayOfProbableNumbers[4][0])
            arrayOfCombinations[count2 - 1].push(arrayOfProbableNumbers[5][0])
          } 
          else {
            arrayOfCombinations[count2 - 1].push(arrayOfProbableNumbers[4][0])
            arrayOfCombinations[count2 - 1].push(arrayOfProbableNumbers[5][1])
          } 
        }
        else {
          if ( j === 1) {
            arrayOfCombinations[count2 - 1].push(arrayOfProbableNumbers[4][1])
            arrayOfCombinations[count2 - 1].push(arrayOfProbableNumbers[5][0])
          } 
          else {
            arrayOfCombinations[count2 - 1].push(arrayOfProbableNumbers[4][1])
            arrayOfCombinations[count2 - 1].push(arrayOfProbableNumbers[5][1])
          }
        }
      }
    }
    
    return arrayOfCombinations
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