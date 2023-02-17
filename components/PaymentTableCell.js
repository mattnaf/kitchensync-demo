import React from 'react';
import styles from '@/styles/Home.module.css';

const PaymentTableCell = (props) => {

    const { quantity,title, price, comment } = props;
    return (
        <div className={styles.paymentTableCell} onClick={props.onClick}>
            <div className={styles.paymentTableCellQuantityContainer}>
                <p>{quantity}x</p>
            </div>
            <div className={styles.paymentTableCellTitleCommentContainer}>
                <h3>{title}</h3>
                <p>{comment}</p>
            </div>
            <div className={styles.paymentTableCellPriceContainer}>
                <p>${price}</p>
            </div>
        </div>
    )
}

export default PaymentTableCell