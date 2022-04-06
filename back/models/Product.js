const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
    id_User : {
        type: Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    name : {
        type : String,
        max : 255 ,
        required : true
    },
   
    productImage : {
        type : String,
      //  required:true
    },
    quantity : {
        type : String,
    },
    price :{
        type:String,
        required:true
    },


});

module.exports = mongoose.model('Product',productSchema);