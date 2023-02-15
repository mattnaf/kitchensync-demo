import React from 'react';
import styles from '@/styles/Home.module.css'



const MenuNavigation = (props) => {
  return (
    <nav className={styles.menuNavigation}>
      <ul className={styles.menuNavigationList}>
        <li className={styles.menuNavigationItem} onClick={() => props.onClick('appetizers')}>
          Appetizers
        </li>
        <li className={styles.menuNavigationItem} onClick={() => props.onClick('entrees')}>
          Entrees
        </li>
        <li className={styles.menuNavigationItem} onClick={() => props.onClick('sides')}>
          Sides
        </li>
        <li className={styles.menuNavigationItem} onClick={() => props.onClick('drinks')}>
          Drinks
        </li>
      </ul>
    </nav>
  );
};

export default MenuNavigation;
