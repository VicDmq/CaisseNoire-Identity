// @flow

const currencyFormatter = new Intl.NumberFormat('lookup', { style: 'currency', currency: 'EUR' });

const format = (value: string): string => {
  const float: number = parseFloat(value);

  return currencyFormatter.format(float);
};

export default format;
