import axios from 'axios'
const REACT_APP_API='http://localhost:8888/api'

export const createProduct = async(authtoken,values) => {
    const product = await axios.post(REACT_APP_API+"/product",values,{
        headers:{
            authtoken
        }
    })
    return product
}

export const listProduct = async(count) =>
await axios.get(REACT_APP_API+"/product/"+count)


export const removeProduct = async(authtoken,id)=>{
    const product = await axios.delete(REACT_APP_API+"/product/"+id,{
        headers:{
            authtoken
        }
    })
    return product;
}


export const readProduct = async(id) =>
await axios.get(REACT_APP_API+"/products/"+id)

export const updateProduct = async(authtoken,id,values)=>{
    const product = await axios.put(REACT_APP_API+"/products/"+id,values,{
        headers:{
            authtoken
        }
    })
    return product;
}

export const listProductBy = async(sort,order,limit)=>{
    const product = await axios.post(REACT_APP_API+"/productby",{
        sort,
        order,
        limit
    })
    return product
}

export const searchFilters = async(arg)=>{
    const product = await axios.post(REACT_APP_API+"/search/filters",arg);
    return product
}
