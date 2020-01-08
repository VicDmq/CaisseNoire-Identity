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
    align: 'center',
  },
  {
    title: 'Sanctions',
    dataIndex: 'sanctionsPrice',
    render: appendCurrencySymbol,
    onCell: () => ({ 'test-id': 'sanctionsPrice' }),
    align: 'center',
  },
  {
    title: 'Total',
    dataIndex: 'totalPrice',
    render: appendCurrencySymbol,
    onCell: () => ({ 'test-id': 'totalPrice' }),
    align: 'center',
  },
];

export default columns;
