import React, { useState, useRef, useEffect } from 'react';
import styles from '@/styles/Home.module.css'
import {useCollection} from 'react-firebase-hooks/firestore';
import { getFirestore, collection } from 'firebase/firestore';
import app from '../firebase';
import KitchenTableCell from './KitchenTableCell';

const KitchenTable = (props) => {

    
    const [value, loading, error] = useCollection(
        collection(getFirestore(app), 'kitchenTable'),
        {
          snapshotListenOptions: { includeMetadataChanges: true },
        }
    );
    
    let data;
    return (
        <div className={styles.kitchenTableContainer}>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Kitchen Table: Loading...</span>}
            {value && (
                value.docs.map((doc) => (
                    <KitchenTableCell key={doc.data().id} orderObj={doc.data()}/>
                ))
            )}
        </div>
    )
    
}

export default KitchenTable