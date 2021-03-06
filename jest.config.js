module.exports = {
  verbose: true,
  roots: ['<rootDir>/src'],
  bail: 1,
  cache: true,
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testEnvironment: 'node',
  preset: 'ts-jest',
  cacheDirectory: '/tmp',
  collectCoverageFrom: ['./src/**/*.ts'],
  displayName: 'api-server',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // globalSetup: './jest.init.js',
  // globalTeardown: './jest.teardown.js',
};
