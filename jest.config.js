module.exports = {
  setupFilesAfterEnv: ['./test/setup.js'],
  modulePaths: ['src'],
  moduleNameMapper: {
    '^@Components(.*)$': '<rootDir>/src/components$1',
    '\\.(css|less)$': 'identity-obj-proxy'
  }
}
