import React, { useState, useRef, useEffect } from 'react';
import styles from '@/styles/Home.module.css'

const TableQrCode = (props) => {

    return (
        <div className={props.style}>
            <p>Table {props.tableNumber}</p>
            <img className={styles.qrImage} src={props.qrUrl}/>
        </div>
    )
}

export default TableQrCode