//search by substring
$('#searchBtn').on('click', function(e){
    let substring =  $('#searchRecipe').val();
    webHandler.displayRecipes(undefined, substring);
 });

//display recipes based on category
$('.categories > li > a').on('click', function(e){
    let category = $(this).attr('id');

    if(category === 'allRecipes'){
        webHandler.displayRecipes(undefined, undefined);
    }else{
        webHandler.displayRecipes(category, undefined);
    }
});
