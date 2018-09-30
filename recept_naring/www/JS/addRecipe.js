var ingredientList;
let counter = 0;

ingredientList = RequestHandler.retrieveIngredientList();

$( "#ingredients" ).autocomplete({
    source: ingredientList
  });

$('#addIngredientBtn').on('click', function(e){
    let section = WebHandler.fetchIngredientSection(counter+1);
    if(counter === 0){
        $(`.recipeTitle`).after(section); 
    }else{
        $(`#${counter}`).after(section);  
    };
    counter++; 
});

$('#submitRecipeBtn').on('click', function(e){
    let recipe = WebHandler.fetchRecipe();
    RequestHandler.addRecipe(recipe);
});


