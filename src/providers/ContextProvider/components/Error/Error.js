// @flow
import React from 'react';
import { Result, Button } from 'antd';

import STYLES from './error.less';

const Error = () => {
  return (
    <div className={STYLES.errorContainer}>
      <Result
        status='error'
        title="Une erreur s'est produite pendant l'initialisation"
        subTitle='Cliquez sur le bouton ci-dessous pour recharger la page'
        extra={
          <Button
            onClick={() => {
              window.location.reload();
            }}
            type='primary'
            icon='reload'
            size='large'
            shape='circle'
            className={STYLES.reloadButton}
          />
        }
      />
    </div>
  );
};

export default Error;
