// @flow
import format from '@Utils/currency';

const columns = [
  {
    title: 'Nom',
    dataIndex: 'userName',
  },
  {
    title: 'Cotisation',
    dataIndex: 'cotisationPrice',
    render: format,
    onCell: () => ({ 'test-id': 'cotisationPrice' }),
    align: 'center',
  },
  {
    title: 'Sanctions',
    dataIndex: 'sanctionsPrice',
    render: format,
    onCell: () => ({ 'test-id': 'sanctionsPrice' }),
    align: 'center',
  },
  {
    title: 'Total',
    dataIndex: 'totalPrice',
    render: format,
    onCell: () => ({ 'test-id': 'totalPrice' }),
    align: 'center',
  },
];

export default columns;
