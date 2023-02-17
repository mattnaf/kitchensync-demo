import React, { useState } from "react";
import styles from '@/styles/Home.module.css'
import ConfirmationAnimation from './ConfirmationAnimation'

const PaymentConfirmedModal = (props) => {

    const {show, percentage} = props

    return (
        <div hidden={!show} className={styles.modalContainer}>
            <div className={styles.modalBackground} />
            <div className={styles.modal}>
                <ConfirmationAnimation size={250} strokeWidth={20} percentage={percentage}/>
                <p className={styles.preparedText}>Your order is being prepared.</p>
                <button className={styles.confirmedPaymentOkButton} onClick={() => props.closeModal()}>OK</button>
            </div>
        </div>
    )
    

}

export default PaymentConfirmedModal