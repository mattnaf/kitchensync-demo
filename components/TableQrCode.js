import React, { useState, useRef, useEffect } from 'react';
import styles from '@/styles/Home.module.css'

const TableQrCode = (props) => {

    return (
        <div className={styles.qrContainer}>
            <p className={styles.qrName}>{props.qrName}</p>
            <img className={styles.qrImage} src={props.qrUrl}/>
        </div>
    )
}

export default TableQrCode