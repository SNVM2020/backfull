/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página*/
var option;
var precio;
var formdata =  new FormData()
var minimo = [];
var maximo = [];

$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    onStart: function (data){
    //console.log(data)
    }
    ,
    onChange:function(data){
      var inicio = data.from;
      minimo.push(inicio);
    }
    ,
    onFinish:function(data){
      var final = data.to;
      maximo.push(final);
    },
    onUpdate: function (data) {
      console.log(data.from_percent);
    },
    step: 1,
    from_fixed: false,  
    to_fixed: false,
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}

function validacionNavegador(){

var agente = window.navigator.userAgent;
  
  if(agente.indexOf("Firefox") != -1){
    $("#vidFondo").remove();
    $("body").addClass("fondo");
    $(".colContenido").addClass("colContenido-infoEx");
  }
  else{
    console.log("otro navegador")
    $("video").attr("src","./video/publicidad.mp4");
    $("video").attr("id","vidFondo");
    $(".colContenido").addClass("colContenido-infoIl");
    playVideoOnScroll();
  }

}

function llenarSelectCiudad(){//llenar los selectores ciudad

var ciudad = ["New York","Orlando", "Los Angeles","Houston","Washington","Miami"];
var subciudad = ["New York","Orlando", "Los Angeles","Houston","Washington","Miami"];

for(var i = 0; i<ciudad.length;i++){
$("#selectCiudad").append($(`<option value='${subciudad[i]}'>${ciudad[i]}</option>`));
}

}
function llenarSelectTipoCiudad(){//llenar los selectores tipo de ciudad

  var tipo = ["Casa","Casa de Campo", "Apartamento"];
  var subTipo =  ["Casa","Casa de Campo", "Apartamento"];
  
  for(var i = 0; i<tipo.length;i++){
  $("#selectTipo").append($(`<option value='${subTipo[i]}'>${tipo[i]}</option>`));
  }
  
  }

/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.volume = 0;
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.volume = 0;
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}
//procesos de llenar los datos para el envio al metodo ajax de javascript
function procesoPrecio(){

  var getMinimo = minimo.slice(-1);
  var getMaximo = maximo.slice(-1);
  
if(getMinimo != 0 && getMaximo != 0){
  formdata.append("minimo",getMinimo);
  formdata.append("maximo",getMaximo);
}
}

function procesosCiudad(){
  $("#selectCiudad").change(function(event){
    var ciudad =  event.target.value;
    formdata.append("ciudad",ciudad);
  })
}

function procesosTipoCiudad(){
  $("#selectTipo").change(function(event){
   var tipoCiudad =  event.target.value;
    formdata.append("tipo",tipoCiudad)
  }) 
}

$("#submitButton").click(function(event){
  event.preventDefault()

    procesoPrecio();
    procesoValidacion()
      formdata = new FormData();
      maximo = [];
      minimo = [];  
})
function procesoValidacion(){ //proceo se validacion segun  el rango  de version selecccionada

  var lengthForm =  Array.from(formdata.entries()).length;
 
  if(lengthForm != 0){
    if(lengthForm == 1 && formdata.has("ciudad") == true){
      
       ajaxAsynCiudad();
    }
    else if(lengthForm == 1 && formdata.has("tipo") == true){
   
     ajaxAsynTipo(formdata);
    }
    else if(lengthForm == 2 && formdata.has("ciudad") && formdata.has("tipo") == true){
      ajaxAsynCiudad_Tipo();

    }
    else if(lengthForm == 2 && formdata.has("minimo") && formdata.has("maximo")){
      ajaxAsynPrecio();
    }
    else if(lengthForm == 3 && formdata.has("ciudad") == true){
      ajaxAsynPrecio_Ciudad();
    }
    else if(lengthForm == 3 && formdata.has("tipo") == true){
      ajaxAsynPrecio_Tipo();
    }
    else{
      ajaxAsynDatos_Completos();
    }
  }    
}
$("#mostrarTodos").click(function(){
  ajaxAsynMostrarTodos();
})

