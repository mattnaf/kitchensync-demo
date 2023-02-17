import React, { useState } from "react";
import styles from '@/styles/Home.module.css'
import CartTable from "./CartTable";

const ViewCartModal = (props) => {

    const { items, show } = props

    const total = () => {
        let total = 0;
        items.forEach(item => {
            total += item.price
        })
        return total
    }

    return (
        <div hidden={!show} className={styles.modalContainer}>
            <div className={styles.modalBackground}/>
            <div className={styles.modal}>
                <button className={styles.closeAddItemModalButton} onClick={() => props.hide()} >X</button>
                <CartTable cartItems={items} updateCart={(cart) => props.updateCart(cart) }/>
                <div className={styles.viewCartTotalContainer}>
                    <p className={styles.viewCartTotalLabel}>Subtotal:</p>
                    <p className={styles.viewCartTotal}>${total()}</p>
                </div>
                <button onClick={() => props.showPayment()} className={styles.goToCheckoutButton}>Go to checkout</button>
            </div>
        </div>
    )
}

export default ViewCartModal