import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createProduct } from "../../../function/product";
import { listCategory } from "../../../function/category";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileUpload from "./FileUpload";
import { Spin } from 'antd';
import { useNavigate } from "react-router-dom";
const initialstate = {
  title: "",
  description: "",
  categories: [],
  category: "",
  price: "",
  quantity: "",
  images: [],
};



const CreateProduct = () => {
  const user = useSelector((state) => state.user);
  const [values, setValues] = useState(initialstate);
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    loadData(user.token);
  }, []);


  const loadData = (authtoken) => {
    listCategory(authtoken)
      .then((res) => {
        setValues({ ...values, categories: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkValid = () => {
    var check;
    if (
      !values.title ||
      !values.category ||
      !values.price ||
      !values.quantity
    ) {
      toast.error("Please fill out all fields completely.");
      check = false;
    } else {
      check = true;
    }
    return check;
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const check = checkValid();
    if (check == true) {
      if(loading == false){
        createProduct(user.token, values)
        .then((res) => {
          toast.success("Created Product " + values.title + " Success");
          setValues({
            title: "",
            description: "",
            categories: [],
            category: "",
            price: "",
            quantity: "",
            images: [],
          });
          navigate("/admin/index")
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error Create Product");
        });
      }else if(loading == true){
        toast.error("Waitting For Upload Images");
      }
    }
  };
  return (
    <div className="container mt-3 col-6">
      <div className="col">
        {loading 
        ? <h1>Loading...<Spin /></h1>
        : <h1>Create Product</h1>
        }
        <form method="post" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              value={values.title}
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              className="form-control"
              value={values.description}
              name="description"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              className="form-control"
              value={values.price}
              name="price"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              className="form-control"
              value={values.quantity}
              name="quantity"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Category</label>
            <select
              name="category"
              className="form-control"
              onChange={handleChange}
            >
              <option value="0">Please Select</option>
              {values.categories.length > 0 &&
                values.categories.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <FileUpload values={values}
           setValues={setValues} 
           loading={loading}
           setLoading={setLoading}/>
          <button type="submit" className="btn btn-success mt-3 form-control">
            Add New Product
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default CreateProduct;
