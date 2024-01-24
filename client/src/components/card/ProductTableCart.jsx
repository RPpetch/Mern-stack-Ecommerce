import React from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { addToCart } from "../reducers/slice/cartReducer";
import { DeleteOutlined } from "@ant-design/icons";

const ProductTableCart = ({ item }) => {
  const dispatch = useDispatch();
  const handleChangeCount = (e) => {
    const count = e.target.value < 1 ? 1 : e.target.value;

    if (count > item.quantity) {
      toast.error("Max avialable Quantify:" + item.quantity);
      return;
    }

    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, i) => {
      if (product._id == item._id) {
        cart[i].count = count;
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch(addToCart(cart));
  };

  const handleRemove = () => {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, i) => {
      if (product._id == item._id) {
        cart.splice(i,1)
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch(addToCart(cart));
  };
  return (
    <>
      <tbody>
        <tr>
          <td>
            <img src={item.images[0].url} width="70px" />
          </td>
          <td>{item.title}</td>
          <td>{item.price}</td>
          <td>
            <input
              type="number"
              className="form-control"
              value={item.count}
              onChange={handleChangeCount}
            />
          </td>
          <td>
            <DeleteOutlined className="text-danger" onClick={handleRemove} />
          </td>
        </tr>
      </tbody>
      <ToastContainer />
    </>
  );
};

export default ProductTableCart;
