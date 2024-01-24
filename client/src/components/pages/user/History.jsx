import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../function/user";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import Invoice from "../../order/invoice";

const History = () => {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getOrders(user.token).then((res) => setOrders(res.data));
  };
  return (
    <div>
      <div className="text-center">
        <h1 className="text-center p-3 mt-5 mb-2 display-4 jumboton">
          History Page
        </h1>
        {orders.map((item, index) => {
          return (
            <div key={index} className="card m-3">
              <p>Order {"  " + item.orderStataus}</p>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <td>Title</td>
                    <td>Price</td>
                    <td>Count</td>
                  </tr>
                </thead>
                {item.products.map((p, i) => (
                  <tr key={i}>
                    <td>{p.product.title}</td>
                    <td>{p.product.price}</td>
                    <td>{p.count}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3}>ราคาสุทธิ: {item.cartTotal}</td>
                </tr>
              </table>
              <div className="row">
                <div className="col">
                  <PDFDownloadLink
                    document={
                    <Invoice order={item}/>
                    }
                    fileName="invoice.pdf"
                    className="btn btn-primary  mb-3"
                  >
                    PDF Download
                  </PDFDownloadLink>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;
