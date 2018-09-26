class webHandler{
   /*static displayRecipe(recipe){
        let displayDiv = $(`<div></div>`)   
        let title = $(`<h1></h1>`);
        let listOfIngredients = $(`<ul></ul>`);
        let execution = $(`<ol></ol>`)

        for(let ingredients in recipe.ingredients){
            let ingredient = $(`<li></li>`);
            ingredient.text(ingredients.amount + " " + ingredients.unit +" " + ingredients.name+ " ");
            listOfIngredients.append(ingredient);
        }

        for(let steps in recipe.execution){
            let step = $(`<li></li>`);
            step.text(steps);
            execution.append(step);
        }

   }*/
    static retrieveRecipes(category, substring){
        let url = '/recipes?'; 

        if(category != undefined){
            url = url + 'category=' + category;
        }
        if(substring != undefined){
            url = url + '&substring=' + substring;
        }

        var json = null;
        var collectRecipes = (function () {
            $.ajax({
                type : "GET",
                async : false,
                url: url,
                dataType: "json",
                success: function (data) {
                    json = data;
                }
            });
        })();
        return json;
    }

    static displayAllRecipes(){
        console.log(this.retrieveRecipes(undefined,"tomato"));
    }
}