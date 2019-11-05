// @flow
import React, { useState } from 'react'
import { Menu, Affix, Icon } from 'antd'
import { Link, useLocation } from 'react-router-dom'

import STYLES from './navbar.less'

const { Item } = Menu

const NavBar = (props: any) => {
  const [selectedKey, setSelectedKey] = useState<string>('sanctions')

  const selectItem = ({ key }: { key: string }) => {
    setSelectedKey(key)
  }

  return (
    <div>
      <Affix>
        <Menu mode='horizontal' selectedKeys={selectedKey} onSelect={selectItem}>
          <Item key='sanction'>
            <Link to='/sanctions'>Sanctions</Link>
          </Item>
          <Item className={STYLES.logoutButton}>
            <Icon type='logout' theme='filled' />
          </Item>
        </Menu>
      </Affix>
      {props.children}
    </div>
  )
}

export default NavBar
