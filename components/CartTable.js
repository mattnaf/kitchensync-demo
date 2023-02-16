import React from 'react';
import styles from '@/styles/Home.module.css';
import CartTableCell from './CartTableCell';

const CartTable = (props) => {
    const { cartItems } = props;
    return (
        <div className={styles.cartTable}>
            {cartItems.length > 0 ? cartItems.map((cartItem, index) => (
                <CartTableCell 
                    quantity={cartItem.quantity}
                    title={cartItem.title}
                    price={cartItem.price}
                    comment={cartItem.comment}
                    index={index}
                />
            )) : <p>Cart is empty.</p>}
        </div>
    );
};

export default CartTable;