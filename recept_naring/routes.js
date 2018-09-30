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
                        for(let categoryIndex in recipe._categories){
                            if(req.query["category"] === recipe._categories[categoryIndex]){
                                passesCategory = true; 
                            }
                        }
                    }
                    if(substringUndefined){
                        passesSubstring = true;
                    }else{
                        let title = recipe._title.toUpperCase();
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

        this.app.get('/recipes/:id', (req, res)=>{

            fs.readFile('www/json/recipes.json', 'utf8', function(err, data){
                if(err) throw err;
                let allRecipes = JSON.parse(data);
                let recipe;

                for(let recipeIndex in allRecipes){
                    if(req.params.id == allRecipes[recipeIndex]._id){
                        recipe = allRecipes[recipeIndex];
                    }
                }
                res.send(recipe);
            });
        })

        this.app.get('/ingredients/:id', (req, res)=>{

            fs.readFile('www/json/ingredients.json', 'utf8', function(err, data){
                if(err) throw err;
                let allIngredients = JSON.parse(data);
                let ingredient;
                
                for(let ingredientIndex in allIngredients){
                    if(req.params.id == allIngredients[ingredientIndex].Nummer){
                        ingredient = allIngredients[ingredientIndex];
                    }
                };
                res.send(ingredient);
            });
        })
        
        this.app.get('/ingredients', (req, res)=>{

            fs.readFile('www/json/ingredients.json', 'utf8', function(err, data){
                if(err) throw err;

                let ingredientList = [];
                let allIngredients = JSON.parse(data);
                let substringUndefined = (req.query["substring"] === undefined);

                if(substringUndefined){
                    for(let index in allIngredients){
                        ingredientList.push(allIngredients[index].Namn)
                    } 
                }else{
                    for(let index in allIngredients){
                        let substring = req.query["substring"].toUpperCase();
                        let ingredientName = allIngredients[index].Namn.toUpperCase();
                        if(ingredientName.indexOf(substring) > -1){

                            ingredientList.push(allIngredients[index].Namn);
                        }
                    }
                }
                res.send(ingredientList);
            });
        });

        this.app.post('/addRecipe', (req, res)=>{
            let data = fs.readFileSync('www/json/test.json');
            let recipes = JSON.parse(data);
            console.log(recipes.length);
            req.body._id = recipes.length+1;
            console.log(req.body);
            recipes.push(req.body);
            fs.writeFileSync('www/json/test.json', JSON.stringify(recipes));
            res.send("ok");
        });
    }
}