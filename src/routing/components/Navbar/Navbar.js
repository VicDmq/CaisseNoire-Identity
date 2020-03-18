// @flow
import React, { useState } from 'react';
import { Button, Divider, Menu } from 'antd';
import { Link, useHistory } from 'react-router-dom';

import STYLES from './navbar.less';

const { Item } = Menu;

const Navbar = ({ deleteSession }: { deleteSession: () => void }) => {
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
    <div className={STYLES.navbar}>
      <div className={STYLES.title}>Caisse Noire</div>
      <Divider className={STYLES.divider} type='vertical' />
      <Menu mode='horizontal' selectedKeys={selectedKey} onSelect={selectItem} className={STYLES.menu}>
        <Item key='sanctions'>
          <Link to='/sanctions'>Sanctions</Link>
        </Item>
      </Menu>
      <Button type='primary' className={STYLES.logoutButton} icon='logout' onClick={signOut} />
    </div>
  );
};

export default Navbar;
