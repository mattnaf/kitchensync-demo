import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import DemoToolbar from '@/components/DemoToolbar';
import React, { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import TablesSection from '@/components/TablesSection';
import KitchenSection from '@/components/KitchenSection';


export default function Home() {

  const [rightNow, setRightNow] = useState(Date.now())
  const [activeTab, setActiveTab] = useState("Home")

  const timerFunction = () => {
    setTimeout( () => {
      setRightNow(Date.now())
      timerFunction()
    },5000)
  }

  useEffect(() => {
    timerFunction();

  }, [timerFunction]);

  return (
    <>
      <Head>
        <title>Kitchen Sync Demo</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        
        {activeTab == "Home" ? <HeroSection /> : null}
        {activeTab == "Tables" ? <TablesSection /> : null}
        {activeTab == "Kitchen" ? <KitchenSection time={rightNow}/> : null}
        <DemoToolbar activeTab={activeTab} tabClick={(tab) => setActiveTab(tab)}/>
      </div>
      
    </>
  )
}
