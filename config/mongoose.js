
//require the library
const mongoose=require('mongoose');

//connext to database
mongoose.connect('mongodb://127.0.0.1/contact_list_db');

//acquire the connection(to see if it is successful)
const db= mongoose.connection;

//error
db.on('error',console.error.bind(console,'error connexting to db'));


//if it is up and running
db.once('open',function(){
    console.log('successfully connected to database');
})
