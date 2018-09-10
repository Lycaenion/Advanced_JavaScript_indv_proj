console.log("Hello");


$( document ).ready(function() {
    console.log( "ready!" );
});

$.getJSON('/json/livsmedelsdata.json', start);


function start(livsmedelsdata){
    // Let jQuery create a document fragment
    // consisting of ul element
    let ul = $('<ul></ul>');
    for(let livsmedel of livsmedelsdata){
      // Create a li tag
      let li = $('<li></li>');
      // Add text inside the li element
      li.text(livsmedel.Namn);
      // Append the li tag to the ul element
      ul.append(li);
    }
    // Append the ul tag to the body element 
    $('body').append(ul);
};

/*
$.getJSON('/json/people.json', start);
 
// Note: Below
// when calling jQuery like this
// $('ul') => grab all ul element in the DOM
// But like this
// $('<ul></ul>') => create a new ul element,
// not added in the DOM yet
function start(people){
  // Let jQuery create a document fragment
  // consisting of ul element
  let ul = $('<ul></ul>');
  for(let person of people){
    // Create a li tag
    let li = $('<li></li>');
    // Add text inside the li element
    li.text(person.name);
    // Append the li tag to the ul element
    ul.append(li);
  }
  // Append the ul tag to the body element 
  $('body').append(ul);
}*/