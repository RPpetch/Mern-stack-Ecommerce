import React from "react";
import {Link} from 'react-router-dom'
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { Meta } = Card;

const AdminProductCard = ({ product,handleRemove,handleUpdate }) => {
  const { _id,title, description, images } = product;
  
  return (
    <div>
      <Card
        hoverable
        cover={<img 
            alt="example" 
            className="p-1"
            style={{height:"170px",objectFit:"cover"}}
            src={images && images.length 
            ? images[0].url
            : ""
            }
            />}
            actions={[
              <Link key={_id} to={"/admin/update-product/"+_id}>
              <EditOutlined key="edit" className="text-warning" onClick={()=> handleUpdate(_id)} />
              </Link>,
              <DeleteOutlined  key="delete" className="text-danger" onClick={()=> handleRemove(_id)}/>
            ]}
        >
        <Meta title={title} description={description} />
      </Card>
    </div>
  );
};

export default AdminProductCard;
