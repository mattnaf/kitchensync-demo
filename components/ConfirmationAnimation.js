import React from "react";
import styles from '@/styles/Home.module.css'

const ConfirmationAnimation = (props) => {
    const {size, strokeWidth, percentage} = props
    const viewBox = `0 0 ${size} ${size}`
    const radius = (size - strokeWidth) / 2
    const circumference = radius * Math.PI * 2
    const dash = (percentage * circumference) / 100

    return (
        <div>
            <svg className={styles.thankYouAnimation} width={size} height={size} viewBox={viewBox}>
                <circle
                    fill="none"
                    stroke="lightgrey"
                    cx={size/2}
                    cy={size/2}
                    r={radius}
                    strokeWidth={`${strokeWidth}px`}
                />
                <circle
                    fill="none"
                    stroke="green"
                    cx={size/2}
                    cy={size/2}
                    r={radius}
                    strokeWidth={`${strokeWidth}px`}
                    transform={`rotate(-90 ${size / 2} ${size/2})`}
                    strokeDasharray={[dash, circumference - dash]}
                    strokeLinecap="round"
                />
                <text
                    fill="black"
                    fontSize="1.5em"
                    x="50%"
                    y="45%"
                    dy="20px"
                    textAnchor="middle"
                    opacity={percentage/100}
                >Thank You!</text>
            </svg>
        </div>
        
    )
}

export default ConfirmationAnimation