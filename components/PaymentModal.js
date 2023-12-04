import React, { useState } from "react";
import styles from '@/styles/Home.module.css'
import PaymentTable from "./PaymentTable";
import dollarStringToInt from "@/functions/dollarStringToInt";

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
        let total = Number(subtotal() * 1.08) + Number(tip ? dollarStringToInt(tip) : 0)
        return total.toFixed(2)
    }

    return (
        <div hidden={!show} className={styles.modalContainer}>
            <div className={styles.modalBackground}/>
            <div className={styles.modal}>
                <button className={styles.closeAddItemModalButton} onClick={() => props.hide()} >X</button>
                <PaymentTable cartItems={items}/>
                <div className={styles.paymentTotalContainer}>
                    <p className={styles.paymentTotalLabel}>Subtotal:</p>
                    <p className={styles.paymentTotal}>${subtotal()}</p>
                </div>
                <div className={styles.paymentTotalContainer}>
                    <p className={styles.paymentTotalLabel}>Tip:</p>
                    <input value={tip} className={styles.paymentTotal} onChange={(event) => props.updateTip(event) }/>
                    <p className={styles.paymentTotalLabel}>Tax:</p>
                    <p className={styles.paymentTotal}>${tax()}</p>
                </div>
                <div className={styles.paymentTotalContainer}>
                    <p className={styles.paymentTotalLabel}>Total:</p>
                    <p className={styles.paymentTotal}>${total()}</p>
                </div>
                <button className={styles.submitPaymentButton} onClick={() => props.submitPayment()}>Submit Payment</button>
            </div>
        </div>
    )


}

export default PaymentModal