class WebHandler{
    
    static displayRecipes(category, substring){
        
        $('.content').empty();
        
        let recipes = RequestHandler.retrieveRecipes(category, substring); 

        for(let index in recipes){

            let div = $(`<div id=${recipes[index]._id}></div>`);
            let title = $(`<p></p>`);
            let img = $(`<img src=${recipes[index]._imgUrl}>`);

            title.text(recipes[index]._title);
            div.append(img);
            div.append(title);
        
            $('.content').append(div);
        }
    }

    static displayRecipeDetails(id){
        $('.content').empty();
    
        let recipe = RequestHandler.retrieveRecipe(id);
        let recipe2 = new Recipe();

        Object.assign(recipe2, recipe)

        console.log(recipe2.title);
        
        let div = $(`<div id="recipe"></div>`);
        let title = $(`<h1></h1>`);
        let ingredientList = $(`<ul id="ingredients"></ul>`)
        let img = $(`<img src=${recipe._imgUrl}>`)

        for(let index in recipe._ingredients){
            let ingredient = $(`<li></li>`);
            let ingredientDetail = recipe._ingredients[index];
            ingredient.text(ingredientDetail.amount + " " + ingredientDetail.unit + " " + ingredientDetail.name);
            ingredientList.append(ingredient);
        }

        title.text(recipe._title);
        div.append(title);
        div.append(img);
        div.append(ingredientList);

        $('.content').append(div);

    }
}