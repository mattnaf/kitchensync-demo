import React from 'react';
import styles from '@/styles/Home.module.css';

const MenuTableCell = (props) => {

    const { image,title, price, description } = props;
    return (
        <div className={styles.menuTableCell}>
            <img src={image} alt={title} className={styles.menuTableCellImage} />
            <div className={styles.menuTableCellTextContainer}>
                <div className={styles.menuTableCellTitle}>{title}</div>
                <div className={styles.menuTableCellDescription}>{description}</div>
                <div className={styles.menuTableCellPrice}>{price}</div>
            </div>
        </div>
    )
}

export default MenuTableCell