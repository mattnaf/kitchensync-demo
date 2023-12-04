import React from "react";
import styles from '@/styles/Home.module.css'
import {useCollection} from 'react-firebase-hooks/firestore';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import db from '../firebase';
import sortByTimestampDescending from "@/functions/sortArrayByTime";

const KitchenSection = (props) => {
    const { time } = props

    const [value, loading, error] = useCollection(
        collection(db, 'orders'),
        {
          snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    const formattedElapsedTime = (millis) => {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    const completedOrder = async (id) => {
        await deleteDoc(doc(db, "orders", id))
    }

    const populateOrders = () => {
        let columns = []
        let column = []
        let orderCells = []
        
        if (value != null) {
            let orders = value.docs.map( (orderObjs) => {
                return orderObjs.data()
            })

            orders = orders.length > 0 ? sortByTimestampDescending(orders) : []
            orderCells = orders.map( (order, index) => {
                let orderItems = order.items.map( (item, index) => {

                    return (
                        <div className={styles.orderItemCell} key={index}>
                            <div className={styles.orderItemInfoRow}>
                                <a className={styles.orderItemQuantity}>{item.quantity}x</a>
                                <a className={styles.orderItemTitle}>{item.title}</a>
                            </div>
                            <p className={styles.orderItemComments}>{item.comment}</p>
                        </div>
                    )
                })
                return (
                    <div className={styles.orderCell} key={index} onDoubleClick={() => completedOrder(order.id)}>
                        <div className={styles.orderHeadingContainer}>
                            <a className={styles.orderHeading}>Table {order.table}</a>
                        </div>
                        <div className={styles.orderItemsContainer}>
                            {orderItems}
                        </div>
                        <div className={styles.orderTimeElapsedContainer}>
                            <a className={styles.orderTimeElapsed}>{formattedElapsedTime(time - order.time)}</a>
                        </div>
                    </div>
                )
            }) 
        }
        

        orderCells.forEach(cell => {
            if (column.length < 2) {
                column.push(cell)
            }

            if (column.length == 2) {
                columns.push(column)
                column = []
            }
        })

        if (column.length != 0) {
            columns.push(column)
        }

        let constructedColumns = columns.map( (column, index) => {

            return (
                <div className={styles.kitchenColumn} key={index}>
                    {column[0]}
                    {column[1] ? column[1] : null}
                </div>
            )
            
        })

        
        return constructedColumns
    }

    return (
        <div className={styles.sectionContainer}>
            {populateOrders()}
        </div>
    )
}

export default KitchenSection