import axios from "axios"


  const apiRequest = axios.create({
    baseURL:import.meta.env.VITE_API_ENDPOINT

})

export default apiRequest