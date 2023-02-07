const express= require('express');
const path= require('path');
// const { nextTick } = require('process');
const port=8000;



const db=require('./config/mongoose.js')
const Contacts=require('./model/contact.js')
const app=express();

app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname,'assets')));

// app.use(function(req,res,next){
//     req.myname='una';
//     console.log('middleware 1 is working');
//             // next();   if it is not called page will cocntinue loading and get stuck 
// })
// app.use(function(req,res,next){
//     console.log(req.myname);
//     console.log('middleware 2 is working');
//             next();

// })

var contactList=[
    {
        name:"Unnati Jain",
        contact: "8595301020"
    },
    {
        name:"Manya Garg",
        contact: "9864456788"
    },
    {
        name:"Navdeep Kaur",
        contact: "8595301045"
    }

];
//CONTROLLERS ARE CALLBACKS HERE
app.get('/',function(req,res){
    // console.log(__dirname);
    // res.send('Cool it is woring!');
    Contacts.find({},function(err,contacts){
        if(err){
        console.log('error finding contacts');
        return;
        }
        return res.render('home',{
            title:"My Contacts List",
             contact_list:contacts
         });
    })
   
});

// app.get('/practice',function(req,res){
//     return res.render('practice',{title:"Let us play with ejs"});
// })

// app.get('/deleteContact/:contact',function(req,res){
// console.log(req.params);
// let phone=req.params.contact;
// })
// app.get('/deleteContact/',function(req,res){
//     console.log(req.query);
//     let phone=req.query.contact;

//     let contactindex=contactList.findIndex(contact=>contact.contact===phone);
//     if(contactindex!=-1)
//     contactList.splice(contactindex,1);

//     return res.redirect('back');
//     })

    app.get('/deleteContact/',function(req,res){
        let id=req.query.id;
    
        Contacts.findByIdAndDelete(id,function(err){
                if(err)
                {
                    console.log('error in deleting');
                    return;
                }
                return res.redirect('back');

        })
    
        })

app.post('/createcontact',function(req,res){
    // return res.redirect('/practice');
    // console.log(req.body);
    // contactList.push({
    //     name: req.body.name,
    //     contact:req.body.contact
    // });

    // or contactList.push(req.body);
    Contacts.create({
        name:req.body.name,
        contact:req.body.contact
    },function(err,newContact){
        if(err){
        console.log('error in creating new contact')
        return;
        }
        console.log('****',newContact);
     return res.redirect('/');

    })

    //or return res.redirect('back');
})


app.listen(port,function(err){
    if(err)
    console.log('Error in running server!',err);

    console.log('my express server is woring');
});