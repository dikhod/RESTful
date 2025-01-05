const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));// override with POST having ?_method=PATCH
let comments =[
    {
        id:1,
        user:"kaif",
        text:"hello there!"
    },
    {
        id:2,
        user:"Random",
        text:"hello from random!"
    },
    {
        id:3,
        user:"No-One",
        text:"hello from No-One!"
    },
    
];

//Get list of all comments
app.get('/comments',(req,res)=>{
     res.render('index',{comments});
})

//Render the form on this Url to add new comment
app.get('/comments/new',(req,res)=>{
    res.render('new');
})

//Add new comment
app.post('/comments',(req,res)=>{
    console.log(req.body);
    const {user,text}=req.body;
    comments.push({id:comments.length+1, user:user,text:text});
    res.redirect('/comments')
})

//to show particular comment 
app.get('/comments/:commentId',(req,res)=>{
    const {commentId} = req.params;
    const comment = comments.find((comment)=>comment.id == commentId);
    res.render('show',{comment});
})

//To get prefilled form for edit
app.get('/comments/:commentId/edit',(req,res)=>{
    const {commentId}=req.params;
    const comment = comments.find((comment)=>comment.id==commentId)
    res.render('edit',{comment});
})

//Patch method for editing the form using method-override
app.patch('/comments/:commentId',(req,res)=>{
   const {commentId}=req.params;
   const comment=comments.find((cmt)=>cmt.id==commentId);
   comment.user=req.body.user;
   comment.text=req.body.text;
   res.redirect('/comments');
})

//delete method for deleting particular comment
app.delete('/comments/:commentId',(req,res)=>{
    const {commentId}=req.params;
    comments=comments.filter((cmt)=>cmt.id!=commentId);
    res.redirect('/comments');
})
app.listen(3000,()=>{
    console.log('hello chacha server start ho gya hai...');
})