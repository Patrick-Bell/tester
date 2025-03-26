import axios from 'axios'

export const getOrders = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/orders`, { withCredentials: true })
    return response.data
}