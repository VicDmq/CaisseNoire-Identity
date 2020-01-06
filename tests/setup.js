import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom/extend-expect';
import { configure } from '@testing-library/dom';

configure({ testIdAttribute: 'test-id' });