//se implementando los metodos ajax para realizar peticiones  de acuerdo a los datos seleccionados
function ajaxAsynCiudad(){

  $.ajax({
    url: "./server/Ciudad.php",
    cache: false,
    contentType:false,
    processData: false,
    data:formdata,
    type:"post",
    success:function(data){
     data = JSON.parse(data);
     var cantidad = data.cantidad;
     if( vaciarContenedor() != 0){
       $(".contenedor_compras").children().remove();
        for(var i = 0;i<cantidad;i++){ //mostrar los datos en la pagina
          $(".contenedor_compras").append($(
            '<div class="etiqueta_info card">'+
            '<div class="etiqueta-img">'+
              '<img src="./img/home.jpg" class="formato-img"/>'+
            '</div>'+
            '<div class="etiqueta_content">'+
             `<p class="id">ID: ${data.id[i]}</p>`+
              `<p class="direccion">Direccion: ${data.direccion[i]}</p>`+
              `<p class="ciudad">Ciudad: ${data.ciudad}</p>`+
              `<p class="telefono">Telefono: ${data.telefono[i]}</p>`+
              `<p class="codigo-postal">Codigo-Postal: ${data.codigo_postal[i]}</p>`+
              `<p class="tipo">Tipo: ${data.tipo[i]}</p>`+
              `<div class ="div-precio"><p class ="titulo-precio">Precio:</p><p class="precio">$${data.precio[i]}</p></div>`+
              '<div class="div-empresa"><p class="empresa">Bienes Raices</p></div>'+
            '</div>'+
            '</div>'
           ))
         }
     }
    }
    ,
    error:function(){
      console.log("error")
    }
  })
}
function ajaxAsynTipo(){

  $.ajax({
    url: "./server/Tipo.php",
    cache: false,
    contentType:false,
    processData: false,
    data:formdata,
    type:"post",
    success:function(data){
      data = JSON.parse(data);
     var cantidad =  data.cantidad;
     if( vaciarContenedor() != 0){
      $(".contenedor_compras").children().remove();

     for(var i = 0;i<cantidad;i++){
      $(".contenedor_compras").append($(
        '<div class="etiqueta_info card">'+
        '<div class="etiqueta-img">'+
          '<img src="./img/home.jpg" class="formato-img"/>'+
        '</div>'+
        '<div class="etiqueta_content">'+
         `<p class="id">ID: ${data.id[i]}</p>`+
          `<p class="direccion">Direccion: ${data.direccion[i]}</p>`+
          `<p class="ciudad">Ciudad: ${data.ciudad}</p>`+
          `<p class="telefono">Telefono: ${data.telefono[i]}</p>`+
          `<p class="codigo-postal">Codigo-Postal: ${data.codigo_postal[i]}</p>`+
          `<p class="tipo">Tipo: ${data.tipo}</p>`+
          `<div class ="div-precio"><p class ="titulo-precio">Precio:</p><p class="precio">$${data.precio[i]}</p></div>`+
          '<div class="div-empresa"><p class="empresa">Bienes Raices</p></div>'+
        '</div>'+
        '</div>'
       ))
     }
    }
     vaciarContenedor()
    }
    ,
    error:function(){
      console.log("error");
    }
  })
}
function ajaxAsynPrecio(){

  $.ajax({
    url: "./server/Precio.php",
    cache: false,
    contentType:false,
    processData: false,
    data:formdata,
    type:"post",
    success:function(data){
      data = JSON.parse(data);
     var cantidad = data.cantidad;
     if( vaciarContenedor() != 0){
      $(".contenedor_compras").children().remove();

     for(var i = 0;i<cantidad;i++){
      $(".contenedor_compras").append($(
        '<div class="etiqueta_info card">'+
        '<div class="etiqueta-img">'+
          '<img src="./img/home.jpg" class="formato-img"/>'+
        '</div>'+
        '<div class="etiqueta_content">'+
         `<p class="id">ID: ${data.id[i]}</p>`+
          `<p class="direccion">Direccion: ${data.direccion[i]}</p>`+
          `<p class="ciudad">Ciudad: ${data.ciudad[i]}</p>`+
          `<p class="telefono">Telefono: ${data.telefono[i]}</p>`+
          `<p class="codigo-postal">Codigo-Postal: ${data.codigo_postal[i]}</p>`+
          `<p class="tipo">Tipo: ${data.tipo[i]}</p>`+
          `<div class ="div-precio"><p class ="titulo-precio">Precio:</p><p class="precio">$${data.precio[i]}</p></div>`+
          '<div class="div-empresa"><p class="empresa">Bienes Raices</p></div>'+
        '</div>'+
        '</div>'
       ))
     }
     vaciarContenedor();
    }
    }
    ,
    error:function(){ 
      console.log("error")
    }
  })
}
function ajaxAsynCiudad_Tipo(){

  $.ajax({
    url: "./server/Ciudad_Tipo.php",
    cache: false,
    contentType:false,
    processData: false,
    data:formdata,
    type:"post",
    success:function(data){
      data =  JSON.parse(data);
      var cantidad = data.cantidad;
      if( vaciarContenedor() != 0){
        $(".contenedor_compras").children().remove();

      for(var i = 0;i<cantidad;i++){
        $(".contenedor_compras").append($(
          '<div class="etiqueta_info card">'+
          '<div class="etiqueta-img">'+
            '<img src="./img/home.jpg" class="formato-img"/>'+
          '</div>'+
          '<div class="etiqueta_content">'+
           `<p class="id">ID: ${data.id[i]}</p>`+
            `<p class="direccion">Direccion: ${data.direccion[i]}</p>`+
            `<p class="ciudad">Ciudad: ${data.ciudad}</p>`+
            `<p class="telefono">Telefono: ${data.telefono[i]}</p>`+
            `<p class="codigo-postal">Codigo-Postal: ${data.codigo_postal[i]}</p>`+
            `<p class="tipo">Tipo: ${data.tipo}</p>`+
            `<div class ="div-precio"><p class ="titulo-precio">Precio:</p><p class="precio">$${data.precio[i]}</p></div>`+
            '<div class="div-empresa"><p class="empresa">Bienes Raices</p></div>'+
          '</div>'+
          '</div>'
         ))
       }
       vaciarContenedor();
      }
     
    }
    ,
    error:function(){ 
      console.log("error")
    }
  })
}
function ajaxAsynPrecio_Ciudad(){

  $.ajax({
    url: "./server/Precio_Ciudad.php",
    cache: false,
    contentType:false,
    processData: false,
    data:formdata,
    type:"post",
    success:function(data){
      data = JSON.parse(data);
     var cantidad =  data.cantidad;
     if( vaciarContenedor() != 0){
      $(".contenedor_compras").children().remove();

     for(var i = 0;i<cantidad;i++){
      $(".contenedor_compras").append($(
        '<div class="etiqueta_info card card">'+
        '<div class="etiqueta-img">'+
          '<img src="./img/home.jpg" class="formato-img"/>'+
        '</div>'+
        '<div class="etiqueta_content">'+
         `<p class="id">ID: ${data.id[i]}</p>`+
          `<p class="direccion">Direccion: ${data.direccion[i]}</p>`+
          `<p class="ciudad">Ciudad: ${data.ciudad}</p>`+
          `<p class="telefono">Telefono: ${data.telefono[i]}</p>`+
          `<p class="codigo-postal">Codigo-Postal: ${data.codigo_postal[i]}</p>`+
          `<p class="tipo">Tipo: ${data.tipo[i]}</p>`+
          `<div class ="div-precio"><p class ="titulo-precio">Precio:</p><p class="precio">$${data.precio[i]}</p></div>`+
          '<div class="div-empresa"><p class="empresa">Bienes Raices</p></div>'+
        '</div>'+
        '</div>'
       ))
     }
     vaciarContenedor();
    }
    }
    ,
    error:function(){
      console.log("error")
    }
  })
}
function ajaxAsynPrecio_Tipo(){

  $.ajax({
    url: "./server/Precio_Tipo.php",
    cache: false,
    contentType:false,
    processData: false,
    data:formdata,
    type:"post",
    success:function(data){
      data = JSON.parse(data)
     var cantidad =  data.cantidad;
     if( vaciarContenedor() != 0){
      $(".contenedor_compras").children().remove();

     for(var i = 0;i<cantidad;i++){
      $(".contenedor_compras").append($(
        '<div class="etiqueta_info card">'+
        '<div class="etiqueta-img">'+
          '<img src="./img/home.jpg" class="formato-img"/>'+
        '</div>'+
        '<div class="etiqueta_content">'+
         `<p class="id">ID: ${data.id[i]}</p>`+
          `<p class="direccion">Direccion: ${data.direccion[i]}</p>`+
          `<p class="ciudad">Ciudad: ${data.ciudad[i]}</p>`+
          `<p class="telefono">Telefono: ${data.telefono[i]}</p>`+
          `<p class="codigo-postal">Codigo-Postal: ${data.codigo_postal[i]}</p>`+
          `<p class="tipo">Tipo: ${data.tipo}</p>`+
          `<div class ="div-precio"><p class ="titulo-precio">Precio:</p><p class="precio">$${data.precio[i]}</p></div>`+
          '<div class="div-empresa"><p class="empresa">Bienes Raices</p></div>'+
        '</div>'+
        '</div>'
       ))
     }
     vaciarContenedor();
    }
    }
    ,
    error:function(){
      console.log("error")
    }
  })
}
function ajaxAsynDatos_Completos(){

  $.ajax({
    url: "./server/datosCampos.php",
    cache: false,
    contentType:false,
    processData: false,
    data:formdata,
    type:"post",
    success:function(data){
     data =  JSON.parse(data);
     var cantidad = data.cantidad;
     if( vaciarContenedor() != 0){
      $(".contenedor_compras").children().remove();

     for(var i = 0;i<cantidad;i++){
      $(".contenedor_compras").append($(
        '<div class="etiqueta_info card">'+
        '<div class="etiqueta-img">'+
          '<img src="./img/home.jpg" class="formato-img"/>'+
        '</div>'+
        '<div class="etiqueta_content">'+
         `<p class="id">ID: ${data.id[i]}</p>`+
          `<p class="direccion">Direccion: ${data.direccion[i]}</p>`+
          `<p class="ciudad">Ciudad: ${data.ciudad}</p>`+
          `<p class="telefono">Telefono: ${data.telefono[i]}</p>`+
          `<p class="codigo-postal">Codigo-Postal: ${data.codigo_postal[i]}</p>`+
          `<p class="tipo">Tipo: ${data.tipo}</p>`+
          `<div class ="div-precio"><p class ="titulo-precio">Precio:</p><p class="precio">$${data.precio[i]}</p></div>`+
          '<div class="div-empresa"><p class="empresa">Bienes Raices</p></div>'+
        '</div>'+
        '</div>'
       ))
     }
     vaciarContenedor();
    }
    }
    ,
    error:function(){
      console.log("error")
    }
  })
}

