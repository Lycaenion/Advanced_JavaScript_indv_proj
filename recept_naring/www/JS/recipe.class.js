class Recipe{
      
    get id(){
        return this._id;
    }
    get title(){
        return this._title;
    }
    get recommendedPortions(){
        return this._recommendedPortions;
    }
    get execution(){
        return this._execution;
    }
    get ingredients(){
        return this._ingredients;
    }
    get categories(){
        return this._categories;
    }
    get description(){
        return this._description;
    }
    get img(){
        return this._imgUrl;
    }
    
    getNutritionalValues(){
        let sumOfProteins = 0;
        let sumOfSatFat = 0;
        let sumOfPolSatFat = 0;
        let sumOfMonSatFat = 0;
        let sumOfSalt = 0;
        let sumOfkcal = 0;
        let sumOfCarbs = 0;

        for(let index in this.ingredients){
            
            let ingredientWeightInGrams = this.ingredients[index]._amount * this.ingredients[index]._oneUnitInGrams;
            for(let index2 in this.ingredients[index]._nutrition){
                let nutrition = this.ingredients[index]._nutrition[index2];
                if(nutrition.Namn === "Protein"){  
                    sumOfProteins = sumOfProteins + (ingredientWeightInGrams*(parseFloat(nutrition.Varde.replace(',', '.')))/100); 
                }
                if(nutrition.Namn === "Salt"){
                    sumOfSalt = sumOfSalt + (ingredientWeightInGrams*(parseFloat(nutrition.Varde.replace(',', '.')))/100); 
                }
                if(nutrition.Namn === "Energi (kcal)"){
                    sumOfkcal = sumOfkcal + (ingredientWeightInGrams*(parseFloat(nutrition.Varde.replace(',', '.'))))/100; 
                }
                if(nutrition.Namn === "Kolhydrater"){
                    sumOfCarbs = sumOfCarbs + (ingredientWeightInGrams*(parseFloat(nutrition.Varde.replace(',', '.'))))/100; 
                }
                if(nutrition.Namn === "Summa mättade fettsyror"){
                    sumOfSatFat = sumOfSatFat + (ingredientWeightInGrams*(parseFloat(nutrition.Varde.replace(',', '.'))))/100; 
                }
                if(nutrition.Namn === "Summa enkelomättade fettsyror"){
                    sumOfMonSatFat = sumOfMonSatFat + (ingredientWeightInGrams*(parseFloat(nutrition.Varde.replace(',', '.'))))/100; 
                }
                if(nutrition.Namn === "Summa fleromättade fettsyror"){
                    sumOfPolSatFat = sumOfPolSatFat + (ingredientWeightInGrams*(parseFloat(nutrition.Varde.replace(',', '.'))))/100; 
                }

            }
        }

        let nutritionalValues = [];
        nutritionalValues.push(sumOfProteins);
        nutritionalValues.push(sumOfSatFat);
        nutritionalValues.push(sumOfPolSatFat);
        nutritionalValues.push(sumOfMonSatFat);
        nutritionalValues.push(sumOfSalt);
        nutritionalValues.push(sumOfCarbs);
        nutritionalValues.push(sumOfkcal);

        return nutritionalValues; 
    }

    set id(value){
        this._id = value;
    }
    set title(value){
        this._title = value;
    }
    set recommendedPortions(value){
        this._recommendedPortions = value;
    }
    set execution(value){
        this._execution = value;
    }
    set ingredients(value){
        this._ingredients = value;
    }
    set categories(value){
        this._categories = value;
    }
    set description(value){
        this._description = value;
    }
    set img(value){
        this._imgUrl = value;
    }

    
       
}