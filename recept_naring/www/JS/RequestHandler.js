class RequestHandler{

    static retrieveRecipes(category, substring){
        let url = '/recipes?'; 
        let recipes = [];
        var json;

        if(category != undefined){
            url = url + 'category=' + category;
        }
        if(substring != undefined){
            url = url + '&substring=' + substring;
        }
        
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

        for(let index in json){
            let recipe = Object.assign(new Recipe(), json[index]);  
            recipes.push(recipe);
        }
        return recipes;
    }

    static retrieveRecipe(id){
        var json;
        var collectRecipe = (function () {
            $.ajax({
                type : "GET",
                async : false,
                url: '/recipes/'+id,
                dataType: "json",
                success: function (data) {
                    json = data;
                }
            });
        })();
        let recipe = Object.assign(new Recipe(), json);
        return recipe;
    }

    static retrieveIngredient(id){
        var json;
        var collectIngredient = (function () {
            $.ajax({
                type : "GET",
                async : false,
                url: '/ingredients/'+id,
                dataType: "json",
                success: function (data) {
                    json = data;
                }
            });
        })();
        return json;
    }

    static retrieveIngredientTitleList(){
        var json;
        var collectIngredient = (function () {
            $.ajax({
                type : "GET",
                async : false,
                url: '/ingredientTitles',
                dataType: "json",
                success: function (data) {
                    json = data;
                }
            });
        })();
        return json;
    }

    static retrieveIngredientIdsList(){
        var json;
        var collectIngredient = (function () {
            $.ajax({
                type : "GET",
                async : false,
                url: '/ingredientIds',
                dataType: "json",
                success: function (data) {
                    json = data;
                }
            });
        })();
        return json;
    }

    static addRecipe(recipe){
        let recipeJson = JSON.stringify(recipe);
        console.log("we are here");
        $.ajax({
            type: "POST",
            url: '/addRecipe',
            contentType: "application/json",
            data: recipeJson,
            success: function (response) {
                if (response == 'ok') {
                    alert('Recipe added');
                }else{
                    alert('Something went wrong')
                }
            }
        });
    }
}