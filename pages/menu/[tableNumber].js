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

    const menuItems = [
      {
        id:1,
        title: "Lemon Herb Grilled Chicken",
        price: 29.99,
        description: "A juicy and flavorful chicken breast grilled to perfection with lemon and herbs.",
        type: "entree",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      },
      {
        id:2,
        title: "Caprese Salad",
        price: 12.99,
        description: "Fresh mozzarella, ripe tomatoes, and basil leaves drizzled with balsamic reduction.",
        type: "appetizer",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      },
      {
        id:3,
        title: "Baked Mac and Cheese",
        price: 18.99,
        description: "Creamy macaroni and cheese baked to bubbly perfection.",
        type: "side",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      },
      {
        id:4,
        title: "Tomato Soup",
        price: 7.99,
        description: "A classic soup made with ripe tomatoes, cream, and spices.",
        type: "appetizer",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      },
      {
        id:5,
        title: "Steak Frites",
        price: 34.99,
        description: "A juicy ribeye steak served with crispy french fries.",
        type: "entree",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      },
      {
        id:6,
        title: "Pesto Pasta",
        price: 19.99,
        description: "Penne pasta tossed with basil pesto and sun-dried tomatoes.",
        type: "entree",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      },
      {
        id:7,
        title: "Mashed Potatoes",
        price: 9.99,
        description: "Creamy mashed potatoes seasoned with butter, milk, and garlic.",
        type: "side",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      },
      {
        id:8,
        title: "Margarita Pizza",
        price: 22.99,
        description: "A classic Margarita pizza with tomato sauce, mozzarella cheese, and fresh basil.",
        type: "entree",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      },
      {
        id:9,
        title: "Caesar Salad",
        price: 8.99,
        description: "Crisp romaine lettuce, croutons, and parmesan cheese dressed with classic Caesar dressing.",
        type: "appetizer",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      },
      {
        id:10,
        title: "Grilled Vegetables",
        price: 12.99,
        description: "A medley of seasonal vegetables grilled to perfection.",
        type: "side",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      },
      {
        id:11,
        title: "Fried Rice",
        price: 14.99,
        description: "Stir-fried rice with vegetables and eggs.",
        type: "entree",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      },
      {
        id:12,
        title: "Cobb Salad",
        price: 15.99,
        description: "A classic cobb salad with romaine lettuce, grilled chicken, bacon, eggs, and blue cheese.",
        type: "entree",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      },
      {
        id:13,
        title: "Crab Cakes",
        price: 24.99,
        description: "Juicy crab cakes seasoned with herbs and spices, pan-fried to crispy perfection.",
        type: "appetizer",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      },
      {
        id:14,
        title: "Lemonade",
        price: 3.50,
        description: "Refreshing glass of lemonade made with real lemons.",
        type: "drink",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      },
      {
        id:15,
        title: "Iced Tea",
        price: 2.50,
        description: "Brewed and chilled iced tea with a hint of lemon.",
        type: "drink",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      },
      {
        id:16,
        title: "Soda",
        price: 2.75,
        description: "A classic soda with your choice of flavor.",
        type: "drink",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      }
  ];

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


