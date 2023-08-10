let alert = document.querySelector(".alert");
let form = document.querySelector(".form");
let grocery = document.getElementById("grocery");
let clearBtn= document.querySelector(".clear-btn");
let list = document.querySelector(".grocery-list");
let container = document.querySelector(".grocery-container")
let submitBtn = document.querySelector(".submit-btn")

let editflag = false;
let edit;



form.addEventListener("submit", submitItem)
 clearBtn.addEventListener("click", clearitem)


function submitItem(e) {
  e.preventDefault();
  let id = new Date().getTime().toString();
  const value = grocery.value;
 
 
  if(value && !editflag && value.length < 20) {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.classList.add("grocery-item");
    element.setAttributeNode(attr);
    
    element.innerHTML = ` <p>${value}</p>
        
        <div class="btns">
        <button type="button" class="edit-btn">+</button>
        <button type="button" class="delete-btn">-</button>
        </div>`

    const editBtn = element.querySelector(".edit-btn")
    const delBtn = element.querySelector(".delete-btn")
  
        
  list.appendChild(element);
    container.classList.add("show-container");
  
    alertContent("item is aadded", "sucess")
    backToDefault()
    //    addToLocalStorage(id,value)
    
    editBtn.addEventListener("click",editBtns)
    
  delBtn.addEventListener("click",delBtns)
  console.log(id)
  console.log(value )
  } 
  else if (value && editflag) {
    
    edits.innerHTML = value;
    alertContent("~ Value Edited ~", "sucess")
    setback();

  }else if(value.length > 20){
  alertContent("value should not be greater than 20", "danger")
  }
  
    else {
alertContent("please enter value", "danger")
  }
}



//alert that tells us what's going on
function alertContent(text,context) {
  alert.innerHTML = text;
  alert.classList.add(`alert-${context}`)
  
  setTimeout(function(){
  alert.innerHTML = "";
  alert.classList.remove(`alert-${context}`) 
  },1000)
}


// //******backtodefault to an empty string
function backToDefault() {
  grocery.value = "";

}

 //*****clearBtn
 function clearitem() {
     const items = document.querySelectorAll(".grocery-item")
     items.forEach((item) => {
       console.log(item)
      list.removeChild(item)
    })
  
     alertContent("Empty value", "danger");
    container.classList.remove("show-container");
    }

//*** delete function 
function delBtns(e) {
let ite = e.currentTarget.parentElement.parentElement;
list.removeChild(ite)
alertContent("value removed", "danger");
}



//*** edit function 
function editBtns(e) {
  editflag = true;
  let element = e.currentTarget.parentElement.parentElement;
  let id = element.dataset.id;

  edits = e.currentTarget.parentElement.previousElementSibling;
  grocery.value = edits.innerHTML;

  let name = "Edit"
  submitBtn.innerHTML = name;

}


function setback() {
  grocery.value = "";
  edit = "";
  editflag = false;
  submitBtn.innerHTML = "Submit";
}

// function addToLocalStorage(id,value) {
//   let list;
//   if (localStorage.getItem("list")) {
//   JSON.parse(localStorage.getItem("list"))
//   } else {
//     list = [];
//   }
  
//   list.push(id,value);
// JSON.stringify(localStorage.setItem("list"))
// }
