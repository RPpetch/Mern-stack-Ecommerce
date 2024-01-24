import React from 'react'
import { listProduct,removeProduct } from '../../function/product'
import { useState,useEffect } from 'react'
import AdminProductCard from '../../card/AdminProductCard';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const user = useSelector((state) => state.user);
  const[product,setProduct]= useState([]);
  const[loading,setLoading] = useState(false);

  const loadData = (count) => {
    setLoading(true)
    listProduct(count)
    .then((res)=>{
      setLoading(false)
      setProduct(res.data)
    }).catch((err)=>{
      setLoading(false)
      console.log(err);
    })
  }

  useEffect(()=>{
    loadData(100)
  },[])

  const handleRemove = (id) => {
    if(window.confirm("Delete ?")){
      removeProduct(user.token,id)
      .then((res)=>{
        console.log(res)
        toast.success("Remove Product Success");
        loadData(100)
      }).catch((err)=>{
        console.log(err)
        toast.error("Cannot Remove Product");
      })
    }else{
      toast.error("Error Remove Product");
    }
  }

  const handleUpdate = (id) => {
    console.log(id)
  }

  return (
    <div className="container-fluid">
        <div className="row">
          <div className="col">
          { 
            loading
            ? <h1>Loading...</h1>
            : <h1>Home Admin</h1>
          }
          <div className='row'>
          {product.map((item)=>(
            <div key={item._id} className='col-md-3 pb-3'>
            <AdminProductCard  product={item} handleRemove={handleRemove} handleUpdate={handleUpdate} />
            </div>
         ))}
          </div>
        </div>
        </div>
        <ToastContainer />
    </div>
  );
};

export default Home