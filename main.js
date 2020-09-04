$(document).ready(function(){
  $( "#formP" ).submit(function( event ) {
    event.preventDefault();
    var valueNumber = $("#numberP").val();

    //$(".pokeImg").empty();
    $(".pokeInfo").empty();
    $(".pStats").empty();
    $(".pokeDescripcion").empty();
    $(".pokeSprites").empty();
    $(".pokeTipo").empty();
    //console.log(valueNumber);
    if(valueNumber !== null && valueNumber !== undefined) {
      $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${valueNumber}/`, //ajax
      }).done(function( data ) {

        //Tipos 
    if(data.types.length == 2){
      $(".pokeTipo").append(
      `<ul class="list-group text-white">
      <li class="list-group-item ${data.types[0].type.name} border border-dark rounded">${data.types[0].type.name}</li>
      <li class="list-group-item ${data.types[1].type.name} border border-dark rounded">${data.types[1].type.name}</li>
      </ul>`).hide().fadeIn(2000)
      
    } else {$(".pokeTipo").append(
      `<ul class="list-group text-white">
      <li class="list-group-item ${data.types[0].type.name} border border-dark rounded">${data.types[0].type.name}</li>     
      </ul>`).hide().fadeIn(2000)
    };
        //Grafico de Radar !
        
am4core.useTheme(am4themes_animated);

var chart = am4core.create("chartdiv", am4charts.RadarChart);

/* Add data */
chart.data = [{
  "stats": "Hp",
  "value": data.stats[0].base_stat
}, {
  "stats": "Attack",
  "value": data.stats[1].base_stat
}, {
  "stats": "Defense",
  "value": data.stats[2].base_stat
}, {
  "stats": "Special\n Attack",
  "value": data.stats[3].base_stat
}, {
  "stats": "Special\n Defense",
  "value": data.stats[4].base_stat
}, {
  "stats": "Speed",
  "value": data.stats[5].base_stat
}];

/* Create axes */
var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "stats";

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.axisFills.template.fill = chart.colors.getIndex(2);
valueAxis.renderer.axisFills.template.fillOpacity = 0.05;

/* Create and configure series */
var series = chart.series.push(new am4charts.RadarSeries());
series.dataFields.valueY = "value";
series.dataFields.categoryX = "stats";
series.name = "Sales";
series.strokeWidth = 3;


      //INFORMACION POKEMON  
       
//Nombre Pokemon
$(".pokeInfo").append(`<div class="text-center"> <h3>${data.name}<h3> <div>`).hide().fadeIn(2000); //jquery
//Imagen pokemon, si no existe official-art usar sprite
if(data.sprites.other["official-artwork"].front_default === null){
  $(".pokeInfo").append(`<img src="${data.sprites.front_default}" alt="${data.name}" height="400" weidth="300"> <img>`);  
} else {
  $(".pokeInfo").append(`<img class="rounded float-center" src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}" height="400" weidth="300"> <img>`);
}
//Peso del pokemon
$(".pokeInfo").append(`<div class="text-center"> <p>Peso: ${data.weight/10} [kg]<p> <div>`); 

//Sprites -- Si no tiene de espalda, usar solo frente
if(data.sprites.back_default === null){
  $(".pokeSprites").append(`<img src="${data.sprites.front_default}" alt="${data.name}"> <img>`, `<img src="${data.sprites.front_shiny}" alt="${data.name}"> <img>`).hide().fadeIn(2000);
    }else{ $(".pokeSprites").append(`<img src="${data.sprites.front_default}" alt="${data.name}"> <img>`,`<img src="${data.sprites.back_default}" alt="${data.name}"> <img>`
    ,`<img src="${data.sprites.front_shiny}" alt="${data.name}"> <img>`,`<img src="${data.sprites.back_shiny}" alt="${data.name}"> <img>` ).hide().fadeIn(2000); 
}      
 
      });
    }
   //Descripcion Pokemon en español
      $.ajax({
      url: `https://pokeapi.co/api/v2/pokemon-species/${valueNumber}/`,
    }).done(function( data ) {
      for(var i=0; i<data.flavor_text_entries.length;i++){  

        var tipos=[];
        if(data.flavor_text_entries[i].language.name == "es"){          
          tipos.push(data.flavor_text_entries[i].flavor_text);   
              break; 
        } 
      }  $(".pokeDescripcion").append(`<div class="text-center"> <p>"${tipos}"<p> <div>`).hide().fadeIn(2000);
      
    }
    );

});
});
$(document).on("click", "#lupa", function(){
 
      $("#pokedex").fadeIn(3000);       
  
}) 



