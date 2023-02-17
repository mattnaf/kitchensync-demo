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
        image:"https://firebasestorage.googleapis.com/v0/b/kitchensync-fd489.appspot.com/o/lemonChicken.png?alt=media&token=4d4399d2-03a7-4248-a771-0b314313e67b"
      },
      {
        id:2,
        title: "Caprese Salad",
        price: 12.99,
        description: "Fresh mozzarella, ripe tomatoes, and basil leaves drizzled with balsamic reduction.",
        type: "appetizer",
        image: "https://firebasestorage.googleapis.com/v0/b/kitchensync-fd489.appspot.com/o/capreseSalad.png?alt=media&token=69914394-cfb3-45fd-b3f5-b6418370c293"
      },
      {
        id:3,
        title: "Baked Mac and Cheese",
        price: 18.99,
        description: "Creamy macaroni and cheese baked to bubbly perfection.",
        type: "side",
        image: "https://firebasestorage.googleapis.com/v0/b/kitchensync-fd489.appspot.com/o/bakedMac.png?alt=media&token=53c7eb7d-87cb-4082-a67b-88c0082feae9"
      },
      {
        id:4,
        title: "Tomato Soup",
        price: 7.99,
        description: "A classic soup made with ripe tomatoes, cream, and spices.",
        type: "appetizer",
        image: "https://firebasestorage.googleapis.com/v0/b/kitchensync-fd489.appspot.com/o/tomatoeSoup.png?alt=media&token=79be5bd7-419e-46d7-83e7-76fc38a26e6d"
      },
      {
        id:5,
        title: "Steak Frites",
        price: 34.99,
        description: "A juicy ribeye steak served with crispy french fries.",
        type: "entree",
        image: "https://firebasestorage.googleapis.com/v0/b/kitchensync-fd489.appspot.com/o/steakFrites.png?alt=media&token=e8adbd2d-7e6b-4896-9b2c-3cbc3e8d6178"
      },
      {
        id:6,
        title: "Pesto Pasta",
        price: 19.99,
        description: "Penne pasta tossed with basil pesto and sun-dried tomatoes.",
        type: "entree",
        image: "https://firebasestorage.googleapis.com/v0/b/kitchensync-fd489.appspot.com/o/pestoPasta.png?alt=media&token=10a393dc-f3f0-45cd-b566-ac167862ad8d"
      },
      {
        id:7,
        title: "Mashed Potatoes",
        price: 9.99,
        description: "Creamy mashed potatoes seasoned with butter, milk, and garlic.",
        type: "side",
        image: "https://firebasestorage.googleapis.com/v0/b/kitchensync-fd489.appspot.com/o/mashedPotatoes.png?alt=media&token=f7ad3f54-abe6-47a4-bc80-04588faa90d8"
      },
      {
        id:8,
        title: "Margarita Pizza",
        price: 22.99,
        description: "A classic Margarita pizza with tomato sauce, mozzarella cheese, and fresh basil.",
        type: "entree",
        image: "https://firebasestorage.googleapis.com/v0/b/kitchensync-fd489.appspot.com/o/margaritaPizza.png?alt=media&token=b5348cfb-200e-4e01-8b99-ab6d3decc663"
      },
      {
        id:9,
        title: "Caesar Salad",
        price: 8.99,
        description: "Crisp romaine lettuce, croutons, and parmesan cheese dressed with classic Caesar dressing.",
        type: "appetizer",
        image: "https://firebasestorage.googleapis.com/v0/b/kitchensync-fd489.appspot.com/o/cesarSalad.png?alt=media&token=b27e038e-8106-4777-be89-6f68f081f60a"
      },
      {
        id:10,
        title: "Grilled Vegetables",
        price: 12.99,
        description: "A medley of seasonal vegetables grilled to perfection.",
        type: "side",
        image: "https://firebasestorage.googleapis.com/v0/b/kitchensync-fd489.appspot.com/o/grilledVeggies.png?alt=media&token=1d2ce6e2-a434-4b34-9bb5-9bc73d274d89"
      },
      {
        id:11,
        title: "Fried Rice",
        price: 14.99,
        description: "Stir-fried rice with vegetables and eggs.",
        type: "entree",
        image: "https://firebasestorage.googleapis.com/v0/b/kitchensync-fd489.appspot.com/o/friedRice.png?alt=media&token=5551ee7c-9642-4a6b-bb97-ba25812482c8"
      },
      {
        id:12,
        title: "Cobb Salad",
        price: 15.99,
        description: "A classic cobb salad with romaine lettuce, grilled chicken, bacon, eggs, and blue cheese.",
        type: "entree",
        image: "https://firebasestorage.googleapis.com/v0/b/kitchensync-fd489.appspot.com/o/cobbSalad.png?alt=media&token=ba80a053-84f1-4b0d-b013-c79716609798"
      },
      {
        id:13,
        title: "Crab Cakes",
        price: 24.99,
        description: "Juicy crab cakes seasoned with herbs and spices, pan-fried to crispy perfection.",
        type: "appetizer",
        image: "https://firebasestorage.googleapis.com/v0/b/kitchensync-fd489.appspot.com/o/crabCakes.png?alt=media&token=d2726a0d-5d25-4e4a-92e3-7449fed669d9"
      },
      {
        id:14,
        title: "Lemonade",
        price: 3.50,
        description: "Refreshing glass of lemonade made with real lemons.",
        type: "drink",
        image: "https://firebasestorage.googleapis.com/v0/b/kitchensync-fd489.appspot.com/o/lemondae.png?alt=media&token=3a12ed4f-7493-4003-9e80-695d53800cf2"
      },
      {
        id:15,
        title: "Iced Tea",
        price: 2.50,
        description: "Brewed and chilled iced tea with a hint of lemon.",
        type: "drink",
        image: "https://firebasestorage.googleapis.com/v0/b/kitchensync-fd489.appspot.com/o/icedTea.png?alt=media&token=43498d50-e4c3-41c2-a0f9-9e04751c688c"
      },
      {
        id:16,
        title: "Soda",
        price: 2.75,
        description: "A classic soda with your choice of flavor.",
        type: "drink",
        image: "https://firebasestorage.googleapis.com/v0/b/kitchensync-fd489.appspot.com/o/soda.png?alt=media&token=13a6ec9e-5def-4b6f-889d-344d1a28c3e9"
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


