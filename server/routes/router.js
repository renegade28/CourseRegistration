const express=require('express');
const route=express.Router();
const controller=require('../controller/controller');
const axios=require('axios');
const bodyparser=require('body-parser');





//page geter

route.get('/',(req,res)=>{
    res.render('userland.ejs')
})

route.get('/student-reg',(req,res)=>{
    res.render('registration.ejs');
})
route.get('/add-course',(req,res)=>{
    res.render('add_slot.ejs');
})


route.get('/student',(req,res)=>{

     console.log('The roll is '+req.query.roll);
     console.log('The dept is '+req.query.dept);
    //make a request to api/course
    axios.get('http://localhost:3000/api/courses')
    .then(function(response){
        console.log(response.data);
        //spotfinder page i student home page
       res.render('spotfinder.ejs',{slots:response.data,roll:req.query.roll,dept:req.query.dept});
    })
    .catch(err=>{
        res.send(err)
    })
})

route.get('/admin',(req,res)=>{

     
    //make a request to api/course
    axios.get('http://localhost:3000/api/courses')
    .then(function(response){
        console.log(response);
        console.log(response.data);
        
       res.render('index.ejs',{slots:response.data});
    })
    .catch(err=>{
        res.send(err)
    })
})





route.get('/reg-course',(req,res)=>{
    console.log("This is the course id"+req.query.id );
    axios.get('http://localhost:3000/api/courses', { params : { id : req.query.id }})
    .then(function(coursedata){
        res.render("update_slot", {slot:coursedata.data})
    })
    .catch(err =>{
        res.send(err);
    })

})

route.get('/course-details-reg',(req,res)=>{
    console.log("This is the course name :"+req.query.name );
    axios.get('http://localhost:3000/api/regdetail', { params : { name : req.query.name }})
    .then(function(regdata){
        console.log(regdata.data);
        if(regdata.data.length){
        res.render("regitdetails.ejs", { slots : regdata.data})
        }
        else{
            res.send("No Student is registered for this course");
        }
        
    
    })
    .catch(err =>{
        res.send(err);
    })

})

route.get('/pdfdownload',(req,res)=>{

    console.log('The roll is '+req.query.roll);
   
    axios.get('http://localhost:3000/api/fetchcourse')
    .then(function(response){
        console.log(response.data);
        
        if(response.data.length){
        res.render("downloadable.ejs", { slots:response.data,roll:req.query.roll})
        }
        else{
            res.send("No Selected Course Was in the database");
        }
        
    
    })
    .catch(err =>{
        res.send(err);
    })

})












//api


route.post('/api/student',controller.create)
route.get('/api/courses',controller.find)
route.put('/api/courses/:id',controller.update)

route.post('/api/login',controller.auth);
route.post('/api/createcourse',controller.coursecreate)
route.post('/api/registration',controller.registration)
route.get('/api/regdetail',controller.findRegdetail);
route.get('/api/fetchcourse',controller.findCourses);

route.post('/api/document',controller.selectedCourses);
route.get('/api/generatepdf',controller.generatePdf);





//sslcomerzpayment gateway apis


route.get('/init',controller.paymentInitialization);
route.get('/success',controller.paymentSuccess);
route.get('/fail',controller.paymentFailure);
route.get('/cancel',controller.paymentCancel);
route.get('/ipn',controller.paymentIpn);


module.exports=route