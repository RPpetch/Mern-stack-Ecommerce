const bcrypt = require("bcrypt");

//Model
const User = require("../models/Account");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

//เเสดง user ทั้งหมด
exports.listUser = async (req, res) => {
  try {
    //code
    const user = await User.find({}).select("-password").exec();
    res.send(user);
  } catch (err) {
    res.status(401).send("Server Error");
  }
};

//เช็คสิทธิการเข้าถึง page ต่างๆ
exports.currentUser = async (req, res) => {
  try {
    //model User
    const user = await User.findOne({ username: req.user.username })
      .select("-password")
      .exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

//เปลี่ยน status ของ user
exports.changeStatus = async (req, res) => {
  try {
    const { id, enabled } = req.body;
    const user = await User.findOneAndUpdate({ _id: id }, { enabled: enabled });
    res.send(user);
  } catch (err) {
    res.status(401).send("Server Error");
  }
};

//เปลี่ยน Role ของ user
exports.changeRole = async (req, res) => {
  try {
    const { id, role } = req.body;
    const user = await User.findOneAndUpdate({ _id: id }, { role: role });
    res.send(user);
  } catch (err) {
    res.status(401).send("Server Error");
  }
};

//เปลี่ยน Password ของ user
exports.resetPassword = async (req, res) => {
  try {
    var { id, password } = req.body.values;
    const salt = await bcrypt.genSalt(10);
    var enpassword = await bcrypt.hash(password, salt);
    const user = await User.findOneAndUpdate(
      { _id: id },
      { password: enpassword }
    );
    res.send(user);
  } catch (err) {
    res.status(401).send("Server Error");
  }
};

//ลบ user
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOneAndRemove({ _id: id });
    res.send(user);
  } catch (err) {
    res.status(401).send("Server Error");
  }
};

exports.userCart = async (req, res) => {
  try {
    const cart = req.body;
    //check user
    let user = await User.findOne({ username: req.user.username }).exec();

    //สร้าง array
    let products = [];

    //check ตะกร้าสินค้า
    let cartOld = await Cart.findOne({ orderBy: user._id }).exec();
    if (cartOld) {
      cartOld.deleteOne();
    }
    //เเต่งสินค้า
    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.price = cart[i].price;
      products.push(object);
    }
    //หาผลรวมของตะกล้า
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }

    let newCart = await new Cart({
      products,
      cartTotal,
      orderBy: user._id,
    }).save();
    res.send("order ok");
  } catch (err) {
    console.log(err);
    res.status(401).send("Server Error");
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();

    let cart = await Cart.findOne({ orderBy: user._id })
      .populate("products.product", "_id title price")
      .exec();

    const { products, cartTotal } = cart;
    res.json({ products, cartTotal });
  } catch (err) {
    console.log(err);
    res.status(401).send("Server Error");
  }
};

exports.emptyCart = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();

    const empty = await Cart.findOneAndRemove({orderBy:user._id}).exec()
    res.send(empty);
  } catch (err) {
    console.log(err);
    res.status(401).send("Server Error");
  }
};

exports.saveAddress = async (req, res) => {
  try {
    const userAddress = await User.findOneAndUpdate(
      { username: req.user.username },
      { address: req.body.address }
    ).exec();
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.status(401).send("Server Error");
  }
};

exports.saveOrder = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.user.username }).exec();
    let userCart = await Cart.findOne({orderBy:user._id}).exec()

    let order = await new Order({
      products:userCart.products,
      orderBy: user._id,
      cartTotal:userCart.cartTotal
    }).save()

    // + - products

    let bulkOption = userCart.products.map((item)=>{
      return {
        updateOne:{
          filter:{_id:item.product._id},
          update:{ $inc:{quantity : -item.count,sold: +item.count}}
        }
      }
    })

    let updated = await Product.bulkWrite(bulkOption,{})

    res.send(updated)
  } catch (err) {
    console.log(err);
    res.status(401).send('order error')
  }
};


exports.getOrder = async(req,res) => {
  try{
    const user = await User.findOne({ username: req.user.username }).exec();

    let order = await Order.find({orderBy:user._id})
    .populate("products.product")
    .exec()

    res.json(order)
  }catch(err){
    res.status(401).send('GET Order Error')
  }
}

exports.addToWishList = async(req,res) => {
  try{
    const {productId} = req.body
    let user = await User.findOneAndUpdate(
      {username:req.user.username},
      {$addToSet:{wishlist:productId}}).exec()
    res.send(user)
  }catch(err){
    res.status(401).send('Add Wishlist Error')
  }
};

exports.getWishList = async(req,res) => {
  try{
    let list = await User.findOne({username:req.user.username})
              .select('wishlist')
              .populate('wishlist')
              .exec()

              res.json(list)
  }catch(err){
    res.status(401).send('GET Wishlist Error')
  }
};

exports.removeWishList = async(req,res) => {
  try{
  const {productId} = req.params
  let user = await User.findOneAndUpdate(
    {username:req.user.username},
    {$pull:{wishlist:productId}}
  ).exec()

  res.send(user)
  }catch(err){
    res.status(401).send('GET Wishlist Error')
  }
};

