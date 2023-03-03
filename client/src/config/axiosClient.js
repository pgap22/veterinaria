import axios from 'axios'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASEURL
})

export default axiosClient
