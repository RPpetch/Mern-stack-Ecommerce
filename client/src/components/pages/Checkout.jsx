import React, { useEffect, useState } from "react";
import { emptyCart, getUserCart, saveAddress, saveOrder } from "../function/user";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import { addToCart } from "../reducers/slice/cartReducer";
import {useNavigate} from 'react-router-dom';

const Checkout = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUserCart(user.token)
      .then((res) => {
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSaveAddress = () => {
    saveAddress(user.token, address)
      .then((res) => {
        if (res.data.ok) {
          setAddressSaved(true);
          toast.success("Save Address Success");
          return;
        } else {
          setAddressSaved(false);
          toast.error("Cannot Save Address");
        }
      })
      .catch((err) => {
        setAddressSaved(false);
        toast.error("Error Address Success");
        console.log(err);
      });
  };

  const handleCreateOrder = () => {
    saveOrder(user.token)
    .then(res=>{
      emptyCart(user.token)
      dispatch(addToCart([]))
      if(typeof window!== 'undefined'){
        localStorage.removeItem('cart')
      }
      toast.success('Save Order Success')
      navigate('/user/history');
    }).catch(err=>{
      console.log(err)
    })
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 mt-2">
          <h4>Address</h4>
          <br />
          <ReactQuill value={address} onChange={setAddress} />
          <button
            className="btn btn-primary mt-2 form-control"
            onClick={handleSaveAddress}
          >
            Save Address
          </button>
        </div>
        <div className="col-md-6 mt-2">
          <h4>Order Summary</h4>
          <hr />
          <p>
            Product: <b>{products.length}</b>
          </p>
          <hr />
          <p>List of product</p>
          {products.map((item, index) => (
            <div key={index}>
              <p>
                {index + 1}. {item.product.title} x {item.count} ={" "}
                {item.price * item.count}
              </p>
            </div>
          ))}
          <hr />
          Total : <b>{total}</b>
          <br />
          <button
            className="btn btn-success mt-2 form-control"
            disabled={!addressSaved || !products.length}
            onClick={handleCreateOrder}
          >
            Checkout
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Checkout;
