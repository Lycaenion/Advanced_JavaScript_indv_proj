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
    get img(){
        return this._img;
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
    set img(value){
        this._img = value;
    }

    
       
}