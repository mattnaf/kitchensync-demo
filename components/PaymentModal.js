import React, { useState } from "react";
import styles from '@/styles/Home.module.css'
import CartTable from "./CartTable";

const PaymentModal = (props) => {

    const {show, items, tip} = props

    const subtotal = () => {
        let total = 0;
        items.forEach(item => {
            total += item.price
        })
        return (Math.round(total *100) / 100).toFixed(2)
    }

    const tax = () => {
        let tax
        return ((Math.round((subtotal()*0.08) * 100) / 100).toFixed(2))
    }

    const total = () => {
        let total = Number(subtotal() * 1.08) + Number(tip ? tip : 0)
        return total.toFixed(2)
    }

    return (
        <div hidden={!show} className={styles.modalContainer}>
            <div className={styles.modalBackground}/>
            <div className={styles.modal}>
                <button className={styles.closeAddItemModalButton} onClick={() => props.hide()} >X</button>
                <CartTable cartItems={items}/>
                <div className={styles.paymentTotalContainer}>
                    <p className={styles.paymentTotalLabel}>Subtotal:</p>
                    <p className={styles.paymentTotal}>${subtotal()}</p>
                </div>
                <div className={styles.paymentTotalContainer}>
                    <p className={styles.paymentTotalLabel}>Tip:</p>
                    <input className={styles.paymentTotal} type="number" onChange={(event) => props.updateTip(event.target.value) }/>
                    <p className={styles.paymentTotalLabel}>Tax:</p>
                    <p className={styles.paymentTotal}>${tax()}</p>
                </div>
                <div className={styles.paymentTotalContainer}>
                    <p className={styles.paymentTotalLabel}>Total:</p>
                    <p className={styles.paymentTotal}>${total()}</p>
                </div>
                <button className={styles.submitPaymentButton}>Submit Payment</button>
            </div>
        </div>
    )


}

export default PaymentModal