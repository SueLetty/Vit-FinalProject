// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
for (var i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
for (var i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
    document.getElementById("myTable").deleteRow(i);
  }
}


var total = 0;
var totalQuantity = 0;
var countClick = 0;
function addList(clicked_id){
    countClick += 1;
    itemList = ["q1",'q2','q3'];
    buttonList = ["b1","b2","b3"];
    quanList = [0,0,0];
    nameList=["name1","name2","name3"];
    priceList=[24.99, 29.99, 34.99];
    

    let i = buttonList.indexOf(clicked_id);
    console.log("index: " + i);

        
    // create an element
    var li = document.createElement('li');
    //grab text from user input
    var inputValue = document.getElementById(itemList[i]).value;
    
    var text = document.getElementById(nameList[i]).innerText;

    if(inputValue === "" || inputValue === "0" ){  //check if user typed anyting or 0

        document.getElementById(itemList[i]).value =""; 

    } else{ //user typed anything we add the user input in the ul.
        totalQuantity += inputValue;
        quanList[i] = inputValue;
        li.innerText= text +":   " + quanList[i]+" ";

        document.getElementById('myList').appendChild(li);
        document.getElementById(itemList[i]).value =""; 

        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);

        for (var j = 0; j < close.length; j++) {
            close[j].onclick = function() {
              var div = this.parentElement;
              div.style.display = "none";
            }
        }
        var currentList;
        
        if (window.localStorage.getItem("shoppingList1")) {
          currentList = JSON.parse(window.localStorage.getItem("shoppingList1"));
          console.log(currentList)
        } else {
          currentList = [];
        }


        var newObject = {
          itemName: text,
          quantity: inputValue,
          price: priceList[i]*inputValue,
        }

        currentList.push(newObject);
        window.localStorage.setItem("shoppingList1", JSON.stringify(currentList))
        
    }

}

function displayItem(){
  var shoppingList = JSON.parse(window.localStorage.getItem("shoppingList1"));

  // Find a <table> element with id="myTable":
  var table = document.getElementById("myTable");
  var subtotal= 0;
  for(var i = 0; i <shoppingList.length; i++){
          // Create an empty <tr> element and add it to the 1st position of the table:
      var row = table.insertRow();

      // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);

      // Add some text to the new cells:            
      cell1.innerHTML = shoppingList[i].itemName;
      cell2.innerHTML = shoppingList[i].quantity;
      cell3.innerHTML = shoppingList[i].price.toFixed(2);

      subtotal += shoppingList[i].price;

  }
  subtotal = subtotal.toFixed(2);
  document.getElementById("subtotal").innerHTML = "Subtotal:" + subtotal;

}
function addTotalPrice(){
  var shoppingList = JSON.parse(window.localStorage.getItem("shoppingList1"));
  var quantity= 0;
  var subtotal= 0;
  for(var i = 0; i < shoppingList.length; i++){
    quantity += Number(shoppingList[i].quantity);
    subtotal += shoppingList[i].price;
  }
  var table = document.getElementById("myTotal");
  //row 0    item(3)                           $58.57
  var row0 =  table.insertRow(0);
  var row0cell0 = row0.insertCell(0);
  var row0cell1 = row0.insertCell(1);
  
  var subTotal = subtotal.toFixed(2);
  row0cell0.innerHTML = "Item(" + quantity + ")";

  row0cell1.innerHTML = "$" + subTotal;

  //row1     Shiping & Handling:                $0.00
  var row1 = table.insertRow(1);
  var row1cell0 = row1.insertCell(0);
  var row1cell1 = row1.insertCell(1);
  var shipping = Math.round(Math.random() * 0.1* subTotal) ;
  var shippingFee = shipping.toFixed(2);
  row1cell0.innerHTML = "Shipping & Handling:";
  row1cell1.innerHTML = "$" + shippingFee;

  //row2     Total before tax:                  $58.57
  var row2 = table.insertRow(2);
  var row2cell0 = row2.insertCell(0);
  var row2cell1 = row2.insertCell(1);
  row2cell0.innerHTML = "Total before tax:"
  var beforeTax = (Number(subTotal) + Number(shippingFee)).toFixed(2);
  row2cell1.innerHTML = "$" + beforeTax;

  //row3     Estimated tax to be collected:     $6.00
  var row3 = table.insertRow(3);
  var row3cell0 = row3.insertCell(0);
  var row3cell1 = row3.insertCell(1);
  var tax = subTotal * 0.102;
  var taxFee = tax.toFixed(2);
  row3cell0.innerHTML = "Estimated tax to be collected:";
  row3cell1.innerHTML = "$" + taxFee;

  var row4 = table.insertRow(4);
  var row4cell0 = row4.insertCell(0);
  var row4cell1 = row4.insertCell(1);
  var finalPrice = Number(subTotal) + Number(shippingFee) + Number(taxFee);
  var finalTotal = Number(finalPrice).toFixed(2);
  row4cell0.innerHTML = "Total Price:";
  row4cell1.innerHTML = "$" + finalTotal;

  

}
function processTransaction(){
  window.localStorage.removeItem("shoppingList1");
  var shoppingList = JSON.parse(window.localStorage.getItem("shoppingList1"));
  console.log(shoppingList);
}

function addUser(){
  var fname = document.getElementById("fname").value;
  var lname = document.getElementById("lname").value;
  var uname = document.getElementById("uname").value;
  var password = document.getElementById("password").value;
  var email = document.getElementById("email").value;
  console.log(fname);

  var currentList;
        
  if (window.localStorage.getItem("userLists")) {
    currentList = JSON.parse(window.localStorage.getItem("userLists"));
    console.log(currentList)
  } else {
    currentList = [];
  }


  var userData = {
    fName: fname,
    lName: lname,
    uName: uname,
    passWord: password,
    Email: email,
  }

  currentList.push(userData);
  window.localStorage.setItem("userLists", JSON.stringify(currentList));
  window.location = "login.html";

}
function userLogin(){
  var userList = JSON.parse(window.localStorage.getItem("userLists"));
  console.log(userList);
  var uname = document.getElementById("uname").value;
  var password = document.getElementById("password").value;
 

  for(var i = 0; i < userList.length; i++){
    var name = userList[i].fName;

    if(userList[i].uName == uname){
      if(userList[i].passWord == password){
        window.location = "index.html";
      }
      else{
        alert("Your User name does not match your password!");
      }
    } 
    if(userList[i].passWord == password){
      if(userList[i].uName == uname){
        window.location = "index.html";
      }
      else{
        alert("Your User name does not match your password!");
      }
    }
  }


}

