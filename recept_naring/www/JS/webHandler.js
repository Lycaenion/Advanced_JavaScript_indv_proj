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

    static displayRecipeDetails(recipe, numberOfPortions){
        $('.content').empty();        
        let div = $(`<div id = "recipe"></div>`);
        let title = $(`<h1></h1>`);
        let ingredientList = $(`<ul id="ingredients"></ul>`);
        let img = $(`<img src=${recipe.img}>`);
        let execution = $(`<ol></ol>`);
        let nutritionalValues = $(`<section class = "nutritionalValues"</section>`);
        let listOfNutritions = [];
        let nutrition = $(`<ul></ul>`);
        

        for(let index in recipe.ingredients){
            let ingredient = $(`<li></li>`);
            let ingredientDetail = recipe.ingredients[index];
            ingredient.text(ingredientDetail._amount/recipe.recommendedPortions*numberOfPortions + " " + ingredientDetail._unit + " " + ingredientDetail._name);
            ingredientList.append(ingredient);
        }

        for(let index in recipe.execution){
            let step = $(`<li></li>`);
            step.text(recipe.execution[index]);
            execution.append(step);
        }

        listOfNutritions = recipe.getNutritionalValues();

        let proteinValue = $(`<li>Protein: ${listOfNutritions[0]/recipe.recommendedPortions*numberOfPortions}g </li>`);
        let satFatValue = $(`<li>Saturated Fat: ${listOfNutritions[1]/recipe.recommendedPortions*numberOfPortions}g </li>`);
        let polSatFatValue = $(`<li>Polyunsaturated Fat: ${listOfNutritions[2]/recipe.recommendedPortions*numberOfPortions}g</li>`);
        let monSatFatValue = $(`<li>Monounsaturated Fat: ${listOfNutritions[3]/recipe.recommendedPortions*numberOfPortions}g</li>`);
        let saltValue = $(`<li>Salt: ${listOfNutritions[4]/recipe.recommendedPortions*numberOfPortions}g</li>`);
        let carbsValue = $(`<li>Carbohydrates: ${listOfNutritions[5]/recipe.recommendedPortions*numberOfPortions}g</li>`);
        let kcalValue = $(`<li>kCal: ${listOfNutritions[6]/recipe.recommendedPortions*numberOfPortions}</li>`);
        
        nutrition.append(proteinValue);
        nutrition.append(satFatValue);
        nutrition.append(polSatFatValue);
        nutrition.append(monSatFatValue);
        nutrition.append(saltValue);
        nutrition.append(carbsValue);
        nutrition.append(kcalValue);

        nutritionalValues.append(nutrition);


        title.text(recipe.title);
        div.append(title);
        div.append(img);
        div.append(ingredientList);
        div.append(execution);
        div.append(nutritionalValues);

        $('.content').append(div);
    }

    static appendDropDown(selectedOptionString){
        let selectedOption = parseInt(selectedOptionString);
        let html = `<label class = "changeNumberLabel">Number of portions:</label><select class = "selectedNumberOfPortions">
        <option `+ (selectedOption === 1 ? "selected" : "") + ` value = "1">1</option>
        <option `+ (selectedOption === 2 ? "selected" : "") + ` value = "2">2</option>
        <option `+ (selectedOption === 3 ? "selected" : "") + ` value = "3">3</option>
        <option ` + (selectedOption === 4 ? "selected" : "") + ` value = "4">4</option>
        <option `+ (selectedOption === 5 ? "selected" : "") + ` value = "5">5</option>
        <option `+ (selectedOption === 6 ? "selected" : "") + ` value = "6">6</option>
        <option `+ (selectedOption === 8 ? "selected" : "") + ` value = "8">8</option>
        <option `+ (selectedOption === 10 ? "selected" : "") + ` value = "10">10</option>
        <option `+ (selectedOption === 12 ? "selected" : "") + ` value = "12">12</option>
    </select>`;

        console.log(html);

        let numberOfPortions = $(html);
        $('.content').before(numberOfPortions);
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

        recipe.img = $('.imgUrl').val();

        return recipe;
    }
}