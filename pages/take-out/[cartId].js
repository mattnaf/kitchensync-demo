import { useRouter } from 'next/router'
import React, {useState, useEffect, useCallback} from 'react';
import MenuNavigation from '../../components/MenuNavigation';
import MenuTable from '../../components/MenuTable';
import ViewCartButton from '../../components/ViewCartButton';
import styles from '@/styles/Home.module.css';
import AddItemModal from '@/components/AddItemModal';
import ViewCartModal from '@/components/ViewCartModal';
import PaymentModal from '@/components/PaymentModal';
import PaymentConfirmedModal from '@/components/PaymentConfirmedModal';
import db from '../../firebase';
import { doc, setDoc } from "firebase/firestore";
import { menuItems } from '@/constants';

const Menu = (props) => {

  const router = useRouter()
  const { tableNumber } = router.query
  const [selectedItem, setSelectedItem] = useState();
  const [cartId, setCartId] = useState()
  const [orderArray, setOrderArray] = useState([])
  const [appetizersArray, setAppetizersArray] = useState([])
  const [entreesArray, setEntreesArray] = useState([])
  const [sidesArray, setSidesArray] = useState([])
  const [drinksArray, setDrinksArray] = useState([])
  const [cart, setCart] = useState([])
  const [showViewCart, setShowViewCart] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [tip, setTip] = useState(0)
  const [animationPercentage, setAnimationPercentage] = useState(1)
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false)
  const [showThankYouText, setShowThankYouText] = useState(false)


  const initialize = useCallback(() => {
    let appetizers = [];
    let entrees = [];
    let sides = [];
    let drinks =[];

    

    menuItems.forEach( item => {
      switch (item.type) {
        case "appetizer":
          appetizers.push(item)
          break
        case "entree":
          entrees.push(item)
          break
        case "side":
          sides.push(item)
          break
        case "drink":
          drinks.push(item)
          break
      }
    })

    setAppetizersArray(appetizers)
    setEntreesArray(entrees)
    setSidesArray(sides)
    setDrinksArray(drinks)

  }, [])

  const generateCartId = () => {
    const cartId = `${tableNumber}-${Date.now()}`
    return cartId
  }

  const sectionScrollTo = (id) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({behavior: "smooth"})
    } else {
      console.log(id)
      console.log("no section found")
    }
  }

  const addItemToCart = (item,quantity,comment) => {
    let currentCart = cart
    let orderItem = item;
    orderItem.quantity = quantity
    orderItem.comment = comment
    currentCart.push(orderItem)
    setCart(currentCart)
    setSelectedItem()
  }

  const goToCheckOut = () => {
    setShowPayment(true)
    setShowViewCart(false)
  }

  let test = 0

  const animatonFunction = () => {
    setTimeout( () => {
      test = test + 5
      setAnimationPercentage(test)
      if (test < 101) {
        animatonFunction()
      } else {
        setShowThankYouText(true)
      }
    },10)
  }

  const confirmPayment = async () => {
    setShowPayment(false)
    setShowPaymentConfirmation(true)
    

    await Promise.all(cart.map( async (item, index) => {
      let cartId = generateCartId() + `${index}`
      await setDoc(doc(db, "orders", cartId), {
        table: tableNumber,
        title: item.title,
        quantity: item.quantity,
        comment: item.comment,
        time:Date.now(),
        id: cartId
      });
    }))
    
    
    animatonFunction()
    setAnimationPercentage(0)
    setCart([])
    setTip(0)
  }

  const closePaymentModal = () => {
    setShowPaymentConfirmation(false)
  }
  

  useEffect(() => {
    initialize();

  }, [initialize]);

  return (
    <div className={styles.menuPage}>
      <div className={styles.menuPageHeader}>
        <MenuNavigation onClick={(id) => sectionScrollTo(id)} />
      </div>
      <div id="appetizers">
        <MenuTable menuItems={appetizersArray} sectionTitle="Appetizers" setSelectedItem={(item) => setSelectedItem(item) }/>
      </div>
      <div id="entrees">
        <MenuTable menuItems={entreesArray} sectionTitle="Entrees" setSelectedItem={(item) => setSelectedItem(item) }/>
      </div>
      <div id="sides">
        <MenuTable menuItems={sidesArray} sectionTitle="Sides" setSelectedItem={(item) => setSelectedItem(item) }/>
      </div>
      <div id="drinks">
        <MenuTable menuItems={drinksArray} sectionTitle="Drinks" setSelectedItem={(item) => setSelectedItem(item) }/>
      </div>
      <ViewCartButton itemCount={cart.length} onClick={() => setShowViewCart(true)}/>
      <AddItemModal closeAddItem={setSelectedItem} selectedItem={selectedItem} addItemToCart={(item,quantity,comment) => addItemToCart(item,quantity,comment)}/>
      <ViewCartModal hide={() => setShowViewCart(false)} show={showViewCart} items={cart} showPayment={() => goToCheckOut()} updateCart={(cart) => setCart(cart) }/>
      <PaymentModal hide={() => setShowPayment(false)} show={showPayment} items={cart} updateTip={(tip) => setTip(tip)} tip={tip} submitPayment={() => confirmPayment()}/>
      <PaymentConfirmedModal show={showPaymentConfirmation} percentage={animationPercentage} closeModal={() => closePaymentModal()}/>
    </div>
  );
};

export default Menu;


