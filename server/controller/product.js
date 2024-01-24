const { query } = require('express');
const Product = require('../models/Product');
const { param } = require('../routes/product');

exports.create = async(req,res) => {
    try{
        const model = {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            quantity: req.body.quantity,
            images: req.body.images,
        }
        const product = await new Product(model).save()
        res.send(product);
    }catch(err){
        res.status(500).send('Create Product Error')

    }
}

exports.list = async(req,res) =>{
    try{
        const count = parseInt(req.params.count)

        const product = await Product
        .find()
        .limit(count)
        .populate('category')
        .sort([["createdAt","desc"]])
        res.send(product)
    }catch(err){
        res.status(500).send('Create Product Error')
    }
}

exports.remove = async(req,res) => {
    try{
        const id = req.params.id
        const product = await Product.findOneAndRemove({_id:id})
        .exec()
        res.send(product)
    }catch(err){
        res.status(500).send('Remove Product Error')
    }
}

exports.read = async(req,res)=>{
    try{
        const id = req.params.id
        const product = await Product.findOne({_id:id})
        .populate('category')
        .exec()
        res.send(product)
    }catch(err){
        res.status(500).send('Read Product Error')
    }
}

exports.update = async(req,res)=>{
    try{
        const id = req.params.id
        const product = await Product.findOneAndUpdate({_id:id},req.body,{new:true})
        .exec()
        res.send(product)
    }catch(err){
        res.status(500).send('Remove Product Error');
    }
}


exports.listBy = async(req,res) =>{
    try{

        const {sort,order,limit} = req.body

        const product = await Product
        .find()
        .limit(limit)
        .populate('category')
        .sort([[sort,order]])
        res.send(product)
    }catch(err){
        res.status(500).send('List Product Error')

    }
}

const handleQuery = async (req, res, query) => {
    try {
      let products;
  
      if (query !== undefined && query !== null) {
        if (query === '') {
          products = await Product.find().populate('category');
        } else {
          products = await Product.find({
            $or: [
              { title: { $regex: `${query}`, $options: 'i' } },
              { description: { $regex: `${query}`, $options: 'i' } },
              { 'category.name': { $regex: `${query}`, $options: 'i' } },
            ],
          }).populate('category');
        }
      } else {
        products = await Product.find().populate('category');
      }
  
      res.send(products);
      
    } catch (error) {
      console.error(error);
      res.status(500).send("Error Search Product");
    }
  };

  const handlePrice = async (req, res, price) => {
    try {
      let products;
      products = await Product.find({
        price: {
          $gte: price[0],
          $lte: price[1]
        }
      }).populate("category", "_id name");
      res.send(products);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error Search Product");
    }
  };
  
  const handleCategory = async(req,res,category) => {
    let product = await Product.find({category})
    .populate("category","_id name")
    res.send(product)
  }

  exports.searchFilters = async (req, res) => {
    const { query,price,category } = req.body;
    if (query !== undefined && query !== null) {
      await handleQuery(req, res, query);
    } 
    //price[0,200]
    else if (price !== undefined) {
        await handlePrice(req, res, price);
      }
      //[_id,_id]
    else if(category !== undefined){
        await handleCategory(req,res,category)
    }
    else {
      res.status(400).send("Error Search Product");
    }
  };
  

  
  