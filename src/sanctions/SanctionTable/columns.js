const columns = [
  {
    title: 'Nom',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Cotisations',
    dataIndex: 'cotisations',
    key: 'cotisations',
    onCell: () => {
      return {
        'test-id': 'cotisation',
      };
    },
  },
  {
    title: 'Sanctions',
    dataIndex: 'sanctions',
    key: 'sanctions',
    onCell: () => {
      return {
        'test-id': 'sanction',
      };
    },
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
    onCell: () => {
      return {
        'test-id': 'total',
      };
    },
  },
];

export default columns;
