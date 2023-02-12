import React, { useState, useRef, useEffect } from 'react';
import styles from '@/styles/Home.module.css'

const KitchenTable = (props) => {

    /*

    const ordersRef = firestore.collection('orders')
    
    var kitchenQuery = ordersRef.where("status", "==", "paid").orderBy("time")
    var [kitchenItems] = useCollectionData(kitchenQuery,{idField:'id'});

    var runnerQuery = ordersRef.where("status", "==", "ready").orderBy("time")
    var [runnerItems] = useCollectionData(runnerQuery,{idField:'id'});
    */

    return (
        <div className={styles.kitchenTableContainer}>
            {
                
            }
        </div>
    )
    
}

export default KitchenTable