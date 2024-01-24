const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema(
    {
        name:{
            type:String
        },
    },
    { timestamps: true }
);

module.exports = Category = mongoose.model("category",CategorySchema)