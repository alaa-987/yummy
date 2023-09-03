$(document).ready(function(){
  $(".loadingScreen").fadeOut(1000)
  getMeals()
  // getCat()
  // getArea()
  // getIngr()
})
$(".openNav").click(function(){
  $(".links").addClass("animate__fadeInUp");
  $(".L1").addClass("animate__fadeInUp");
  $(".sideNav").addClass("sideNor");
  $(".sideNav-open-close").addClass("sideo");
  $(".fa-align-justify").fadeOut(300);
  $(".fa-xmark").fadeIn(300);
})
$(".closeNav").click(function(){
  $(".sideNav").removeClass("sideNor");
  $(".sideNav-open-close").removeClass("sideo");
  $(".fa-align-justify").fadeIn(300);
  $(".fa-xmark").fadeOut(300);
})
// ====homePage===
let mealsResponse;
async function getMeals(search=""){
    mealsResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    mealsResponse = await mealsResponse.json();
    console.log(mealsResponse.meals)
    Display(mealsResponse.meals)
}
function Display(data){
  var collect = ``;
  for (let i = 0; i <data.length ; i++) {
   collect += `
   <div class="col-md-3 rounded position-relative con2" onclick="displayDetailsPage(${i})">
   <img src="${data[i].strMealThumb}" alt="" class="w-100 rounded">
   <div class="img-layer rounded">
       <h3>${data[i].strMeal}</h3>
   </div>
</div>` ;
  }
  document.querySelector(".my-row").innerHTML = collect;
}
// ====searchPage===
let mealsLetterResponse;
async function getmelByL(search=""){
    mealsLetterResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`);
    mealsLetterResponse = await mealsLetterResponse.json();
    console.log(mealsLetterResponse.meals)
    displayLetter(mealsLetterResponse.meals)
}
function displayLetter(data){
    var collect = ``;
    for (let i = 0; i <data.length ; i++) {
     collect += `
     <div class="col-md-3 rounded position-relative  con2" onclick="displayDetailsPage(${i})">
     <img src="${data[i].strMealThumb}" alt="" class="w-100 rounded">
     <div class="img-layer rounded">
         <h3>${data[i].strMeal}</h3>
     </div>
 </div>` ;
    }
    document.querySelector(".my-row").innerHTML = collect;
 }
//  ===searchEvent===
document.querySelector("#search1").addEventListener("click",function(){
  document.querySelector(".search").classList.remove("d-none");
  document.querySelector(".my-row").innerHTML = "";
})

let searchInput=document.querySelector(".search-input");
searchInput.addEventListener("input",function(){
  getMeals(this.value)
})
let letterInput=document.querySelector(".letter-input");
letterInput.addEventListener("input",function(){
    console.log(this.value)
    getmelByL(this.value)
})
// ===categoriesPage===
let catResponse ;
async function getCat(){
    catResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    catResponse = await catResponse.json();
    console.log(catResponse.categories)
    displayCat(catResponse.categories)
}
function displayCat(data){
   var collect = ``;
   for (let i = 0; i <data.length ; i++) {
    collect += `
    <div class="col-md-3 rounded position-relative con2">
    <img src="${data[i].strCategoryThumb}" alt="" class="w-100 rounded">
    <div class="cat-layer rounded">
        <h3>${data[i].strCategory}</h3>
        <p class="cat4 bolder">${data[i].strCategoryDescription}</p>
    </div>
</div>` ;
   }
   document.querySelector(".my-row").innerHTML = collect;
}
document.querySelector("#catInput").addEventListener("click",function(){
  document.querySelector(".search").classList.add("d-none");
  getCat()
})
// ===areaPage===
let areaResponse;
async function getArea(){
    areaResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    areaResponse = await areaResponse.json();
    console.log(areaResponse.meals);
    displayArea(areaResponse.meals);
}
function displayArea(arr){
  var collect = ``;
  for (let i = 0; i <arr.length ; i++) {
   collect += `
   <div class="col-md-3 rounded position-relative area2" onclick="areaMealsApi('${arr[i].strArea}')">
   <i class="fa-solid fa-house-laptop text-white fa-5x"></i>
  <h3 class="fs-2 text-white">${arr[i].strArea}</h3>
</div>
` ;
  }
  document.querySelector(".my-row").innerHTML = collect;
}
document.querySelector("#areaButton").addEventListener("click",function(){
   getArea()
})
// ====mealsid===
let areaMealsRes;
async function areaMealsApi(area){
  areaMealsRes=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  areaMealsRes = await areaMealsRes.json();
  console.log(areaMealsRes.meals)
  displayAreaApi(areaMealsRes.meals)
}

function  displayAreaApi(){
  var collect = ``;
  for (let i = 0; i <areaMealsRes.meals.length; i++) {
   collect += `
   <div class="col-md-3 rounded position-relative con2" onclick="displayDetailsArea(${i})">
   <img src="${areaMealsRes.meals[i].strMealThumb}" alt="" class="w-100 rounded">
   <div class="img-layer rounded">
       <h3>${areaMealsRes.meals[i].strMeal }</h3>
   </div>
</div>` ;
  }
  document.querySelector(".my-row").innerHTML = collect;
}
// ====ingrediants===
let ingResponse;
async function getIngr(){
    ingResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    ingResponse = await ingResponse.json();
    console.log(ingResponse.meals);
    displayIng(ingResponse.meals)
  // let ingData = await ingResponse.json();
  // ingr.push(ingData.meals)
  // console.log(ingData.meals)
  // displayIng(ingr)
}
function displayIng(data){
 var collect = ``;
 for (let i = 0; i <data.length ; i++) {
  collect += `
  <div class="col-md-3 rounded position-relative ingre2">
  <i class="fa-solid fa-drumstick-bite text-white fa-5x"></i>
  <h3 class="fs-2 text-white">${data[i].strIngredient}</h3>
  <p class="Ing4">${data[i].strDescription}</p>
    </div>
` ;
 }
 document.querySelector(".my-row").innerHTML = collect;
}
document.querySelector("#ingrediant2").addEventListener("click",function(){
  getIngr()
})
// ====contactUs====

let nameRegex = /^[A-Z]\w{0,20}$/;
let emailRegex=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
let phoneRegex=/^01[0125][0-9]{8}$/;
let ageRegex =/^[1-9]?[0-9]{1}$|^100$/;
let passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

function validation(regex,input){
    if(regex.test(input.value)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        console.log("right")
        // input.parentElement.nextElementSibling.classList.add("d-none") ;

        return true;
    }else{
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        console.log("wrong")
        // input.parentElement.nextElementSibling.classList.remove("d-none") ;
        return false;
    }
}
document.querySelector("#contactUs").addEventListener("click",function(){
  document.querySelector(".Home").classList.add("d-none");
  document.querySelector(".my-contact-us").classList.remove("d-none");
})
let nameInput = document.getElementById("nameInput");
nameInput.addEventListener("input",function(){
    if(validation(nameRegex,nameInput)){
        document.querySelector(".name-validation").classList.add("d-none")
    }
    else{
        document.querySelector(".name-validation").classList.remove("d-none")

    }
})
let emailInput = document.getElementById("emailInput");
emailInput.addEventListener("input",function(){
    if(validation(emailRegex,emailInput)){
        document.querySelector(".email-validation").classList.add("d-none")
    }
    else{
        document.querySelector(".email-validation").classList.remove("d-none")

    }
})
let phoneInput =document.getElementById("phoneInput");
phoneInput.addEventListener("input",function(){
    if(validation(phoneRegex,phoneInput)){
        document.querySelector(".phone-validation").classList.add("d-none")
    }
    else{
        document.querySelector(".phone-validation").classList.remove("d-none")

    }
})
let ageInput = document.getElementById("ageInput");
ageInput.addEventListener("input",function(){
    if(validation(ageRegex,ageInput)){
        document.querySelector(".age-validation").classList.add("d-none")
    }
    else{
        document.querySelector(".age-validation").classList.remove("d-none")

    }
})
let passInput = document.getElementById("passInput");
passInput.addEventListener("input",function(){
    if(validation(passRegex,passInput)){
        document.querySelector(".pass-validation").classList.add("d-none")
    }
    else{
        document.querySelector(".pass-validation").classList.remove("d-none")

    }
})
let rePassword = document.getElementById("Repassword");
rePassword.addEventListener("input",function(){
    if(passInput.value == rePassword.value){
        document.querySelector(".rePass-validation").classList.add("d-none")
        console.log("hi")
    }
    else{
        document.querySelector(".rePass-validation").classList.remove("d-none")
        console.log("gggg")
    }
})





const contactInputs = document.querySelectorAll(".contact-input");
const contactBtn = document.getElementById("contact-btn");

function checkInputs() {
  let allInputsFilled = true;

  contactInputs.forEach(input => {
    if (input.value === "") {
      allInputsFilled = false;
    }
  });

  contactBtn.disabled = !allInputsFilled;
}

contactInputs.forEach(contactInputs => {
    contactInputs.addEventListener("input", checkInputs);
});

// ===========details========

function displayDetailsArea(i) {
  if (!areaMealsRes.meals || !areaMealsRes.meals[i]) {
      document.querySelector(".my-row").innerHTML = "<p>No information available for this meal.</p>";
      return;
  }

  let cartona = `
      <div class="container detealsPage my-1">
          <div class="row ps-3">
              <div class="col-lg-4 text-white">
                  <img src="${areaMealsRes.meals[i].strMealThumb}" class="w-100 rounded-3" alt="">
                  <h2 class="mt-1">${areaMealsRes.meals[i].strMeal}</h2>
              </div>
              <div class="col-lg-8 text-white">
                  <h2 class="fw-bold">Instructions</h2>
                  <p>${areaMealsRes.meals[i].strInstructions}</p>
  
                  <p class="fs-3 fw-bold">Area : <span class="fw-medium">${areaMealsRes.meals[i].strArea}</span></p>
                  <p class="fs-3 fw-bold">Category : <span class="fw-medium">${areaMealsRes.meals[i].strCategory}</span></p>
                  <p class="fs-3 fw-medium">Recipes :</p>
                  
                  <ul class="list-unstyled d-flex flex-wrap ingrad-list gap-4">
                      ${createIngredientList(areaMealsRes.meals[i])}
                  </ul>
  
                  <p class="fs-3 fw-medium">Tags :</p>
                  <p class="type">Soup</p>
  
                  <ul class="list-unstyled d-flex ingradSrc gap-2">
                      <li class="scr"><a href="${areaMealsRes.meals[i].strSource}" class="text-decoration-none text-white" target="_blank">Source</a></li>
                      <li class="yout"><a href="${areaMealsRes.meals[i].strYoutube}" class="text-decoration-none text-white" target="_blank">Youtube</a></li>
                  </ul>
              </div>
          </div>
      </div>
  `;

  document.querySelector(".my-row").innerHTML = cartona;
}

// ===displayDetailshome===
function displayDetailsPage(i) {
  if (!mealsResponse.meals || !mealsResponse.meals[i]) {
      document.querySelector(".my-row").innerHTML = "<p>No information available for this meal.</p>";
      return;
  }

  let cartona = `
      <div class="container detealsPage my-1">
          <div class="row ps-3">
              <div class="col-lg-4 text-white">
                  <img src="${mealsResponse.meals[i].strMealThumb}" class="w-100 rounded-3" alt="">
                  <h2 class="mt-1">${mealsResponse.meals[i].strMeal}</h2>
              </div>
              <div class="col-lg-8 text-white">
                  <h2 class="fw-bold">Instructions</h2>
                  <p>${mealsResponse.meals[i].strInstructions}</p>
  
                  <p class="fs-3 fw-bold">Area : <span class="fw-medium">${mealsResponse.meals[i].strArea}</span></p>
                  <p class="fs-3 fw-bold">Category : <span class="fw-medium">${mealsResponse.meals[i].strCategory}</span></p>
                  <p class="fs-3 fw-medium">Recipes :</p>
                  
                  <ul class="list-unstyled d-flex flex-wrap ingrad-list gap-4">
                      ${createIngredientList(mealsResponse.meals[i])}
                  </ul>
  
                  <p class="fs-3 fw-medium">Tags :</p>
                  <p class="type">Soup</p>
  
                  <ul class="list-unstyled d-flex ingradSrc gap-2">
                      <li class="scr"><a href="${mealsResponse.meals[i].strSource}" class="text-decoration-none text-white" target="_blank">Source</a></li>
                      <li class="yout"><a href="${mealsResponse.meals[i].strYoutube}" class="text-decoration-none text-white" target="_blank">Youtube</a></li>
                  </ul>
              </div>
          </div>
      </div>
  `;

  document.querySelector(".my-row").innerHTML = cartona;
}

function createIngredientList(meal) {
  let ingredientList = "";
  for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && measure) {
          ingredientList += `<li>${measure} ${ingredient}</li>`;
      }
  }
  return ingredientList;
}