import React from 'react';
import styles from '@/styles/Home.module.css';
import MenuTableCell from './MenuTableCell';

const MenuTable = (props) => {
    const { menuItems } = props;
    console.log('bruh')
    console.log(props.menuItems)
    return (
        <div className={styles.menuTable}>
        {props.menuItems.map((menuItem) => (
            <MenuTableCell
            key={menuItem.title}
            image={menuItem.image}
            title={menuItem.title}
            price={menuItem.price}
            description={menuItem.description}
            />
        ))}
        </div>
    );
};

export default MenuTable;