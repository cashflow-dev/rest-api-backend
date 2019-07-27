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
  testEnvironment: 'node',
  preset: 'ts-jest',
  cacheDirectory: '/tmp',
  collectCoverageFrom: ['./src/**/*.ts'],
  displayName: 'api-server',
  setupFiles: ['./jest.setup.ts'],
  // globalSetup: './jest.init.ts',
  globalTeardown: './jest.teardown.ts',
};
