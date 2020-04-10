// @flow
import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';

import STYLES from './initialization.less';

const Initialization = () => {
  const [tipIncrement, setTipIncrement] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIncrement(handleTipIncrement);
    }, 500);

    return () => clearInterval(interval);
  }, [tipIncrement]);

  const handleTipIncrement = (current) => {
    if (current === 3) return 0;
    return current + 1;
  };

  const getDots = () => {
    let tip = '';
    for (let i = 0; i < tipIncrement; i++) {
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
