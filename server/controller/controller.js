var Slotdb=require('../model/model');
const axios=require('axios');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var Coursedb=require('../model/coursemodel');
var registrationdb = require('../model/registrationmodel');
var selecteddb = require('../model/selectedmodel');
const fs = require('fs');
const bodyparser=require('body-parser');
const puppeteer=require('puppeteer');
const path=require('path')
const SSLCommerzPayment = require('sslcommerz-lts')
const url = require('url');  




exports.create= (req,res)=>{
    //validate request
   
    console.log("The api is calling")
   
    if(!req.body){
       res.status(400).send({message:"content cant be empty"});
       return;
    }
    let body  = req.body
    let hash = bcrypt.hashSync(body.password, saltRounds);
    const slot=new Slotdb({
      name:body.name,
      roll:body.roll,
      department:body.department,
      year:body.year,
      password:hash,
      email:body.email
    })

    slot
    .save(slot)
    .then(data=>{
      const myRoll = body.roll;
      console.log('/student?roll=' + encodeURIComponent(myRoll));
   res.redirect('/student?roll=' +encodeURIComponent(myRoll));
      
    })
   
    .catch(err=>{
      console.log(err);
      res.status(500).send({
         message:err.message||"some error has been occurs in create operation"
      })
    })
   
   
   
   
   
   
   
   console.log(slot);
   
  
   
   
   }





   exports.find=(req,res)=>{
      if(req.query.id){
         const id=req.query.id;
         console.log(id);
         console.log("find APi is calling")
         Coursedb.findById({_id:id})
         .then(data=>{
            if(!data){
               res.status(404).send({message:"Not in the database"})
            }
            else{
               res.send(data)
            }
         })
   
         .catch(err=>{
            res.status(500).send({message:"error retrieving the data user id"})
         })
   
      }
      else{
      Coursedb.find().then(user=>{
         res.send(user)
      })
      .catch(err=>{
         res.status(500).send({message:err.message||"Error Occurred while retriving the data"})
      })
       
   }
   }




   //Reg details for the admin side


   exports.findRegdetail=(req,res)=>{
      if(req.query.name){
         const name=req.query.name;
         console.log(name);
         console.log("finding Registration details APi is calling")
         registrationdb.find({coursename:name})
         .then(data=>{
            if(!data){
               res.status(404).send({message:"Not in the database"})
            }
            else{
               res.send(data)
            }
         })
   
         .catch(err=>{
            res.status(500).send({message:"error retrieving the data user id"})
         })
   
      }
      else{
      registrationdb.find().then(user=>{
         res.send(user)
      })
      .catch(err=>{
         res.status(500).send({message:err.message||"Error Occurred while retriving the data"})
      })
       
   }
   }














   //authentication  //authentication   //authentication   //authentication





   exports.auth=(req,res)=>{

    var name=req.body.name;
    console.log("The email is "+name);
    var password=req.body.password;
    console.log("api is calling in the auth");
    console.log(password);
    Slotdb.findOne({email:name}).then(user=>{
      if(user!=null){
         console.log(user);
       if(bcrypt.compareSync(password, user.password)){
          console.log("login Successful");
          //res.redirect("/student?roll="+encodeURIComponent(user.roll)+"?dept="+encodeURIComponent(user.department));

          res.redirect(url.format({
            pathname:"/student",
            query: {
               "roll": encodeURIComponent(user.roll),
               "dept":encodeURIComponent(user.department),
             }
          }));


         console.log(user.name);
       }
       else{
          res.send("Email and password didnt matched")
          
          
       }
      }
      else{
         res.send("Your email  is not registered");
      }
    })

   }




   //creating new courses by admin

   exports.coursecreate=(req,res)=>{

      console.log("The Course Creation api  is calling")
   
      if(!req.body){
         res.status(400).send({message:"content cant be empty"});
         return;
      }
      let body  = req.body
     
      const course=new Coursedb({
        name:body.name,
        title:body.title,
        semester:body.semester,
        credit:body.credit,
        department:body.department
       
      })
  
      course
      .save(course)
      .then(data=>{
        
        res.redirect("/admin");
        //res.end(data);
        
      })
     
      .catch(err=>{
        console.log(err);
        res.status(500).send({
           message:err.message||"some error has been occurs in create operation"
        })
      })
     

   }

   
//updating courses by course id
exports.update=(req,res)=>{

   console.log("Update api is calling")
 if(!req.body){
   return res.status(400).send({message:"content cant be empty"});
}

const id=req.params.id;
console.log("This is the id: ",id);
console.log("This is the Roll: " +req.body.roll);


Coursedb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
.then(data=>{
   if(!data){
      res.status(404).send({meeasge:'Can not update user with  May be user not found'})
   }
   else{
      res.send(data)
   }
})
.catch(err=>{
   res.status(500).send({message:"Error in update user information"})
})

    
}

