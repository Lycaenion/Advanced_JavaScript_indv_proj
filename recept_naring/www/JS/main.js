var selectedRecipe;
var ingredientList = [];


//search by substring
$('#searchBtn').on('click', function(e){
    let substring =  $('#searchRecipe').val();
    WebHandler.displayRecipes(undefined, substring);

    $('.content > div').on('click', filterHandle);
 });

//display recipes based on category
$('.categories > li > a').on('click', function(e){
    let category = $(this).attr('id');

    if(category === 'allRecipes'){
        WebHandler.displayRecipes(undefined, undefined);
    }else{
        WebHandler.displayRecipes(category, undefined);
    }

    $('.content > div').on('click', filterHandle);
});

function filterHandle(){
    let id = $(this).attr('id');
    selectedRecipe = RequestHandler.retrieveRecipe(id);
    
    WebHandler.displayRecipeDetails(selectedRecipe, selectedRecipe.recommendedPortions);

}





