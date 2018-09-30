class WebHandler{
    
    static displayRecipes(category, substring){
        
        $('.content').empty();
        
        let recipes = RequestHandler.retrieveRecipes(category, substring); 

        for(let index in recipes){

            let div = $(`<div id=${recipes[index].id}></div>`);
            let title = $(`<p></p>`);
            let img = $(`<img src=${recipes[index].img}>`);

            title.text(recipes[index].title);
            div.append(img);
            div.append(title);
        
            $('.content').append(div);
        }
    }

    static displayRecipeDetails(recipe, recommendedPortions){
        $('.content').empty();
        
        let div = $(`<div id="recipe"></div>`);
        let title = $(`<h1></h1>`);
        let ingredientList = $(`<ul id="ingredients"></ul>`)
        let img = $(`<img src=${recipe.img}>`)
        let dropDown = $(``)

        for(let index in recipe.ingredients){
            let ingredient = $(`<li></li>`);
            let ingredientDetail = recipe.ingredients[index];
            ingredient.text(ingredientDetail.amount + " " + ingredientDetail.unit + " " + ingredientDetail.name);
            ingredientList.append(ingredient);
        }

        title.text(recipe.title);
        div.append(title);
        div.append(img);
        div.append(ingredientList);

        $('.content').append(div);
    }

    static fetchIngredientSection(id){
        let section = $(`<section id="${id}"></section`);
        let inputAmount = $(`<input type="text" id = "amount" placeholder="Amount"></input>`);
        let selectUnit = $(` <select type="text" id = "unit" placeholder = "Unit">
                                <option value = "dl">dl</option>
                                <option value = "ml">ml</option>
                                <option value = "liter">liter</option>
                                <option value = "msk">msk</option>
                                <option value = "krdm">krdm</option>
                                <option value = "cl">cl</option>
                                <option value = "g">g</option>
                                <option value = "kg">kg</option>
                                <option value = "st">st</option>
                            </select>`);
        let inputIngredient = $(`<input type="text" id="ingredients" placeholder="Ingredient">`);
        let inputUnitInGrams = $(`<input type="text" id="oneUnitInGrams" placeholder="One unit in grams">`)
    
        section.append(inputAmount);
        section.append(selectUnit);
        section.append(inputIngredient);
        section.append(inputUnitInGrams);
        return section;
    }

    static fetchRecipe(){
        let recipe = new Recipe();

        recipe.title = $('.recipeTitle').val();
        console.log(recipe.title);








        return recipe;
    }
}