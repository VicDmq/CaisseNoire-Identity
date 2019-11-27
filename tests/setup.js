// setup file
import 'regenerator-runtime/runtime'
import '@testing-library/jest-dom/extend-expect'
import { configure } from '@testing-library/dom'

configure({ testIdAttribute: 'test-id' })

// Override window.fetch which is undefined otherwise
global.fetch = () => {
  throw 'DO NOT CALL fetch() FROM TESTS'
}

// Override window.Request which is undefined otherwise
global.Request = () => {
  throw 'DO NOT CALL Request FROM TESTS'
}
