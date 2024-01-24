import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { currentAdmin } from '../function/auth';
import LoadingToRedirect from './LoadingToRedirect';

const AdminRoute = ({ children }) => {
    // const user = useSelector((state) =>state.user);
    const [ok,setOk] = useState(false);
    const token = localStorage.getItem('token');
    useEffect(()=>{
      if(token){
        currentAdmin(token)
        .then(res=>{
          setOk(true)
        }).catch(err=>{
          setOk(false)
        })
      }
    },[])
    return ok ? children : <LoadingToRedirect />;
  };
  
export default AdminRoute