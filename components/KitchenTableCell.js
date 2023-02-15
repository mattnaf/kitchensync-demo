import React, { useState, useRef, useEffect } from 'react';
import styles from '@/styles/Home.module.css'

const KitchenTableCell = (props) => {
    const orderObj = props.orderObj
    return (
        <div className={styles.kitchenTableCellContainer}>
            <a>{orderObj.Title}</a>
        </div>
    )
    
}

export default KitchenTableCell