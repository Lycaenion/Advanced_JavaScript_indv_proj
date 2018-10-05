var ingredientTitleList = RequestHandler.retrieveIngredientTitleList();
var ingredientIdList = RequestHandler.retrieveIngredientIdsList();
let counter = 0;


$('#addIngredientBtn').on('click', function(e){
    let section = WebHandler.fetchIngredientSection(counter+1);
    if(counter === 0){
        $(`.recommendedPortions`).after(section); 
    }else{
        $(`#${counter}`).after(section);  
    };
    counter++; 
    $(".ingredient").autocomplete({
        source: ingredientTitleList
      });
    $('.removeIngredient').on('click', function(e){
        let sectionId = $(this).attr('id');
        $('#recipe').remove(`#${sectionId}`);
    })
});

$('#submitRecipeBtn').on('click', function(e){
    let recipe = WebHandler.fetchRecipe(ingredientIdList, ingredientTitleList);
    RequestHandler.addRecipe(recipe);
    location.reload();
});


