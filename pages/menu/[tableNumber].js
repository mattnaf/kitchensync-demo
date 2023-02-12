import { useRouter } from 'next/router'
import React from 'react';
import MenuNavigation from '../../components/MenuNavigation';
import MenuTable from '../../components/MenuTable';
import CartButton from '../../components/ViewCartButton';
import styles from '@/styles/Home.module.css';


const Menu = (props) => {
//   const { products } = props;

  const menuItems = [
      {
        title: "Lemon Herb Grilled Chicken",
        price: "$29.99",
        description: "A juicy and flavorful chicken breast grilled to perfection with lemon and herbs.",
        type: "entree",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      },
      {
        title: "Caprese Salad",
        price: "$12.99",
        description: "Fresh mozzarella, ripe tomatoes, and basil leaves drizzled with balsamic reduction.",
        type: "appetizer",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      },
      {
        title: "Baked Mac and Cheese",
        price: "$18.99",
        description: "Creamy macaroni and cheese baked to bubbly perfection.",
        type: "side",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      },
      {
        title: "Tomato Soup",
        price: "$7.99",
        description: "A classic soup made with ripe tomatoes, cream, and spices.",
        type: "appetizer",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      },
      {
        title: "Steak Frites",
        price: "$34.99",
        description: "A juicy ribeye steak served with crispy french fries.",
        type: "entree",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      },
      {
        title: "Pesto Pasta",
        price: "$19.99",
        description: "Penne pasta tossed with basil pesto and sun-dried tomatoes.",
        type: "entree",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      },
      {
        title: "Mashed Potatoes",
        price: "$9.99",
        description: "Creamy mashed potatoes seasoned with butter, milk, and garlic.",
        type: "side",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      },
      {
        title: "Margarita Pizza",
        price: "$22.99",
        description: "A classic Margarita pizza with tomato sauce, mozzarella cheese, and fresh basil.",
        type: "entree",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      },
      {
        title: "Caesar Salad",
        price: "$8.99",
        description: "Crisp romaine lettuce, croutons, and parmesan cheese dressed with classic Caesar dressing.",
        type: "appetizer",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      },
      {
        title: "Grilled Vegetables",
        price: "$12.99",
        description: "A medley of seasonal vegetables grilled to perfection.",
        type: "side",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      },
      {
        title: "Fried Rice",
        price: "$14.99",
        description: "Stir-fried rice with vegetables and eggs.",
        type: "entree",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      },
      {
        title: "Cobb Salad",
        price: "$15.99",
        description: "A classic cobb salad with romaine lettuce, grilled chicken, bacon, eggs, and blue cheese.",
        type: "entree",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      },
      {
        title: "Crab Cakes",
        price: "$24.99",
        description: "Juicy crab cakes seasoned with herbs and spices, pan-fried to crispy perfection.",
        type: "appetizer",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      },
      {
        title: "Lemonade",
        price: "$3.50",
        description: "Refreshing glass of lemonade made with real lemons.",
        type: "drink",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      },
      {
        title: "Iced Tea",
        price: "$2.50",
        description: "Brewed and chilled iced tea with a hint of lemon.",
        type: "drink",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      },
      {
        title: "Soda",
        price: "$2.75",
        description: "A classic soda with your choice of flavor.",
        type: "drink",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      }
  ];

  const [selectedCategory, setSelectedCategory] = React.useState('appetizers');

  return (
    <div className={styles.menuPage}>
      <div className={styles.menuPageHeader}>
        <MenuNavigation onClick={setSelectedCategory} />
        <div className={styles.shoppingPageCart}>
          <i className={`fas fa-shopping-cart ${styles.shoppingPageCartIcon}`} />
        </div>
      </div>
      <MenuTable menuItems={menuItems} />
      <CartButton itemCount={5}/>
    </div>
  );
};

export default Menu;


