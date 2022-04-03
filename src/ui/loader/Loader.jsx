import React from 'react';

import styles from './Loader.module.css';

function Loader(props) {
  return (
    <div className={styles.loader} {...props} />
   );
}

export default Loader;
