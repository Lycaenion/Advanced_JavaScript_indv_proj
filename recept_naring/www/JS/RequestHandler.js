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
        
        console.log(recipes);
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
}