/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
// import MenubarAdmin from "../../layouts/MenubarAdmin";
import { useSelector } from "react-redux";
import {
  listUser,
  changeStatus,
  changeRole,
  deleteUser,
  resetPassword,
} from "../../function/user";
import { Switch, Select, Tag, Modal } from "antd";
import moment from 'moment/min/moment-with-locales';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageAdmin = () => {
  //ข้อมูลทั้งหมด
  const [data, setData] = useState([]);
  //ข้อมูลที่ค้นหา
  const [selectData, setSelectData] = useState([]);
  //ข้อมูลใน Role dropdown 
  const [ dropdown,setDropdown] = useState([])
  const user = useSelector((state) => state.user);
  const [values, setValues] = useState({
    id: "",
    password: "",
  });
  const token = localStorage.getItem('token');
  useEffect(() => {
    loadData(token);
  }, []);

  const loadData = (authtoken) => {
    listUser(authtoken)
      .then((res) => {
        setData(res.data);
        setSelectData(res.data);
        //เพิ่ม role ใน dropdown
        const dataDropdown = [...new Set(res.data.map(item=>item.role))] 
        setDropdown(dataDropdown)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOnChange = (e, id) => {
    const value = {
      id: id,
      enabled: e,
    };
    changeStatus(token, value)
      .then((res) => {
        setSelectData((prevData) => {
          const updatedData = prevData.map((item) =>
            item._id === id ? { ...item, enabled: e } : item
          );
          return updatedData;
        });
        toast.success("Updated "+ res.data.username + ": " +e);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  const roleData = ["admin", "user"];

  const handleOnChangeRole = (e, id) => {
    const value = {
      id: id,
      role: e,
    };
    changeRole(token, value)
      .then((res) => {
        setSelectData((prevData) =>
          prevData.map((item) =>
            item._id === id ? { ...item, role: e } : item
          )
        );
        toast.success("Updated " + res.data.username + ": " + e);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Cannot Change Role");
      });
  };
  

  const handleDelete = (id) => {
    if (window.confirm("Delete ?")) {
      console.log(id);
      deleteUser(token, id)
        .then((res) => {
          loadData(token);
          toast.success("Delete User Success");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Cannot Delete user");
        });
    } else {
      toast.error("Cancel Delete user");
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (id) => {
    setIsModalOpen(true);
    setValues({ ...values, id: id });
  };
  const handleOk = () => {
    setIsModalOpen(false);
    resetPassword(token, values.id, { values })
      .then((res) => {
        toast.success("Update Password Success");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Cannot Update Password");
      });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangePassword = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSelectRole = (e) => {
    const role = e.target.value
    if(role == 'all'){
      setSelectData(data);
    }else{
      const filterData = data.filter((item,index)=>{
        return item.role == role
      })
     setSelectData(filterData)
    }

  }
  return (
    <div className="container mt-3 col-10">
      <div className="row">
        <div className="col">
          <br />
          <h1>ManageAdmin</h1>
          <br />
          <select onChange={(e)=>handleSelectRole(e)} >
            <option value="all">all</option>
            {dropdown.map((item,index)=>
                <option key={index} value={item}>{item}</option>
            )}
          </select>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">username</th>
                <th scope="col">role</th>
                <th scope="col">status</th>
                <th scope="col">created</th>
                <th scope="col">updated</th>
                <th scope="col">edit</th>
                <th scope="col">delete</th>
              </tr>
            </thead>
            <tbody>
              {selectData.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{item.username}</th>
                  <td>
                    <Select
                      value={item.role}
                      style={{ width: "100%" }}
                      onChange={(e) => handleOnChangeRole(e, item._id)}
                    >
                      {roleData.map((role, index) => (
                        <Select.Option value={role} key={index}>
                          {role === "admin" ? (
                            <Tag color="green">{role}</Tag>
                          ) : (
                            <Tag color="blue">{role}</Tag>
                          )}
                        </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                    <Switch
                      checked={item.enabled}
                      onChange={(e) => handleOnChange(e, item._id)}
                    ></Switch>
                  </td>
                  <td>{moment(item.createdAt).locale("th").format("LL")}</td>
                  <td>{moment(item.updatedAt).startOf("hour").locale("th").fromNow()}</td>
                  <td>
                    <EditOutlined onClick={() => showModal(item._id)} />
                  </td>
                  <td>
                    <DeleteOutlined onClick={() => handleDelete(item._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Modal
            title="Edit Password"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <div className="form-group">
              <p>New Password:</p>
              <input
                className="form-control"
                type="password"
                name="password"
                onChange={handleChangePassword}
              />
            </div>
          </Modal>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ManageAdmin;
