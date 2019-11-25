// setup file
import 'regenerator-runtime/runtime'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

// Override window.fetch which is undefined otherwise
global.fetch = () => {
  throw 'DO NOT CALL fetch() FROM TESTS'
}

// Override window.Request which is undefined otherwise
global.Request = () => {
  throw 'DO NOT CALL Request FROM TESTS'
}
