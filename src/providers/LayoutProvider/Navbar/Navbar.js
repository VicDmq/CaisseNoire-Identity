// @flow
import React, { useState } from 'react';
import { Button, Divider, Menu } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import STYLES from './navbar.less';

const { Item } = Menu;

const Navbar = () => {
  const [, , removeCookie] = useCookies<CookieProps, SessionProps>(['session']);

  const [selectedKey, setSelectedKey] = useState<string>('sanctions');
  const history = useHistory();

  const selectItem = ({ key }: { key: string }) => {
    setSelectedKey(key);
  };

  const signOut = () => {
    removeCookie('session', {});
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
