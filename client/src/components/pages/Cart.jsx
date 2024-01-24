import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductTableCart from "../card/ProductTableCart";
import { useNavigate } from "react-router-dom";
import { userCart } from "../function/user";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user)
  const { cart } = useSelector((state) => state);
  const { username } = useSelector((state) => state.user);
  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  const handleSaveOrder = () => {
    alert('CheckOut Order')
    userCart(user.token,cart)
    .then((res)=>{
    }).catch((err)=>{
        console.log(err)
    })
    navigate('/checkout')
  };

  const showCartItem = () => {
    return (
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <td>Image</td>
            <td>Title</td>
            <td>Price</td>
            <td>Count</td>
            <td>Remove</td>
          </tr>
        </thead>
        {cart.map((item) => (
          <ProductTableCart key={item._id} item={item} />
        ))}
      </table>
    );
  };
  return (
    <div className="container-fuild">
      <div className="row">
        <div className="col-md-8">
          <h4 className="mt-2">Cart / {cart.length} product</h4>
          {!cart.length ? <p>ไม่มีสินค้าในตะกร้า</p> : showCartItem()}
        </div>
        <div className="col-md-4">
          <h4 className="text-center mt-2">Summary
          <Link to={"/user/history"}><div className="btn btn-primary" style={{marginLeft:"10px"}}>History</div></Link></h4>
          <hr />
          {cart == "" ? (
            <p>ไม่มีสินค้าในตะกร้า</p>
          ) : (
            cart.map((item, index) => (
              <p key={index}>
                {index + 1}. {item.title} x {item.count} ={" "}
                {item.price * item.count}
              </p>
            ))
          )}
          <hr />
          Total : <b>{getTotal()}</b>
          <hr />
          {username != "" ? (
            <button
              className="btn btn-success form-control"
              disabled={!cart.length}
              onClick={handleSaveOrder}
            >
              Check out
            </button>
          ) : (
            <button className="btn btn-warning form-control">
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
                state="/user/cart"
              >
                Login to CheckOut
              </Link>
            </button>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default Cart;
