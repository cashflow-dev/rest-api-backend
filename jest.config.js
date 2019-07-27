module.exports = {
  verbose: true,
  roots: ['<rootDir>/src'],
  bail: 1,
  cache: true,
  preset: 'ts-jest',
  cacheDirectory: '/tmp',
  collectCoverageFrom: ['./src/**/*.ts'],
  displayName: 'api-server',
  setupFiles: ['./jest.setup.js'],
};
