

$("#update_slot").submit(function(event){
    event.stopImmediatePropagation();
    event.preventDefault();
    var unindexed_array = $(this).serializeArray();
    var data = {}
    console.log("entering the function")
    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })
   //console.log(data);

       var request = {
        "url" : `http://localhost:3000/api/registration`,
        "method" : "POST",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Student Registered Successfully!");
        

    })
})

if(window.location.pathname=="/admin"){
    $ondelete=$(".table tbody td a.delete");
    $ondelete.click(function(){
        var id=$(this).attr("data-id")


        
       var request = {
        "url" : `http://localhost:3000/api/slots/${id}`,
        "method" : "DELETE"
    }

    if(confirm("Want to Delete the slot")){
        $.ajax(request).done(function(response){
            alert("Slot is removed succesfully")
            location.reload();
        })
    }

    })
}

if(window.location.pathname=="/gateman"){
    $ondelete=$(".table tbody td a.delete");
    $ondelete.click(function(){
        var id=$(this).attr("data-id")

        const d = new Date();
        var h=d.getHours();
        var m=d.getMinutes();
        console.log(h*24+m);
        var time=h*24+m


        
       var request = {
        "url" : `http://localhost:3000/api/rent/${id}&${time}`,
        "method" : "PUT"
    }

    if(confirm("Want to start renting?")){
        $.ajax(request).done(function(response){
            alert("Slot is Rented Sucessfully")
            location.reload();
        })
    }

    })
}
if(window.location.pathname=="/gateman"){
    $ondelete=$(".table tbody td a.stoprent");
    $ondelete.click(function(){
        var id=$(this).attr("data-id")

        const d = new Date();
        var h=d.getHours();
        var m=d.getMinutes();
        console.log(h*24+m);
        var time=h*24+m


        
       var request = {
        "url" : `http://localhost:3000/api/stoprent/${id}&${time}`,
        "method" : "GET"
       
    }

    if(confirm("Want to stop renting?")){
        $.ajax(request).done(function(response){
            alert("Slot is ended Sucessfully")
            
        })
    }

    })
}