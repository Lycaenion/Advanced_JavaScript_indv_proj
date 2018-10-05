class Ingredient{

    get amount(){
        return this._amount;
    }
    get unit(){
        return this._unit;
    }
    get name(){
        return this._name;
    }
    get englishName(){
        return this._englishName;
    }
    get nutrition(){
        return this._nutrition;
    }
    get oneUnitInGrams(){
       return this._oneUnitInGrams;
    }

    set amount(value){
       this._amount = value;
    }
    set unit(value){
        this._unit = value;
    }
    set name(value){
        this._name = value;
    }
    set nutrition(value){
        this._nutrition = value;
    }
    set oneUnitInGrams(value){
        this._oneUnitInGrams = value;
    }

    set englishName(value){
        this._englishName = value;
    }

}