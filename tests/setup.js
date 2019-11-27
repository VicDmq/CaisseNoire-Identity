// setup file
import 'regenerator-runtime/runtime'
import '@testing-library/jest-dom/extend-expect'

// Override window.fetch which is undefined otherwise
global.fetch = () => {
  throw 'DO NOT CALL fetch() FROM TESTS'
}

// Override window.Request which is undefined otherwise
global.Request = () => {
  throw 'DO NOT CALL Request FROM TESTS'
}
