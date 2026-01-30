import axios from "axios"

const instanse = axios.create({
    baseURL: "https://mern-blog-1-0acg.onrender.com/api",
})

instanse.interceptors.request.use(config => {
    config.headers.Authorization = window.localStorage.getItem("token")


    return config
})


export default instanse
