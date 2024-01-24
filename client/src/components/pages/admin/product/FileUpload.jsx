import React from "react";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";
import axios from "axios";
import { Avatar, Badge, Space } from "antd";

const FileUpload = ({ values, setValues,loading,setLoading }) => {
  const user = useSelector((state) => state.user);

  const handleDelete = (public_id) =>{
    setLoading(true)
    const {images} =values
    axios
    .post(
      "http://localhost:8888/api/deleteImages",
      {
       public_id
      },
      {
        headers: {
          authtoken: user.token,
        },
      }
    ).then(res=>{
        setLoading(false)
        let filterImages = images.filter(item=>{
            return item.public_id !== public_id
        })
        setValues({...values,images:filterImages})
    }).catch(err=>{
        setLoading(false)
        console.log(err)
    })
  }

  const handleChangeFile = (e) => {
    const files = e.target.files;
    if (files) {
        setLoading(true)
      let allFileUpload = values.images;
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                "http://localhost:8888/api/images",
                {
                  image: uri,
                },
                {
                  headers: {
                    authtoken: user.token,
                  },
                }
              )
              .then((res) => {
                setLoading(false)
                allFileUpload.push(res.data);
                setValues({ ...values, images: allFileUpload });
              })
              .catch((err) => {
                setLoading(false)
                console.log(err);
              });
          },
          "base64"
        );
      }
    }
  };
  return (
    <>
      {values.images &&
        values.images.map((img) => (
          <Space className="mt-2" key={img.public_id} size={24}>
            <Badge count="X" style={{cursor:"pointer"}} onClick={()=>handleDelete(img.public_id)} >
              <Avatar className="m-3" src={img.url} shape="square" size={120} />
            </Badge>
          </Space>
        ))}
      <div className="form-group mt-2">
        <label>Choose File</label>
        <input
          type="file"
          className="form-control"
          name="file"
          multiple
          accept="images/*"
          onChange={handleChangeFile}
        />
      </div>
    </>
  );
};

export default FileUpload;
