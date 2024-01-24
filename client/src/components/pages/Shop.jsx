import React, { useEffect, useState } from "react";
import { listProduct, searchFilters } from "../function/product";
import ProductCard from "../card/ProductCard";
import { useSelector } from "react-redux";
import { Slider, Switch, Checkbox  } from 'antd';
import { listCategory } from "../function/category";


const Shop = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price,setPrice] = useState([0,0])
  const [ok,setOk] = useState(false);
  const [category,SetCategory] = useState([])
  const [categorySelect,setCategorySelect] = useState([])
  const search = useSelector((state) => state.search.text);
  const { text } = search;

  //load search data
  useEffect(() => {
    loadData();
    listCategory()
    .then((res)=>{
      SetCategory(res.data)
    }).catch((err)=>{
      console.log(err);
    })
  }, []);

  const loadData = () => {
    setLoading(true);
    listProduct(12)
      .then((res) => {
        setLoading(false);
        setProduct(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  //load search name
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchDataFilter({ query: text });
    },300);
    return ()=> clearTimeout(delay)
  }, [text]);

  // Filter
  const fetchDataFilter = (arg) => {
    searchFilters(arg)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //load search price
  useEffect(() => {
    if (price[0] === 0 && price[1] === 0) {
      loadData();
    } else {
      fetchDataFilter({ price });
    }
  }, [ok]);
  
  const handlePrice = (value) => {
    setPrice(value)

    setTimeout(()=>{
        setOk(!ok)
    },300)
  }

  const handleCheck = (e) => {
    //ค่าปัจจุบัน
    let inCheck = e.target.value
    //ค่าเดิม
    let inState = [...categorySelect]

    let findCheck = inState.indexOf(inCheck)

    if(findCheck === -1){
      inState.push(inCheck)
    }else{
      inState.splice(findCheck,1)
    }
    setCategorySelect(inState)
    fetchDataFilter({ category:inState }) //[0,0]
    if(inState.length< 1){
      loadData()
    }
  }

  return (
    <>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-md-3">
            Filter / Search
            <hr/>
            <h4>ค้นหาด้วยราคาสินค้า</h4>
            <Slider value={price} onChange={handlePrice} range max={100000}/>
            <hr/>
            <h4>ค้นหาตามหมวดหมู่</h4>
            {category.map((item,index)=>
            <Checkbox 
            key={index} 
            value={item._id}
            onChange={handleCheck}
            >{item.name}
            </Checkbox>
            )}
          </div>
          <div className="col-md-9">
            {loading ? (
              <h4 className="text-danger">Loading...</h4>
            ) : (
              <h4 style={{ color: "#435334" }}>Product</h4>
            )}
            {product.length < 1 && <p>No Product fond</p>}
            <div className="row pb-5">
              {product.map((item, index) => (
                <div key={index} className="col-md-4 mt-3">
                  <ProductCard product={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
