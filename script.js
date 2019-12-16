// https://api.edamam.com/search?q=chicken&app_id=${appID}&app_key=${appKey}
//https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
//https://cors-anywhere.herokuapp.com/
//https://api.edamam.com/search?q=chicken&app_id=8762ceb6&app_key=87390675c80ad08855757b2abc17feb2&from=0&to=3&calories=591-722&health=alcohol-free"
$(document).ready(function(){





var appID = "8762ceb6";
var appKey = "87390675c80ad08855757b2abc17feb2";
var data;
var searchTerm = "chicken";

var recipeList = $(".recipe-list");
var recipeBlock = $("#recipe-block-row");
var imgCol = $("#col-1.img");
var detailCol = $("#col-2.detail");
var submitBtn = $("#submit");


//  click submit button to search for recipe
$("#submit").on("click", function(event) {
  event.preventDefault();

  searchTerm = $("#search").val().trim();
  console.log(searchTerm)

  var queryURL = `https://api.edamam.com/search?q=${searchTerm}&app_id=${appID}&app_key=${appKey}`;

  fetch(queryURL, { method: "GET" })
  .then(function(response) {
    return response.json();
  })
  .then(function(res) {
    data = res;
    console.log(data);

    var recipeName = data.hits[0].recipe.label;
    console.log(recipeName);

    var recipeImage = data.hits[0].recipe.image;

    var ingredients = data.hits[0].recipe.ingredients[0];
    console.log(ingredients);

    var cookTime = data.hits[0].recipe.totalTime;
    console.log("Cook time is " + cookTime + " minutes");

    var calories = data.hits[0].recipe.calories;
    console.log(calories);

    var yield = data.hits[0].recipe.yield;
    console.log(yield);


    generateRecipeBlock(recipeName, recipeImage, ingredients, cookTime, calories, yield);

    var generateRecipeBlock(recipeName);



  });
});


   function generateRecipeBlock(){

    submitBtn.on("click", function(){
      for (i = 0; i <= 5; i++){

        imgCol.append(recipeImage);
        detailCol.append(recipeName, ingredients, cookTime, calories, yield)

        recipeBlock.append(imgCol, detailCol)

      }

    })



  generateRecipeBlock(){

    

  }


})
// APIKey = AIzaSyAaRcgnx00VKEpGmrynTsPq4RnDQNBQU9M
// var title = "garlic";
// var queryURL = "https://www.themealdb.com/api/json/v1/1/list.php?c="+ title;
// //how to access API data (make http request)
// fetch({
//   url: queryURL,
//   method: "GET"
// }).then(function(response) {
//   console.log(response);//comes back as an object, then we traverse through object to call info
// });


$(function() {
  $(window).scroll(function() {
    var winTop = $(window).scrollTop();
    if (winTop >= 30) {
      $("body").addClass("sticky-shrinknav-wrapper");
    } else {
      $("body").removeClass("sticky-shrinknav-wrapper");
    }
  });
});

