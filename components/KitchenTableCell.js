import React, { useState, useRef, useEffect } from 'react';
import styles from '@/styles/Home.module.css'

const KitchenTableCell = (props) => {
    const {orderObj, header, now} = props
    const elapsedTimeInMiliseconds = now - orderObj.time
    const formattedElapsedTime = (millis) => {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
    return (
        <div onDoubleClick={()=> !header ? props.completedOrder(orderObj.id): null} className={header ? styles.kitchebTableHeader : styles.kitchenTableCellContainer}>
            <a className={styles.kitchenTableCellTable}>{orderObj.table}</a>
            <a className={styles.kitchenTableCellQuantity}>{orderObj.quantity}</a>
            <a className={styles.kitchenTableCellTitle}>{orderObj.title}</a>
            <a className={styles.kitchenTableCellComment}>{orderObj.comment}</a>
            <a className={styles.kitchenTableCellTime}>{header ? orderObj.time : formattedElapsedTime(elapsedTimeInMiliseconds)}</a>
        </div>
    )
    
}

export default KitchenTableCell