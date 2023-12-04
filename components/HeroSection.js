import React from "react";
import styles from '@/styles/Home.module.css'

const HeroSection = (props) => {
    return (
        <div className={styles.sectionContainer}>
            <div className={styles.heroLeft}>
                <div className={styles.heroTitleContainer}>
                    <p className={styles.heroTitleText}>KitchenSync</p>
                    <p className={styles.heroTitleText}>Demo</p>
                </div>
                <div className={styles.heroDescriptionContainer}>
                    <p className={styles.heroDescriptionText}>Welcome to the &quot;Kitchen Sync&quot; demo page. On the &quot;Tables&quot; tab you will see some QR codes, each one representing a different table. Imagine they are on a table at a restaurant and scanning them with your phone gives you access to the menu and the ability to place orders. Once orders are placed they will be displayed on the &quot;Kichen&quot; tab as if they were presented to kitchen staff to show the incoming orders. When the orders are &quot;complete&quot;, you can double tap them to &quot;complete&quot; them and remove them from the table.</p>
                </div>
                <div className={styles.heroCallToActionContainer}>
            
                </div>
            </div>
            <div className={styles.heroRight}>
                <img className={styles.logo} src="/kitchenSyncLogo.png"/>
            </div>
       </div> 
    )
}

export default HeroSection