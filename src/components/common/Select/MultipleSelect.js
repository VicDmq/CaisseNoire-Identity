// @flow
import React from 'react';

import CommonSelect, { type CommonSelectProps } from './CommonSelect';

type MultipleSelectProps = {
  value: Uuid[],
  onChange: (Uuid[]) => void,
  ...CommonSelectProps,
};

const MultipleSelect = ({ onChange, ...otherProps }: MultipleSelectProps) => {
  const handleChange = (value: ?(Uuid[])) => {
    onChange(value || []);
  };

  return <CommonSelect onChange={handleChange} multiple {...otherProps} />;
};

export default MultipleSelect;
