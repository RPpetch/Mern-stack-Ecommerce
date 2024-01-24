import axios from 'axios'
const REACT_APP_API='http://localhost:8888/api'

export const register = async(value) => {
    const user = await axios.post(REACT_APP_API+'/register',value)
    return user;
}

export const login = async(value) => {
    const user = await axios.post(REACT_APP_API+'/login',value)
    return user;
}

export const currentUser = async(authtoken)=>{
    return await axios.post(REACT_APP_API+'/current-user',{},{
        headers:{
            authtoken
        }
    })}

export const currentAdmin = async(authtoken)=>{
    return await axios.post(REACT_APP_API+'/current-admin',{},{
        headers:{
            authtoken
        }
    })}