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
        let ingredientLabel = $(`<label>Ingredients:</label>`);
        let ingredientList = $(`<ul id="ingredients"></ul>`);
        let img = $(`<img src=${recipe.img}>`);
        let execution = $(`<ol></ol>`);
        let nutritionLabel = $(`<label>Nutritional values/portion:</label>`);
        let nutritionalValues = $(`<section class = "nutritionalValues"</section>`);
        let listOfNutritions = [];
        let nutrition = $(`<ul></ul>`);
        let descriptionLabel = $(`<label>Description:</label>`);
        let description = $(`<div id="description"></div`);

        for(let index in recipe.ingredients){
            let ingredient = $(`<li></li>`);
            let ingredientDetail = recipe.ingredients[index];
            ingredient.text(ingredientDetail._amount/recipe.recommendedPortions*numberOfPortions + " " + ingredientDetail._unit + " " + ingredientDetail._englishName);
            ingredientList.append(ingredient);
        }

        for(let index in recipe.execution){
            let step = $(`<li></li>`);
            step.text(recipe.execution[index]);
            execution.append(step);
        }

        listOfNutritions = recipe.getNutritionalValues();

        let polSat = listOfNutritions[2]/recipe.recommendedPortions;
        let protein = listOfNutritions[0]/recipe.recommendedPortions;
        let monSat = listOfNutritions[3]/recipe.recommendedPortions;
        let satFat = listOfNutritions[1]/recipe.recommendedPortions;
        let salt = listOfNutritions[4]/recipe.recommendedPortions;
        let carbs = listOfNutritions[5]/recipe.recommendedPortions;
        let kcal = listOfNutritions[6]/recipe.recommendedPortions;
        

        let proteinValue = $(`<li>Protein: ${protein.toFixed(2)}g </li>`);
        let satFatValue = $(`<li>Saturated Fat: ${satFat.toFixed(2)}g </li>`);
        let polSatFatValue = $(`<li>Polyunsaturated Fat: ${polSat.toFixed(2)}g</li>`);
        let monSatFatValue = $(`<li>Monounsaturated Fat: ${monSat.toFixed(2)}g</li>`);
        let saltValue = $(`<li>Salt: ${salt.toFixed(2)}g</li>`);
        let carbsValue = $(`<li>Carbohydrates: ${carbs.toFixed(2)}g</li>`);
        let kcalValue = $(`<li>kCal: ${kcal.toFixed(2)}</li>`);
        
        nutritionalValues.append(nutritionLabel);
        nutrition.append(proteinValue);
        nutrition.append(satFatValue);
        nutrition.append(polSatFatValue);
        nutrition.append(monSatFatValue);
        nutrition.append(saltValue);
        nutrition.append(carbsValue);
        nutrition.append(kcalValue);

        nutritionalValues.append(nutrition);

        title.text(recipe.title);
        description.text(recipe.description);

        div.append(title);
        div.append(img);
        div.append(descriptionLabel);
        div.append(description);
        div.append(ingredientLabel);
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
                                <option value = "tsp">tsp</option>
                                <option value = "tbs">tbs</option>
                                <option value = "cl">cl</option>
                                <option value = "g">g</option>
                                <option value = "kg">kg</option>
                                <option value = "pcs">pcs</option>
                            </select>`);
        let inputIngredient = $(`<input type="text" class="ingredient" placeholder="Ingredient">`);
        let ingredientName = $(`<input type="text" class="ingredientName" placeholder= "Ingredient name in English">`);
        let inputUnitInGrams = $(`<input type="text" class="oneUnitInGrams" placeholder="One unit in grams">`);
    
        section.append(inputAmount);
        section.append(selectUnit);
        section.append(inputIngredient);
        section.append(ingredientName);
        section.append(inputUnitInGrams);;
        
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
            ingredient.englishName = $(this).children().eq(3).val();
            console.log(ingredient.englishName);
            ingredient.oneUnitInGrams = $(this).children().eq(4).val()
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
        recipe.description = $('.description').val();
        recipe.img = $('.imgUrl').val();

        return recipe;
    }
}