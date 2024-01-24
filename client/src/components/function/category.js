import axios from 'axios'
const REACT_APP_API='http://localhost:8888/api'

export const addCategory = async(authtoken,value) => {
    const category = await axios.post( REACT_APP_API+"/category",value,{
        headers:{
            authtoken
        }
    })
    return category;
}

export const listCategory = async(authtoken) => {
    const category = await axios.get(REACT_APP_API+"/category",{
        headers:{
            authtoken
        }
    })
    return category
} 

export const deleteCategory = async(authtoken,id) => {
    const category = await axios.delete(REACT_APP_API+"/category/"+id,{
        headers:{
            authtoken
        }
    })
    return category
}

export const changeNameCategory = async(authtoken,id,values) =>{
    const users = await axios.put(REACT_APP_API+"/category/"+id,values,{
        headers:{
            authtoken
        }
    })
    return users
}