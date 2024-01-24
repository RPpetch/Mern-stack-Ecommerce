import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { getWishList, removeToWishList } from '../../function/user';
import { DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [wishlist, setWishList] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getWishList(user.token)
      .then((res) => {
        setWishList(res.data.wishlist);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemove = (productId, title) => {
    removeToWishList(user.token, productId)
      .then((res) => {
        toast.success('Remove ' + title + ' from Wishlist');
        loadData();
      })
      .catch((err) => {
        toast.error('Cannot Remove this Product from Wishlist');
        console.log(err);
      });
  };

  return (
    <div className="container-fluid mt-3 col-6">
      <div className="row">
        <h1>Wishlist Page</h1>
        {wishlist.length > 0 ? (
          <div className="col-md-12">
            {wishlist.map((item, index) => (
              <div key={index} className="alert alert-secondary">
                <Link to={"/user/product/" + item._id} style={{textDecoration:"none",color:"inherit"}}>{item.title}</Link>
                <span
                  onClick={() => handleRemove(item._id, item.title)}
                  style={{ float: 'right', cursor: 'pointer' }}
                >
                  <DeleteOutlined style={{ color: 'red' }} />
                </span>
              </div>
            ))}
            <ToastContainer />
          </div>
        ) : (
          <div className="col-md-12">
            <h4>ไม่มีสินค้าใน Wishlist</h4>
            <ToastContainer />
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
