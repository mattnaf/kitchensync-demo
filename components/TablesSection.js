import React from "react";
import styles from '@/styles/Home.module.css'
import TableQrCode from "./TableQrCode";

const TablesSection = (props) => {
    return (
        <div className={styles.sectionContainer}>
            <div className={styles.tablesColumn}>
                <TableQrCode qrName="Table 1" qrUrl="/tableOne.png" />
                <TableQrCode qrName="Table 2" qrUrl="/tableTwo.png" />
            </div>
            <div className={styles.tablesColumn}>
                <TableQrCode qrName="Table 3" qrUrl="/tableThree.png" />
                <TableQrCode qrName="Table 4" qrUrl="/tableFour.png" />
            </div>
        </div>
    )
}

export default TablesSection