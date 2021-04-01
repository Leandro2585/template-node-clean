const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig.json')
module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rooDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths, { prefix: '<rootDir>/src/' }
  ),
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
