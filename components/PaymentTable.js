import React from 'react';
import styles from '@/styles/Home.module.css';
import PaymentTableCell from './PaymentTableCell';

const PaymentTable = (props) => {
    const { cartItems } = props;
    return (
        <div className={styles.paymentTable}>
            {cartItems.length > 0 ? cartItems.map((cartItem, index) => (
                <PaymentTableCell 
                    quantity={cartItem.quantity}
                    title={cartItem.title}
                    price={cartItem.price}
                    comment={cartItem.comment}
                    index={index}
                    key={index}
                />
            )) : <p>Cart is empty.</p>}
        </div>
    );
};

export default PaymentTable;