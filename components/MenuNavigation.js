import React from 'react';
import styles from '@/styles/Home.module.css'



const MobileNavBar = () => {
  return (
    <nav className={styles.menuNavigation}>
      <ul className={styles.menuNavigationList}>
        <li className={styles.menuNavigationItem} onClick={() => onClick('appetizers')}>
          Appetizers
        </li>
        <li className={styles.menuNavigationItem} onClick={() => onClick('entrees')}>
          Entrees
        </li>
        <li className={styles.menuNavigationItem} onClick={() => onClick('sides')}>
          Sides
        </li>
        <li className={styles.menuNavigationItem} onClick={() => onClick('drinks')}>
          Drinks
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavBar;
