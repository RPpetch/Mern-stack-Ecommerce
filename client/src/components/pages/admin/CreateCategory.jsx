import React, { useEffect, useState } from "react";
import {
  addCategory,
  listCategory,
  deleteCategory,
  changeNameCategory,
} from "../../function/category";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreateCategory = () => {
  const user = useSelector((state) => state.user);
  const [value, setValue] = useState({
    name: "",
  });
  const [newName, setNewName] = useState({
    id: "",
    name: "",
  });
  const [category, setCategory] = useState([]);

  useEffect(() => {
    loadData(user.token);
  }, []);

  const loadData = (authtoken) => {
    listCategory(authtoken)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInput = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCategory(user.token, value)
      .then((res) => {
        setCategory([...category, res.data]);
        setValue({
          name: "",
        });
        toast.success("Add Category Success: " + res.data.name);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error Create Category")
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete ?")) {
      console.log(id);
      deleteCategory(user.token, id)
        .then((res) => {
          loadData(user.token);
          toast.success("Delete Success");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Cannot Delete this user");
        });
    } else {
      toast.error("Cancel Delete");
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChangeName = (e) => {
    setNewName({ ...newName, [e.target.name]: e.target.value });
  };

  const showModal = (id) => {
    setIsModalOpen(true);
    setNewName({ ...value, id: id });
  };

  const handleOk = () => {
    setIsModalOpen(false);
    changeNameCategory(user.token, newName.id, { newName })
      .then((res) => {
        loadData(user.token);
        setNewName({
          id: "",
          name: "",
        });
        toast.success("Update Success: " + newName.name);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Cannot Update");
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mt-3 col-6">
      <div className="col">
        <h1>Create Category</h1>
        <form method="post" className="from-group" onSubmit={handleSubmit}>
          <label>New Category</label>
          <input
            type="text"
            className="form-control"
            value={value.name}
            name="name"
            onChange={handleInput}
          />
          <button
            className="mt-3 btn btn-outline-primary form-control"
            type="submit"
          >
            Add New Category
          </button>
        </form>
        <hr />
        <div>
          <ul className="list-group">
            {category.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {item.name}
                <span>
                  <i
                    onClick={() => showModal(item._id)}
                    className="fa-solid fa-pen-to-square"
                    style={{
                      cursor: "pointer",
                      color: "blue",
                      marginRight: "20px",
                    }}
                  ></i>
                  <i
                    className="fa-solid fa-trash"
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => handleDelete(item._id)}
                  ></i>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <Modal
          title="Change Category Name "
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="form-group">
            <p>Name:</p>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={handleChangeName}
            />
          </div>
        </Modal>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateCategory;
