import React from 'react';
import styles from '@/styles/Home.module.css';
import MenuTableCell from './MenuTableCell';

const MenuTable = (props) => {
    const { menuItems } = props;
    return (
        <div className={styles.menuTable}>
            <h2 className={styles.menuSectionTitle}>{props.sectionTitle}</h2>
            {props.menuItems.map((menuItem) => (
                <MenuTableCell
                    onClick={() => props.setSelectedItem(menuItem)}
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