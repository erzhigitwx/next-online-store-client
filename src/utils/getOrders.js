export const getOrders = async (key) => {
    const response = await fetch("https://next-online-store-api-production.up.railway.app/orders")
    const data = await response.json()
    const orderList = Object.keys(data)
    let result = []
    orderList.forEach((item) => {
        if (data[item].category === key) {
            result = [...result, data[item]]
        }
    })
    return result;
}