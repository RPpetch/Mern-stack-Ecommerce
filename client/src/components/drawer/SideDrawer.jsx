import React from 'react'
import { Button, Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setVisible } from '../reducers/slice/drawerReducer';
import { Link } from 'react-router-dom';


const SideDrawer = () => {
    const dispatch = useDispatch();
    const {cart,drawer} = useSelector((state)=>state)
    const onCloseDrawer = () => {
        dispatch(setVisible(false))
    }
  return (
    <Drawer title={"Cart "+ cart.length + " product"} placement="right" onClose={onCloseDrawer} open={drawer}>
    {cart.map((item,index)=>
        <div key={index} className="row">
            <div className="col">
                <img src={item.images[0].url} 
                style={{width:"100%",height:"50px",objectFit:"cover"}} />
                <p className='text-center bg-secondary text-light'>
                {index+1}.{item.title} x {item.count}
                </p>
            </div>
        </div>
    )}
    <Link to={"/cart"} style={{textDecoration:"none"}}>
    <button 
     onClick={onCloseDrawer}
    className='text-center form-control' style={{backgroundColor:"#435334",color:"white"}}>
        Go To Cart
    </button>
    </Link>
  </Drawer>
  )
}

export default SideDrawer