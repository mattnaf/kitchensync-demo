
const generateCartId = (tableNumber) => {
    const cartId = `${tableNumber}-${Date.now()}`
    return cartId
}

export default generateCartId