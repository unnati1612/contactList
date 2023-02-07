const mongoose=require('mongoose');

const contactSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    }    
});
//name of collection in db
const Contacts=mongoose.model('Contacts',contactSchema);

module.exports= Contacts;