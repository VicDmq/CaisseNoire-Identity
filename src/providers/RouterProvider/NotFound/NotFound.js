// @flow
import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

import STYLES from './notFound.less';

const NotFound = () => {
  return (
    <div className={STYLES.notFoundContainer}>
      {/* <Row type='flex' align='middle' justify='center' style={{ height: '100%' }}> */}
      <Result
        status='warning'
        title="Cette page n'existe pas"
        subTitle='Cliquez sur le bouton ci-dessous pour être redirigé'
        extra={
          <Link to='/sanctions'>
            <Button type='primary' icon='home' size='large' shape='circle' />
          </Link>
        }
      />
      {/* </Row> */}
    </div>
  );
};

export default NotFound;
