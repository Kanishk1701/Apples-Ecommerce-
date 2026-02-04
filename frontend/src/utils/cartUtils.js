export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
}

export const updateCart = (state) => {
    // Calculate Items Price
    state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )

    // Calculate Shipping (Free over ₹10,000, else ₹500 - standard luxury logic)
    state.shippingPrice = addDecimals(state.itemsPrice > 10000 ? 0 : 500)

    // Calculate Tax (18% GST standard)
    state.taxPrice = addDecimals(Number((0.18 * state.itemsPrice).toFixed(2)))

    // Calculate Total Price
    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2)

    localStorage.setItem('cart', JSON.stringify(state))

    return state
}