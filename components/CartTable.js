import React, {useState, useEffect, useCallback} from 'react';
import styles from '@/styles/Home.module.css';
import CartTableCell from './CartTableCell';

const CartTable = (props) => {
    const { cartItems } = props;


    const removeItemFromCart = (index) => {
        let currentItems = cartItems.slice()
        currentItems.splice(index,1)
        props.updateCart(currentItems)
    }



    return (
        <div className={styles.cartTable}>
            {cartItems.length > 0 ? cartItems.map((cartItem, index) => (
                <CartTableCell 
                    quantity={cartItem.quantity}
                    title={cartItem.title}
                    price={cartItem.price}
                    comment={cartItem.comment}
                    index={index}
                    key={index}
                    removeItemFromCart={(index) => removeItemFromCart(index)}
                />
            )) : <p>Cart is empty.</p>}
        </div>
    );
};

export default CartTable;