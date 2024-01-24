import axios from "axios";
const REACT_APP_API = "http://localhost:8888/api";

export const listUser = async (authtoken) => {
  const users = await axios.get(REACT_APP_API + "/users", {
    headers: {
      authtoken,
    },
  });
  return users;
};

export const changeStatus = async (authtoken, value) => {
  const users = await axios.post(REACT_APP_API + "/change-status", value, {
    headers: {
      authtoken,
    },
  });
  return users;
};

export const changeRole = async (authtoken, value) => {
  const users = await axios.post(REACT_APP_API + "/change-role", value, {
    headers: {
      authtoken,
    },
  });
  return users;
};

export const deleteUser = async (authtoken, id) => {
  const users = await axios.delete(REACT_APP_API + "/users/" + id, {
    headers: {
      authtoken,
    },
  });
  return users;
};

export const resetPassword = async (authtoken, id, values) => {
  const users = await axios.put(REACT_APP_API + "/users/" + id, values, {
    headers: {
      authtoken,
    },
  });
  return users;
};

export const userCart = async (authtoken, cart) => {
  const user = await axios.post(REACT_APP_API + "/user/cart", cart, {
    headers: {
      authtoken,
    },
  });
  return user;
};

export const getUserCart = async (authtoken) => {
  const user = await axios.get(REACT_APP_API + "/user/cart", {
    headers: {
      authtoken,
    },
  });
  return user;
};

export const emptyCart = async (authtoken) => {
  const user = await axios.delete(REACT_APP_API + "/user/cart", {
    headers: {
      authtoken,
    },
  });
  return user;
};

export const saveAddress = async(authtoken,address)=>{
  const user = await axios.post(REACT_APP_API + "/user/address",{address}, {
    headers: {
      authtoken,
    },
  });
  return user;
};

export const saveOrder = async(authtoken)=>{
  const user = await axios.post(REACT_APP_API + "/user/order",{}, {
    headers: {
      authtoken,
    },
  });
  return user;
};

export const getOrders = async (authtoken) => {
  const user = await axios.get(REACT_APP_API + "/user/orders", {
    headers: {
      authtoken,
    },
  });
  return user;
};

//WishList
export const getWishList = async (authtoken) => {
  const user = await axios.get(REACT_APP_API + "/user/wishlist", {
    headers: {
      authtoken,
    },
  });
  return user;
};

export const addToWishList = async (authtoken,productId) => {
  const user = await axios.post(REACT_APP_API + "/user/wishlist",{productId} ,{
    headers: {
      authtoken,
    },
  });
  return user;
};

export const removeToWishList = async (authtoken,productId) => {
  const user = await axios.put(REACT_APP_API + "/user/wishlist/"+productId,{} ,{
    headers: {
      authtoken,
    },
  });
  return user;
};