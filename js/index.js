var titel = document.getElementById("titel")
var price = document.getElementById("price")
var taxes = document.getElementById("taxes")
var ads = document.getElementById("ads")
var discount = document.getElementById("discount")
var total = document.getElementById("total")
var count = document.getElementById("count")
var category = document.getElementById("category")
var submit = document.getElementById("submit")
var mood ="create"
var tmp;
function getTotal () {

    if(price.value != "")
        {
        var result = (+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML= result
        total.style.background= "#040" ;
    }
    else{
        total.innerHTML= "";
        total.style.background= "#a00d02" ;
    }
}


var dataPro ;
if
    (localStorage.product !=null){
dataPro=JSON.parse(localStorage.product)
    }
    else{
        dataPro=[];
    }


submit.onclick=function () {
    var newPro ={
        titel:titel.value .toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(titel.value !=""&&price.value !=""&& category.value !=""
        && newPro.count<100){
if(mood ==="create"){
    if(newPro.count>1){

        for (var i = 0; i < newPro.count;i++){ dataPro.push(newPro); }
    }else{
        dataPro.push(newPro);
    }
 
}
else{
    dataPro[tmp]=newPro;
    mood="create";
    submit.innerHTML="create";
    count.style.display="block"

}
clearData()
}

localStorage.setItem("product", JSON.stringify(dataPro))

showData() 
}




function clearData() {

    titel.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    discount.value="";
    total.innerHTML="";
    count.value="";
    category.value="";
    
}

function showData() {
    getTotal()
    var table ="";
    for (var i = 0; i < dataPro.length; i++) {
        table +=`
    <tr>
    <td>${i+1}</td>
    <td>${dataPro[i].titel}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">UPDATE</button></td>
    <td><button onclick="deleteData(${i})" id="delete">DELETE</button></td>
</tr>`;
   
        
    }
    var btnDelete=document.getElementById("deleteAll");
    if(dataPro.length>0){
        btnDelete.innerHTML=` <button onclick="deleteAll()" id="delete">DELETE ALL</button>`
    }

    else{
        btnDelete.innerHTML= ""
    }

    document.getElementById("tbody").innerHTML=table;
}
showData()

function deleteData(i) {
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData()
}

function deleteAll() {
  localStorage.clear()
  dataPro.splice(0)  
  showData()
}

function updateData(i){
    titel.value = dataPro[i].titel;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal()
    count.style.display="none"
    category.value = dataPro[i].category;
    submit.innerHTML = "Update"
    mood = "update";
    tmp=i;
    scroll({
        top:0,
        behavior:"smooth"
    })
   
}

var searchMood ="titel";

function getsearchMood(id)
{
    var search =document.getElementById("search");
 if (id == "searchTitel"){
    searchMood="titel";
    ;
 }
 else{
    searchMood="category";
   
 } 
 search.Placeholder = "search by "+searchMood;
 search.focus()
 search.value =""
 showData()
  
}

function searchData(value) 
{ var table ="";
   if(searchMood == "titel");  
{
    for (let i = 0; i < dataPro.length; i++) {
        if(dataPro[i].titel.includes(value.toLowerCase())){
            table +=`
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].titel}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>`;  
        }
        
    else{
        for (let i = 0; i < dataPro.length; i++) {
            if(dataPro[i].category.includes(value.toLowerCase())){
                table +=`
                <tr>
                <td>${i}</td>
                <td>${dataPro[i].titel}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
            </tr>`;  
            }
        } 
        }
    }
}

document.getElementById("tbody").innerHTML=table;

}

