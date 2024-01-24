const express = require("express");
const router = express.Router();

const {
  listUser,
  changeStatus,
  changeRole,
  deleteUser,
  resetPassword,
  userCart,
  getUserCart,
  saveAddress,
  saveOrder,
  emptyCart,
  addToWishList,
  getWishList,
  removeWishList,
  getOrder
} = require("../controller/user");
const { auth, adminCheck } = require("../middleware/auth");

//ListUser
//EndPoint http://localhost:8888/api/users
//Method GET
router.get("/users", auth, adminCheck, listUser);

//ChangeStatus
//EndPoint http://localhost:8888/api/changeStatus
//Method POST
router.post("/change-status", auth, adminCheck, changeStatus);

//ChangerRole
//EndPoint http://localhost:8888/api/changeRole
//Method POST
router.post("/change-role", auth, adminCheck, changeRole);

//ResetPassword
//EndPoint http://localhost:8888/api/users/:id
//Method PUT
router.put("/users/:id", auth, adminCheck, resetPassword);

//DeletePassword
//EndPoint http://localhost:8888/api/users/:id
//Method PUT
router.delete("/users/:id", auth, adminCheck, deleteUser);

//UserCart
//EndPoint http://localhost:8888/api/users/:id
router.get("/user/cart", auth, getUserCart);
router.post("/user/cart", auth, userCart);
router.delete("/user/cart", auth, emptyCart);

//SaveAddress
//EndPoint http://localhost:8888/api/address
router.post("/user/address", auth, saveAddress);


//SaveOrder
//EndPoint http://localhost:8888/api/order
router.post("/user/order", auth, saveOrder);
router.get("/user/orders",auth,getOrder)
//Wishlist
//EndPoint http://localhost:8888/api/user/wishlist
router.post("/user/wishlist",auth,addToWishList);
router.get("/user/wishlist",auth,getWishList);
router.put("/user/wishlist/:productId",auth,removeWishList);

module.exports = router;