//course Registration of the student.
exports.registration=(req,res)=>{
   console.log("Registration api is calling");


   

   if(!req.body){
      res.status(400).send({message:"content cant be empty"});
      return;
   }
   console.log("Registration api is calling");
   let body  = req.body
   let verify=body.name+body.roll+"";
   
   console.log(body);
   const reg=new registrationdb({
   coursename:body.name,
   roll:body.roll,
   regstr:verify,
   })

   reg
   .save(reg)
   .then(data=>{
     res.send(data)
  //res.redirect("/");
     
   })
  
   .catch(err=>{
     console.log(err);
     res.status(500).send({
        message:err.message||"some error has been occurs in create operation"
     })
   })
  
  
  
  
}

exports.selectedCourses=(req,res)=>{

   console.log('The api calling for selecting the courses')

   let data=req.body.array;
   let roll=req.body.roll;
   console.log(data);
   console.log(roll);
   console.log(data[0]);
   



   selecteddb.findOne({ value: 'temp' }, function(err, user) {
      if (err) {
        console.log(err);
      } else {
        // Update the user's name
        user.courses = data;
    
        // Save the updated user object
        user.save(function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log('Courses updated successfully!');
          }
        });
      }
    });




    for(var i=0;i<data.length;i++){
      let verify=data[i]+roll+"";
      console.log(verify);

      const reg=new registrationdb({
         coursename:data[i],
         roll:roll,
         regstr:verify,
         })
      
         reg
         .save(reg)
         .then(data=>{
            console.log("The saved data is :"+data);
           
         })
        
         .catch(err=>{
           console.log(err);
           res.status(500).send({
              message:err.message||"some error has been occurs in create operation"
           })
         })


    }

    res.redirect(url.format({
      pathname:"/pdfdownload",
      query: {
         "roll": encodeURIComponent(req.body.roll),
       }
    }));



}






exports.findCourses=(req,res)=>{




   selecteddb.findOne({ value: 'temp' }, function(err, user) {
      if (err) {
        console.log(err);
      } else {
        // Update the user's name
        console.log("Find Courses:"+user.courses);
        Coursedb.find({name:user.courses}).then(courses=>{
         console.log(courses);
         res.send(courses)
      })
      .catch(err=>{
         res.status(500).send({message:err.message||"Error Occurred while retriving the data"})
      })
        //res.send(user);
      }
    });


}














exports.generatePdf=async (req,res)=>{


console.log('Pdf generating....')

   try {
      const browser=await puppeteer.launch({ headless:false});
      const page=await browser.newPage();
      await page.goto(`${req.protocol}://${req.get('host')}`+"/pdfdownload",{
         waitUntil:"networkidle2"

      });
      await page.setViewport({width:1580,height:1050});
      const todayDate=new Date();

      const pdfn=await page.pdf({
         path:`${path.join(__dirname,'../document',todayDate.getTime()+".pdf")}`,
         format:"A4"
      });
      await browser.close(); 
     

      
      

      const pdfURL=path.join(__dirname,'../document',todayDate.getTime()+".pdf");


      res.download(pdfURL,function(error){
         if(error){
            console.log("The error is "+error)
         }
      })

     


      

      
      

      
      
   } 
   
   catch (error) {
      console.log(error);
      
   }
   


}



//payment gateway api controllers



exports.paymentInitialization=async(req,res)=>{


   const data = {
      total_amount: 100,
      currency: 'BDT',
      tran_id: 'REF123', // use unique tran_id for each api call
      success_url: 'http://localhost:3000/success',
      fail_url: 'http://localhost:3000/fail',
      cancel_url: 'http://localhost:3000/cancel',
      ipn_url: 'http://localhost:3000/ipn',
      shipping_method: 'Courier',
      product_name: 'Computer.',
      product_category: 'Electronic',
      product_profile: 'general',
      cus_name: 'Customer Name',
      cus_email: 'customer@example.com',
      cus_add1: 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
      cus_fax: '01711111111',
      ship_name: 'Customer Name',
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
  };
  const sslcz = new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASS, false)
  sslcz.init(data).then(apiResponse => {
      // Redirect the user to payment gateway
      let GatewayPageURL = apiResponse.GatewayPageURL
      if(GatewayPageURL){
         res.redirect(GatewayPageURL)
         console.log('Redirecting to: ', GatewayPageURL)

      }
      else{
         return res.status(400).json({
            message:"SSL session was not succesful"
         })
      }
     
  });

   
}
   





exports.paymentSuccess=async(req,res)=>{

res.status(200).json({
   data:req.body
})
   
}





 exports.paymentFailure=async(req,res)=>{

      res.status(200).json({
         data:req.body
      })
         
      }



  exports.paymentCancel=async(req,res)=>{

         res.status(200).json({
            data:req.body
         })
            
         }


   

 exports.paymentIpn=async(req,res)=>{

            res.status(200).json({
            data:req.body
            })
               
            }