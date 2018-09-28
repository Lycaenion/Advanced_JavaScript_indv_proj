//search by substring
$('#searchBtn').on('click', function(e){
    let substring =  $('#searchRecipe').val();
    webHandler.displayRecipes(undefined, substring);
 });

//display all recipes 
$('#allRecipes').on('click',function(e){
    webHandler.displayRecipes(undefined, undefined);
});


//display recipes based on category
$('.categories > li > a').on('click', function(e){
    console.log(this);
    webHandler.displayRecipes($(this).attr('id'), undefined);
});
