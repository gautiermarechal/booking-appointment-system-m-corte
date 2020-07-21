import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const createCustomer = payload => api.post(`/customer`, payload)
export const getCustomers = () => api.get(`/customers`)
export const updateCustomerByID = (id, payload) => api.put(`/customer/${id}`, payload)
export const deleteCustomer = id => api.delete(`/customer/${id}`)
export const getCustomerByID = id => api.get(`/customer/${id}`)
export const getCustomerByEmail = email => api.get(`/customer/${email}`)

const apis = {
    createCustomer,
    getCustomers,
    updateCustomerByID,
    deleteCustomer,
    getCustomerByID,
    getCustomerByEmail
}

export default apis;