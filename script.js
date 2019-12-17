//https://api.edamam.com/search?q=chicken&app_id=${appID}&app_key=${appKey}
//https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
//https://cors-anywhere.herokuapp.com/
//https://api.edamam.com/search?q=chicken&app_id=8762ceb6&app_key=87390675c80ad08855757b2abc17feb2&from=0&to=3&calories=591-722&health=alcohol-free"
$(document).ready(function() {
  var appID = "8762ceb6";
  var appKey = "87390675c80ad08855757b2abc17feb2";
  var data;
  var searchTerm = "chicken";
  var recipeList = document.querySelector(".recipe-list");
  var recipeBlock = document.querySelector(".recipeBlock");
  var homePage = $(".homePage");
  var imgCol = $("#col-1.img");
  var detailCol = $("#col-2.detail");
  var submitBtn = $("#submit");
  var recipeName;
  var recipeImage;
  var ingredients;
  var cookTime;
  var calories;
  var servings;
  var nextPage = document.querySelector(".nextPage");
  var firstPage = document.querySelector(".firstPage");

  //  click submit button to search for recipe
  $("#submit").on("click", function(event) {
    event.preventDefault();

    searchTerm = $("#search")
      .val()
      .trim();
    console.log(searchTerm);

    var queryURL = `https://api.edamam.com/search?q=${searchTerm}&app_id=${appID}&app_key=${appKey}`;

    fetch(queryURL, { method: "GET" })
      .then(function(response) {
        return response.json();
      })
      .then(function(res) {
        data = res;
        console.log(data);

        generateRecipeBlock();
      });
  });

  firstPage.addEventListener("click", generateRecipeBlock);
  function generateRecipeBlock() {
    recipeList.style = "display: flex";
    homePage.css("display", "none");
    var temp = "";
    recipeBlock.innerHTML = "";
    for (i = 0; i < 5; i++) {
      recipeName = data.hits[i].recipe.label;
      console.log(recipeName);

      recipeImage = data.hits[i].recipe.image;
      console.log(recipeImage);

      ingredients = data.hits[i].recipe.ingredients[0].text;
      console.log(ingredients);

      cookTime = data.hits[i].recipe.totalTime;
      console.log("Cook time is " + cookTime + " minutes");

      calories = data.hits[i].recipe.calories;
      console.log(calories);

      servings = data.hits[i].recipe.yield;
      console.log(servings);

      temp = `
      <div class="row recipe-block">
        <div class = "columns large-4 img">
          <img src="${recipeImage}">
        </div>
        <div class = "columns large-8 details">
          <h3>${recipeName}</h3>
          <p>${ingredients}</p>
          <h5>Cook Time: ${cookTime}  Calories: ${Math.floor(
        calories
      )} Servings: ${servings}</h5>
        </div>
      </div>
      `;
      recipeBlock.innerHTML += temp;
    }
  }
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

  nextPage.addEventListener("click", function() {
    recipeList.style = "display: flex";
    homePage.css("display", "none");
    var temp = "";
    recipeBlock.innerHTML = "";
    for (var i = 5; i < 9; i++) {
      temp = `
      <div class="row recipe-block">
        <div class = "columns large-4 img">
          <img src="${recipeImage}">
        </div>
        <div class = "columns large-8 details">
          <h3>${recipeName}</h3>
          <p>${ingredients}</p>
          <h5>Cook Time: ${cookTime}  Calories: ${Math.floor(
        calories
      )} Servings: ${servings}</h5>
        </div>
      </div>
      `;
      recipeBlock.innerHTML += temp;
    }
  });

  $(document).on("click", "h3", function() {
    //APIKey = AIzaSyAaRcgnx00VKEpGmrynTsPq4RnDQNBQU9M
    $(".recipe-card").style = "display: flex";
    var youtubeData;
    var title = $(this);
    console.log(title[0].innerText);
    var name = title[0].innerText;
    const myKey = "AIzaSyAaRcgnx00VKEpGmrynTsPq4RnDQNBQU9M";
    var url = new URL(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=${myKey}&q=${name}recipe`
    );
    fetch(url, {
      method: "GET"
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(res) {
        console.log(res);
        youtubeData = res;
        var videoID = youtubeData.items[0].id.videoId;
        var videoURL = `https://www.youtube.com/watch?v=${videoID}`;
        console.log(videoID);
        console.log(videoURL);
      });
  });
});
