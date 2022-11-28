import React from 'react';
import { Link } from 'react-router-dom';

import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>Nothing was found</h1>
      <p className={styles.descripton}>Sorry, this page was not found.</p>
      <Link to="/">
        <button className="button button--black">Home</button>
      </Link>
    </div>
  );
};

export default NotFoundBlock;
