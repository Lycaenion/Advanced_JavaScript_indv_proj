console.log("Hello");

$.getJSON('/json/recipe.json', start);

function start(recipe){
    let title = $('<div></div>');


    for(let component of recipe){

        let recept = $('<h1></h1>');
        recept.text(component.title);
        console.log(recept.text);

        title.append(recept);
    }

    console.log(title);
    $('.content').append(title);
    


    
}