// -------------------Global-------------------
var ProductName = document.getElementById("pname");
var ProductCategory = document.getElementById("pcategory");
var ProductPrice = document.getElementById("pprice");
var ProductDescription = document.getElementById("pdescription");
var searchinput = document.getElementById("searchinput");
var addbtn = document.getElementById('addbtn');
var updatebtn = document.getElementById('updatebtn');
var clear = document.getElementById('clear');
var searchinput = document.getElementById('searchinput');
var nameAlert  = document.getElementById('nameAlert');
var categoryAlert = document.getElementById('categoryAlert');
var priceAlert = document.getElementById('priceAlert');
var productContianer=[];
var currentIndex=0;

// -------------------When Start-------------------
if(getlocal() !== null){
    productContianer = getlocal();
    displayData();
}
// -------------------Start Event-------------------
addbtn.onclick = function(){
    createData();
}
clear.onclick = function(){
    reset();
}
updatebtn.onclick = function(){
    updateData();
}
searchinput.oninput = function(){
    searchproduct();
}
// -------------------Start Function-------------------
function createData(){
    if((namevalidation() === true) & (categoryvalidation() == true) & (pricevalidation() === true)){
        var product={
            pname:ProductName.value,
            pcategory:ProductCategory.value,
            pprice:ProductPrice.value,
            pdescription:ProductDescription.value,
        };
        productContianer.push(product);
        console.log(productContianer);
        displayData();
        setlocal();
        reset();
    }
}
function displayData(){
    var item = ``;
    var search = searchinput.value.toLowerCase();
    for(var i = 0 ; i < productContianer.length ; i++){
        if(productContianer[i].pname.toLowerCase().includes(search)){
            item+= `
            <td >${i+1}</td>
            <td>${productContianer[i].pname.toLowerCase().replaceAll(search,`<span class="bg-info">${search}</span>`)}</td>
            <td>${productContianer[i].pcategory}</td>
            <td>${productContianer[i].pprice}</td>
            <td>${productContianer[i].pdescription}</td>
            <td><button class="btn btn-outline-warning" onclick="setupdate(${i})"><i class="fa-solid fa-edit"></i></button></td>
            <td><button class="btn btn-outline-danger" onclick="deleteproduct(${i})"><i class="fa-solid fa-trash"></i></button></td>  
            </tr> 
            `
        }
        document.getElementById('tableBody').innerHTML=item;
    }
}
function reset(){
    ProductName.value="";
    ProductCategory.value="";
    ProductPrice.value="";
    ProductDescription.value="";
}
function deleteproduct(index){
    productContianer.splice(index,1);
    displayData();
    setlocal();
}
function setupdate(index){
    currentIndex = index;
    ProductName.value = productContianer[index].pname;
    ProductCategory.value = productContianer[index].pcategory;
    ProductPrice.value = productContianer[index].pprice;
    ProductDescription.value = productContianer[index].pdescription;
    updatebtn.classList.remove('d-none');
    addbtn.classList.add('d-none');
}
function updateData(){
    var product={
        pname:ProductName.value,
        pcategory:ProductCategory.value,
        pprice:ProductPrice.value,
        pdescription:ProductDescription.value,
    };
    productContianer.splice(currentIndex,1,product);
    setlocal();
    displayData();
    reset();
    updatebtn.classList.add('d-none');
    addbtn.classList.remove('d-none');
}
function searchproduct(){
    displayData();
}
function setlocal(){
    localStorage.setItem("prooduct",JSON.stringify(productContianer));
}
function getlocal(){
    return JSON.parse(localStorage.getItem("prooduct"));
}

// -------------------Start Validation-------------------
function namevalidation(){
    if(ProductName.value === ''){
        nameAlert.classList.remove('d-none');
        return false
    }else{
        nameAlert.classList.add('d-none');
        return true
    }
}
function categoryvalidation(){
    if(ProductCategory.value === ''){
        categoryAlert.classList.remove('d-none');
        return false
    }else{
        categoryAlert.classList.add('d-none');
        return true
    }
}
function pricevalidation(){
    if(ProductPrice.value === ''){
        priceAlert.classList.remove('d-none');
        return false
    }else{
        priceAlert.classList.add('d-none');
        return true
    }
}