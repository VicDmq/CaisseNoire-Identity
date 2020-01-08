module.exports = {
  setupFilesAfterEnv: ['./tests/setup.js'],
  modulePaths: ['src'],
  moduleNameMapper: {
    '^@Routing(.*)$': '<rootDir>/src/routing$1',
    '^@Sanctions(.*)$': '<rootDir>/src/sanctions$1',
    '^@Components(.*)$': '<rootDir>/src/components$1',
    '^@Utils(.*)$': '<rootDir>/src/utils$1',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
};
