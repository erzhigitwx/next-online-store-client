export const getOrderById = async (id) => {
    const response = await fetch("https://next-online-store-api-production.up.railway.app/orders")
    const data = await response.json()
    const orderKeys = Object.keys(data)
    const foundOrder = orderKeys.find((order) => data[order].orderId === id)
    return foundOrder ? data[foundOrder] : null
}