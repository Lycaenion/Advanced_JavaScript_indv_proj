module.exports =  class Routes{

    constructor(app){
        this.app = app;
        this.setRoutes();
    }

    setRoutes(){
        const fs = require('fs');

        this.app.get('/categories', (req, res)=>{
            let obj;

            fs.readFile('www/json/recipes.json', 'utf8', function (err, data) {
                if (err) throw err;
                let listOfCategories = [];
                obj = JSON.parse(data);

                for(let o of obj){
                    listOfCategories.push(o.categories);
                }

                res.send(listOfCategories);
            });
        });

        this.app.get('/recipes', (req, res)=>{
            //return recipes based on query parameters
            //if no query parameters, all recipes will be returned
            
            let allRecipes;
            let returnedRecipes = [];          

            fs.readFile('www/json/recipes.json', 'utf8', function(err, data){
                if(err) throw err;
                allRecipes = JSON.parse(data);
                let categoryUndefined = (req.query["category"] === undefined);
                let substringUndefined = (req.query["substring"] === undefined);

                for(let recipeIndex in allRecipes){

                    let recipe = allRecipes[recipeIndex];
                    let passesCategory = false;
                    let passesSubstring = false;

                    if(categoryUndefined){
                        passesCategory = true;
                    }else{
                        for(let categoryIndex in recipe.categories){
                            if(req.query["category"] === recipe.categories[categoryIndex]){
                                passesCategory = true; 
                            }
                        }
                    }
                    if(substringUndefined){
                        passesSubstring = true;
                    }else{
                        let title = recipe.title.toUpperCase();
                        let substring = req.query["substring"].toUpperCase();
                        if(title.indexOf(substring) > -1){
                            passesSubstring = true;
                        }
                    } 

                    if(passesCategory && passesSubstring){
                        returnedRecipes.push(recipe);
                    }
                }
                res.send(returnedRecipes);
            });
        });
    }
}