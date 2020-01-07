// @flow

const appendCurrencySymbol = (price: string): string => {
  return price + ' €';
};

const columns = [
  {
    title: 'Nom',
    dataIndex: 'userName',
  },
  {
    title: 'Cotisation',
    dataIndex: 'cotisationPrice',
    render: appendCurrencySymbol,
    onCell: () => ({ 'test-id': 'cotisationPrice' }),
  },
  {
    title: 'Sanctions',
    dataIndex: 'sanctionsPrice',
    render: appendCurrencySymbol,
    onCell: () => ({ 'test-id': 'sanctionsPrice' }),
  },
  {
    title: 'Total',
    dataIndex: 'totalPrice',
    render: appendCurrencySymbol,
    onCell: () => ({ 'test-id': 'totalPrice' }),
  },
];

export default columns;
