import React from 'react';
import styles from '@/styles/Home.module.css';

const CartTableCell = (props) => {

    const { quantity,title, price, comment, index } = props;
    return (
        <div className={styles.cartTableCell} onClick={props.onClick}>
            <div className={styles.cartTableCellQuantityContainer}>
                <p>{quantity}x</p>
            </div>
            <div className={styles.cartTableCellTitleCommentContainer}>
                <h3>{title}</h3>
                <p>{comment}</p>
            </div>
            <div className={styles.cartTableCellPriceContainer}>
                <p>${price}</p>
            </div>
            <div className={styles.cartTableRemoveItemContainer}>
                <button className={styles.cartTableCellRemoveItemButton} onClick={() => props.removeItemFromCart(index)}>X</button>
            </div>
        </div>
    )
}

export default CartTableCell