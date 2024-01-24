import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { readProduct } from '../function/product'
import SingleProduct from '../card/SingleProduct'

const Product = () => {
  const params = useParams()
  const [product,setProduct] = useState([])
  useEffect(()=>{
    loadData()
  },[])

  const loadData = () =>{
    readProduct(params.id)
    .then((res)=>{
      setProduct(res.data)
    }).catch((err)=>{
      console.log(err.response.data)
    })
  }

  return (
    <div className='container-fluid'>
      <div className='row pt-4'>
       <SingleProduct product={product}/>
      </div>
      <div className='row'>

      </div>
    </div>
  )
}

export default Product