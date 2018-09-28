
$('#allRecipes').on('click',function(e){
    webHandler.displayRecipes(undefined, undefined);
});

$('#vegetarian').on('click', function(e){
    webHandler.displayRecipes("vegetarian", undefined);
});

$('#main').on('click', function(e){
    webHandler.displayRecipes("main", undefined);
});

$('#searchBtn').on('click', function(e){
   let substring =  $('#searchRecipe').val();
   webHandler.displayRecipes(undefined, substring);
});