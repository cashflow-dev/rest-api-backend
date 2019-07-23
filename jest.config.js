module.exports = {
  verbose: true,
  bail: 1,
  cache: true,
  preset: 'ts-jest',
  cacheDirectory: '/tmp',
  collectCoverageFrom: ['./src/**/*.ts'],
  displayName: 'api-server',
  setupFiles: ['./jest.setup.js'],
};
