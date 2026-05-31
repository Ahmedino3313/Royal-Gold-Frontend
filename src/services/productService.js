import api from './api.js'

export const fetchProducts = async () => {
    const res = await api.get('/products')
    return res.data
}

export const fetchProductById = async (id) => {
    const res = await api.get(`/products/${id}`)
    return res.data
}