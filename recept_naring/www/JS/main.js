//search by substring
$('#searchBtn').on('click', function(e){
    let substring =  $('#searchRecipe').val();
    WebHandler.displayRecipes(undefined, substring);
 });

//display recipes based on category
$('.categories > li > a').on('click', function(e){
    let category = $(this).attr('id');

    if(category === 'allRecipes'){
        WebHandler.displayRecipes(undefined, undefined);
    }else{
        WebHandler.displayRecipes(category, undefined);
    }

    $('.content > div').on('click', function(e){
        let id = $(this).attr('id');
        WebHandler.displayRecipeDetails(id);
    });
});



