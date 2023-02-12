import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import styles from '@/styles/Home.module.css';

const CartButton = (props) => {
    const {itemCount} = props;

    return (
        <div className={styles.cartButton}>
            <FontAwesomeIcon icon={faShoppingCart} size="2x" />
            <span className={styles.itemCount}>{itemCount}</span>
        </div>
    )
    
};

export default CartButton;
