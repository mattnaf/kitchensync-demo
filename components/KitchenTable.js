import React, { useState, useRef, useEffect } from 'react';
import styles from '@/styles/Home.module.css'
import {useCollection} from 'react-firebase-hooks/firestore';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import db from '../firebase';
import KitchenTableCell from './KitchenTableCell';

const KitchenTable = (props) => {

    const { now } = props
    
    const [value, loading, error] = useCollection(
        collection(db, 'orders'),
        {
          snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    const completedOrder = async (id) => {
        await deleteDoc(doc(db, "orders", id))
    }
    
    return (
        <div className={styles.kitchenTableContainer}>
            <KitchenTableCell header={true} key={999} orderObj={{table:"Table", quantity: "Qty", title:"Title", comment:"Comment", time:"Elapsed Time"}}/>
            <div>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Kitchen Table: Loading...</span>}
            {value && (
                value.docs.map((doc, index) => (
                    <KitchenTableCell key={index} orderObj={doc.data()} now={now} completedOrder={(id) => completedOrder(id)}/>
                ))
            )}
            </div>
            
        </div>
    )
    
}

export default KitchenTable