// @flow
import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';

import STYLES from './initialization.less';

const Initialization = () => {
  const [nbDot, setNbDot] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNbDot(handleDotIncrement);
    }, 500);

    return () => clearInterval(interval);
  }, [nbDot]);

  const handleDotIncrement = (current) => {
    if (current === 3) return 0;
    return current + 1;
  };

  const getDots = () => {
    let tip = '';
    for (let i = 0; i < nbDot; i++) {
      tip += '.';
    }
    return tip;
  };

  return (
    <div className={STYLES.initializationContainer}>
      <Spin size='large' className={STYLES.spin} />
      <div className={STYLES.textContainer}>
        <div>Initialisation de l&apos;application</div>
        <div className={STYLES.dots}>{getDots()}</div>
      </div>
    </div>
  );
};

export default Initialization;