function ajaxAsynMostrarTodos(){
   $.ajax({
      url: "./data.json",
      cache: false,
      contentType: false,
      type: "get",
      success:function(data){
      if( vaciarContenedor() != 0){
      $(".contenedor_compras").children().remove();

      for(var i = 0;i<data.length;i++){
         $(".contenedor_compras").append($(
          '<div class="etiqueta_info card">'+
          '<div class="etiqueta-img">'+
            '<img src="./img/home.jpg" class="formato-img"/>'+
          '</div>'+
          '<div class="etiqueta_content">'+
           `<p class="id">ID: ${data[i].Id}</p>`+
            `<p class="direccion">Direccion: ${data[i].Direccion}</p>`+
            `<p class="ciudad">Ciudad: ${data[i].Ciudad}</p>`+
            `<p class="telefono">Telefono: ${data[i].Telefono}</p>`+
            `<p class="codigo-postal">Codigo-Postal: ${data[i].Codigo_Postal}</p>`+
            `<p class="tipo">Tipo: ${data[i].Tipo}</p>`+
            `<div class ="div-precio"><p class ="titulo-precio">Precio:</p><p class="precio">${data[i].Precio}</p></div>`+
            '<div class="div-empresa"><p class="empresa">Bienes Raices</p></div>'+
          '</div>'+
          '</div>'
         ))
      }
      vaciarContenedor();
      }
      }
      ,
      error: function(){
        console.log("error");
      }
   })
}
function vaciarContenedor(){
  var cantidad = $(".contenedor_compras").children().length;
}
//funciones de procesoss
inicializarSlider()
validacionNavegador();
llenarSelectCiudad();
llenarSelectTipoCiudad();
procesosCiudad();
procesosTipoCiudad();



