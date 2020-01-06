// @flow
import React from 'react';
import { render } from '@testing-library/react';

import NumericInput from '@Components/common/NumericInput/NumericInput';

describe('NumericInput', () => {
  it('Calls onChange when input is undefined or not a number', () => {
    const onChange = jest.fn();

    let badInput: any = 'badInput';

    const { rerender } = render(<NumericInput value={badInput} onChange={onChange} label='' />);

    expect(onChange).toHaveBeenCalled();

    onChange.mockReset();

    badInput = undefined;

    rerender(<NumericInput value={badInput} onChange={onChange} label='' />);

    expect(onChange).toHaveBeenCalled();
  });

  it('Calls onChange with min (if defined) when input is incorrect', () => {
    const min = 1;
    const onChange = jest.fn();

    const badInput: any = undefined;

    render(<NumericInput value={badInput} onChange={onChange} label='' min={min} />);

    expect(onChange).toHaveBeenLastCalledWith(min);
  });

  it('Calls onChange with 0 when input is incorrect and min is undefined', () => {
    const onChange = jest.fn();

    const badInput: any = undefined;

    render(<NumericInput value={badInput} onChange={onChange} label='' />);

    expect(onChange).toHaveBeenLastCalledWith(0);
  });
});
