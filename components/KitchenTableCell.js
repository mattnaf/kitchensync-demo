import React, { useState, useRef, useEffect } from 'react';
import styles from '@/styles/Home.module.css'

const KitchenTableCell = (props) => {
    const orderObj = props.orderObj
    return (
        <div className={styles.kitchenTableCellContainer}>
            <div className={styles.kitchenTableCellTableContainer}>

            </div>
            <div className={styles.kitchenTableCellItemNameContainer}>
                
            </div>
            <div className={styles.kitchenTableCellItemNameContainer}>
                
            </div>
            <div className={styles.kitchenTableCellCommentContainer}>
                
            </div>
            <div className={styles.kitchenTableCellTimeContainer}>
                
            </div>
        </div>
    )
    
}

export default KitchenTableCell