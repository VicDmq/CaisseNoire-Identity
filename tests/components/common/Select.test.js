// @flow
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import type { OptionProps } from '@Components/common/Select/CommonSelect';
import SingleSelect from '@Components/common/Select/SingleSelect';
import MultipleSelect from '@Components/common/Select/MultipleSelect';

const DEFAULT_OPTIONS: OptionProps[] = [
  {
    value: '1',
    label: 'label 1',
  },
  {
    value: '2',
    label: 'label 2',
  },
  {
    value: '3',
    label: 'label 3',
  },
];

describe('SingleSelect', () => {
  it('Hides selected value', () => {
    const { getAllByRole, getByRole } = render(
      <SingleSelect label='Select' value={DEFAULT_OPTIONS[0].value} onChange={jest.fn()} options={DEFAULT_OPTIONS} />,
    );

    const select = getByRole('combobox');

    fireEvent.click(select);

    const selectedOption = getByRole((content, element) => element.getAttribute('aria-selected') === 'true', {
      hidden: true,
    });

    expect(selectedOption).toHaveTextContent(DEFAULT_OPTIONS[0].label);
    expect(selectedOption).not.toBeVisible();

    const notSelectedOptions = getAllByRole('option');

    expect(notSelectedOptions).toHaveLength(DEFAULT_OPTIONS.length - 1);
    notSelectedOptions.forEach((selectedOption) => expect(selectedOption).toBeVisible());
  });
});

describe('MultiSelect', () => {
  it('Hides selected values', () => {
    const { getByRole, getAllByRole } = render(
      <MultipleSelect
        label='Select'
        value={DEFAULT_OPTIONS.slice(0, 2).map((option) => option.value)}
        onChange={jest.fn()}
        options={DEFAULT_OPTIONS}
      />,
    );

    const select = getByRole('combobox');

    fireEvent.click(select);

    const selectedOptions = getAllByRole((content, element) => element.getAttribute('aria-selected') === 'true', {
      hidden: true,
    });

    expect(selectedOptions).toHaveLength(DEFAULT_OPTIONS.length - 1);
    selectedOptions.forEach((selectedOption) => expect(selectedOption).not.toBeVisible());

    const notSelectedOption = getByRole('option');

    expect(notSelectedOption).toBeVisible();
  });

  it('Returns an empty array instead of undefined when input is cleared', () => {
    const onChange = jest.fn();
    const Component = (
      <MultipleSelect label='Select' value={[DEFAULT_OPTIONS[0].value]} onChange={onChange} options={DEFAULT_OPTIONS} />
    );

    const { getByLabelText, rerender } = render(Component);

    const clearValueIcon = getByLabelText('icon: close');
    fireEvent.click(clearValueIcon);

    expect(onChange).toHaveBeenCalledWith([]);
    expect(onChange).toHaveBeenCalledTimes(1);

    rerender(Component);

    const clearAllValuesIcon = getByLabelText('icon: close-circle');
    fireEvent.click(clearAllValuesIcon);

    expect(onChange).toHaveBeenLastCalledWith([]);
    expect(onChange).toHaveBeenCalledTimes(2);
  });
});
