module.exports = {
  setupFilesAfterEnv: ['./tests/setup.js'],
  modulePaths: ['src'],
  moduleNameMapper: {
    '^@Providers(.*)$': '<rootDir>/src/providers$1',
    '^@HOC(.*)$': '<rootDir>/src/hoc$1',
    '^@Pages(.*)$': '<rootDir>/src/pages$1',
    '^@Components(.*)$': '<rootDir>/src/components$1',
    '^@Utils(.*)$': '<rootDir>/src/utils$1',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
};
