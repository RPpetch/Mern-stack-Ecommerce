import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {EyeOutlined,ShoppingCartOutlined} from '@ant-design/icons';
import { Card } from "antd";
import _ from 'lodash';
import { useSelector,useDispatch } from 'react-redux';
import { addToCart } from '../reducers/slice/cartReducer';
import { setVisible } from '../reducers/slice/drawerReducer';
const { Meta } = Card;

const ProductCard = ({product}) => {
  const dispatch = useDispatch()
    const { _id,title, description, images } = product;
    const navigate = useNavigate();
    const infoProduct = () =>{
      navigate("../user/product/"+_id)
    }
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
    
    return (
      <div>
        <Card 
          hoverable
          cover={<img 
              alt="example" 
              className=""
              style={{height:"170px",objectFit:"cover"}}
              src={images && images.length 
              ? images[0].url
              : ""
              }
              onClick={infoProduct}/>}
              actions={[
                <Link key={_id} to={"../user/product/"+_id}>
                <EyeOutlined  key="view" className="text-warning" />,
                </Link>,
                <ShoppingCartOutlined key="cart" onClick={handleAddToCart}/>
              ]}
          >
          <Meta title={title} description={description} />
        </Card> 
      </div>
    );
  };

export default ProductCard