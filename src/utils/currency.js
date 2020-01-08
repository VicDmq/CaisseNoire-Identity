// @flow

const currencyFormatter = new Intl.NumberFormat('lookup', { style: 'currency', currency: 'EUR' });

const format = (value: string | number): string => {
  let valueToFormat: number = 0;

  if (typeof value !== 'number') {
    valueToFormat = parseFloat(value);
  } else {
    valueToFormat = value;
  }

  return currencyFormatter.format(valueToFormat);
};

export default format;
