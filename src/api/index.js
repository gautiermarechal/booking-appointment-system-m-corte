import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const createCustomer = payload => api.post(`/customer`, payload)
export const getCustomers = () => api.get(`/customers`)
export const updateCustomerByID = (id, payload) => api.put(`/customer/${id}`, payload)
export const deleteCustomer = id => api.delete(`/customer/${id}`)
export const getCustomerByID = id => api.get(`/customer/${id}`)
export const getCustomerByEmail = email => api.get(`/customerbyemail/${email}`)

export const createBarber = payload => api.post(`/barber`, payload)
export const getBarbers = () => api.get(`/barbers`)
export const getBarberByID = id => api.get(`/barber/${id}`)
export const updateBarber = (id, payload) => api.put(`/barber/${id}`, payload)


export const createAppointment = payload => api.post(`/appointment`, payload)
export const getAppointments = () => api.get(`/appointments`)
export const getAppointmentByID = id => api.get(`/appointment/${id}`)
export const updateAppointment = (id, payload) => api.put(`/appointment/${id}`, payload)
export const deleteAppointment = id => api.delete(`/appointment/${id}`)







const apis = {
    createCustomer,
    getCustomers,
    updateCustomerByID,
    deleteCustomer,
    getCustomerByID,
    getCustomerByEmail,
    createBarber,
    getBarbers,
    getBarberByID,
    updateBarber,
    createAppointment,
    getAppointments,
    updateAppointment,
    getAppointmentByID,
    deleteAppointment,

}

export default apis;