$.getJSON('/Json/recipes.json', start);

function start(recipes){

  console.log(recipes);

  for(recipe of recipes){
    
    let div = $(`<div></div>`);
    let title = $(`<h1></h1>`);
    let ul = $(`<ul></ul>`);
    let ol = $(`<ol></ol>`);
    

    const ingredients = recipe.ingredients;
    const executions = recipe.execution;

    title.text(recipe.title);

    for(i of ingredients){
      let li = $(`<li></li>`);
      li.text(i.amount + " "+ i.unit + " " + i.name);
      ul.append(li);
    }

    for(step of executions){
      let li = $(`<li></li>`);
      li.text(step);

      console.log(li);
      ol.append(li);
    }



    div.append(title);
    div.append(ul);
    div.append(ol);

    $('.content').append(div);

  }

    
  /*
    for(r of recipe){
      let h1 = $(`<h1></h1>`);

      h1.text(r.title);
      
      div.append(h1);
    }*/
  

  
}