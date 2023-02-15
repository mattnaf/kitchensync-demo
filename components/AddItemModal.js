import React, { useState } from "react";
import styles from '@/styles/Home.module.css'

const AddItemModal = (props) => {

    const [quantity, setQuantity] = useState(1)
    const [comment, setComment] = useState("")
    const item = props.selectedItem

    const closeAddItem = () => {
        setComment("")
        setQuantity(1)
        props.closeAddItem()
    }

    const addItemToCart = (item,quantity,comment) => {
        props.addItemToCart(item,quantity,comment)
        closeAddItem()
    }

    return (
        <div hidden={props.selectedItem == null} className={styles.modalContainer}>
            <div className={styles.modalBackground}/>
            <div className={styles.modal}>
                <button className={styles.closeAddItemModalButton} onClick={() => closeAddItem()} >X</button>
                <img src={item ? item.image : ""} className={styles.addItemModalImage}/>
                <h3 className={styles.addItemModalTitle}>{item ? item.title : ""}</h3>
                <p className={styles.addItemModalDescription}>{item ? item.description : "" }</p>
                <textarea value={comment} className={styles.addItemModalComments} placeholder="Comments ex. no ketchup" onChange={(event) => setComment(event.target.value)} ></textarea>
                <br />
                <div className={styles.addItemModalQuantityControlsContainer}>
                    <button className={styles.quantityButton} onClick={() => quantity > 1 ? setQuantity(quantity-1) : null} >-</button>
                    <p className={styles.quantity}>{quantity}</p>
                    <button className={styles.quantityButton} onClick={() => setQuantity(quantity+1)} >+</button>
                </div>
                <button className={styles.addToCartButton} onClick={() => addItemToCart(item,quantity,comment)}>Add to cart</button>
            </div>
        </div>
        
    )
}

export default AddItemModal