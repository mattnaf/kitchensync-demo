import React, { useState, useRef, useEffect } from 'react';
import styles from '@/styles/Home.module.css'

const Description = (props) => {

    return (
        <div className={styles.descriptionContainer}>
            <p>Welcome to the "Kitchen Sync" demo page. On this screen you see two QR codes, each one representing a different table. Imagine they are on a table at a restaurant and scanning them with your phone gives you access to the menu and the ability to place orders. Once orders are placed they will be displayed on the table below as if they were presented to kitchen staff to show the incoming orders. When the orders are &quot;complete&quot;, you can double tap them to &quot;complete&quot; them.</p>
        </div>
    )
}

export default Description