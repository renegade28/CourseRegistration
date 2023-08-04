

function submitForm() {

   

    var selectedRows = [];
    var credits = [];
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
    
    for (var i = 0; i < checkboxes.length; i++) {
      var checkbox = checkboxes[i];
      var rowId = checkbox.id;//getting the names
      var credit=checkbox.className
      selectedRows.push(rowId);
      credits.push(credit);
    }
    sessionStorage.setItem("selected", selectedRows);



    console.log(selectedRows);
    console.log(credits);
    var roll=document.getElementById('roll').innerText;
    var depty=document.getElementById('dept').className;
    console.log(dept);
    var result=roll.replace(/[^0-9]/g, "")
    var request = {
      url: `http://localhost:3000/api/document`,
      method: 'POST',
      data:JSON.stringify({array:selectedRows,roll:result,dpet:depty}),
      contentType:'application/json'
  }
  
  if(confirm("Want to Print Out the PDF?")){
      $.ajax(request).done(function(response){

          window.location.href='/pdfdownload'
        
          
        
      })
      
      
      
  }

  

//calling the second api


  







  }

  if(window.location.pathname=="/document"){

    var courses=sessionStorage.getItem('selected');
    console.log(courses);




    
  }