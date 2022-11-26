export default config
function config(){
  return {
    testEnvironment: 'node',
    testMatch: [
      '**/*.(spec|test).+(ts|tsx|js)'
    ],
  }
}