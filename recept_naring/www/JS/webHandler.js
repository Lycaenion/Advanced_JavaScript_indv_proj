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
        recipe.getNutritionalValues();

        title.text(recipe.title);
        div.append(title);
        div.append(img);
        div.append(ingredientList);

        $('.content').append(div);
    }

    static fetchIngredientSection(id){
        let section = $(`<section id="${id}"></section`);
        let inputAmount = $(`<input type="text" class = "amount" placeholder="Amount"></input>`);
        let selectUnit = $(` <select type="text" class = "unit" placeholder = "Unit">
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
        let inputIngredient = $(`<input type="text" class="ingredient" placeholder="Ingredient">`);
        let inputUnitInGrams = $(`<input type="text" class="oneUnitInGrams" placeholder="One unit in grams">`)
    
        section.append(inputAmount);
        section.append(selectUnit);
        section.append(inputIngredient);
        section.append(inputUnitInGrams);
        
        return section;
    }

    static fetchRecipe(ingredientIdList, ingredientTitleList){
        let recipe = new Recipe();
        let listOfIngredients = [];

        recipe.title = $('.recipeTitle').val();
        recipe.recommendedPortions = $('.recommendedPortions').val();
        recipe.execution = $('.execution').val().split('\n');

        $('section').each(function(){
            let ingredient = new Ingredient();
            let indexOfName;
            
            ingredient.amount = $(this).children().eq(0).val();
            ingredient.unit = $(this).children().eq(1).val();
            ingredient.name = $(this).children().eq(2).val();
            ingredient.oneUnitInGrams = $(this).children().eq(3).val()
            for(let index in ingredientTitleList){
                if(ingredient.name === ingredientTitleList[index]){
                    indexOfName = index;
                }
            }
            
            let id = ingredientIdList[indexOfName];       
            let ingredientInfo = RequestHandler.retrieveIngredient(id);
            let nutritions = ingredientInfo.Naringsvarden.Naringsvarde;
            let nutritionalValues = [];
            
            for(let index in nutritions){
                if(nutritions[index].Namn === "Summa mättade fettsyror" ||
                    nutritions[index].Namn === "Summa enkelomättade fettsyror" ||
                    nutritions[index].Namn === "Summa fleromättade fettsyror" ||
                    nutritions[index].Namn === "Energi (kcal)" ||
                    nutritions[index].Namn === "Kolhydrater" || 
                    nutritions[index].Namn === "Protein"||
                    nutritions[index].Namn === "Salt"
                ){
                    nutritionalValues.push(nutritions[index]);
                }
            }
            ingredient.nutrition = nutritionalValues;

            listOfIngredients.push(ingredient);

            
        });
        recipe.ingredients = listOfIngredients;

        let categoryList = [];
        let checkedCategories = $('input[type=checkbox]:checked');
        checkedCategories.each(function(){
            categoryList.push($(this).val());
        });
        recipe.categories = categoryList;
        


        return recipe;
    }
}