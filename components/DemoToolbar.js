import React from "react";
import styles from '@/styles/Home.module.css'

const DemoToolbar = (props) => {
    const { activeTab, tabClick } = props

    

    return (
        <div className={styles.toolbarContainer}>
            <div className={styles.toolbarTitle}>KitchenSync Demo</div>
            <div className={styles.toolbarTabsContainer}>
                <div className={activeTab === 'Home' ? styles.activeTab : styles.tab} onClick={() => tabClick("Home")}>Home</div>
                <div className={activeTab === 'Tables' ? styles.activeTab : styles.tab} onClick={() => tabClick("Tables")}>Tables</div>
                <div className={activeTab === 'Kitchen' ? styles.activeTab : styles.tab} onClick={() => tabClick("Kitchen")}>Kitchen</div>
            </div>
        </div>

    )
}

export default DemoToolbar