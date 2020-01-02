// @flow
import React, { useState } from 'react';
import { Button, Divider, Layout, Menu, Icon } from 'antd';
import { Link, useHistory } from 'react-router-dom';

import STYLES from './header.less';

const { Header } = Layout;
const { Item } = Menu;

const CustomHeader = ({ deleteSession }: { deleteSession: () => void }) => {
  const [selectedKey, setSelectedKey] = useState<string>('sanctions');
  const history = useHistory();

  const selectItem = ({ key }: { key: string }) => {
    setSelectedKey(key);
  };

  const signOut = () => {
    deleteSession();
    history.push({ pathname: '/' });
  };

  return (
    <Header className={STYLES.header}>
      <div className={STYLES.title}>Caisse Noire</div>
      <Divider className={STYLES.divider} type='vertical' />
      <Menu mode='horizontal' selectedKeys={selectedKey} onSelect={selectItem}>
        <Item key='sanction'>
          <Link to='/sanctions'>Sanctions</Link>
        </Item>
      </Menu>
      <Button type='primary' className={STYLES.logoutButton} icon='logout' onClick={signOut} />
    </Header>
  );
};

export default CustomHeader;
