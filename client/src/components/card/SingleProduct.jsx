import React from "react";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card,Tabs } from "antd";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import TabPane from "antd/es/tabs/TabPane";
const { Meta } = Card;
import _ from 'lodash';
import { useSelector,useDispatch } from 'react-redux';
import { addToCart } from '../reducers/slice/cartReducer';
import { setVisible } from "../reducers/slice/drawerReducer";
import { ToastContainer, toast } from "react-toastify";
import { addToWishList } from "../function/user";

const SingleProduct = ({ product }) => {
  const { _id, title, images, price, description, quantity,sold,category } = product;
  const dispatch = useDispatch()
  const user = useSelector((state)=>state.user)
  const handleAddToCart = () => {
    let cart = []
    if(localStorage.getItem('cart')){
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    cart.push({...product,count:1})
    let unique = _.uniqWith(cart,_.isEqual)
    localStorage.setItem('cart',JSON.stringify(unique))
    dispatch(addToCart(unique));
    dispatch(setVisible(true));
  }

  const handleAddToWishList = (e) => {
    if(user.token){
      addToWishList(user.token,_id)
      .then(res=>{
        console.log(res.data)
        toast.success('Add to wishlist Success')
      }).catch(err=>{
        console.log(err)
      })
    }else{
      toast.error('Go to Login')
    }
   
  }

  return (
    <>
      <div className="col-md-7">
        <Carousel autoPlay showArrows={true} infiniteLoop>
          {images &&
            images.map((item) => <img key={item.public_id} src={item.url} />)}
        </Carousel>
        <Tabs>
            <TabPane tab="Description" key="1">
                {description}
            </TabPane>
            <TabPane tab="More..." key="2">
               More...
            </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5">
        <h1 className="p-3 text-center" style={{ backgroundColor: "#9EB384" }}>
          {title}
        </h1>
        <Card
          actions={[
            <a key={_id} onClick={handleAddToWishList}>
              <HeartOutlined key="favourite" className="text-info" />,
              <br />
              Add to wishlist
            </a>,
            <>
            <a onClick={handleAddToCart}>
              <ShoppingCartOutlined 
              key="cart" 
              className="text-success" 
                />
                <br/>
              Add to cart
              </a>
            </>,
          ]}
        >
          <ul className="list-group list-group-flush">
            {category && 
              <li className="list-group-item">
              Category
              <span className="float-end">{category.name}</span>
          </li>
            }
          
            <li className="list-group-item">
                Price
                <span className="float-end">{price}</span>
            </li>
            <li className="list-group-item">
                Quantity
                <span className="float-end">{quantity}</span>
            </li>
            <li className="list-group-item">
                Sold
                <span className="float-end">{
                   sold
                }</span>
            </li>
          </ul>
        </Card>
        <ToastContainer/>
      </div>
    </>
  );
};

export default SingleProduct;
