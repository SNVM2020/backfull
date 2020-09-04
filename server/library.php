<?php 

function  getCiudad($campo,$json){
  $cantidad = 0;

  $id = array();
  $direccion = array();
  $telefono = array();
  $codigo_postal = array();
  $tipo = array();
  $precio = array();

  foreach($json as $ciudad){
    $simbolo =  str_replace("$","",$ciudad["Precio"]);
    $limpio = str_replace(",","",$simbolo);

   if($campo == $ciudad["Ciudad"]){

         array_push($id,$ciudad["Id"]);
         array_push($direccion,$ciudad["Direccion"]);
         $response["ciudad"] = $ciudad["Ciudad"];
         array_push($telefono,$ciudad["Telefono"]);
         array_push($codigo_postal,$ciudad["Codigo_Postal"]);
         array_push($tipo,$ciudad["Tipo"]);
         array_push($precio,$limpio);
         $cantidad++;
   }
  }
  $response["id"] = $id;
  $response["direccion"] = $direccion;
  $response["telefono"] = $telefono;
  $response["codigo_postal"] = $codigo_postal;
  $response["tipo"] = $tipo;
  $response["precio"] = $precio;
  $response["cantidad"] = $cantidad;
  echo json_encode($response);
}

function  getTipo($campo,$json){
    $cantidad = 0;
    $id = array();
    $direccion = array();
    $ciudad = array();
    $telefono = array();
    $codigo_postal = array();
    $precio = array();

    foreach($json as $tipo){
      $simbolo =  str_replace("$","",$tipo["Precio"]);
      $limpio = str_replace(",","",$simbolo);

     if($campo == $tipo["Tipo"]){
         $response["tipo"] = $tipo["Tipo"];
         array_push($id,$tipo["Id"]);
         array_push($direccion,$tipo["Direccion"]);
         array_push($telefono,$tipo["Telefono"]);
         array_push($codigo_postal,$tipo["Codigo_Postal"]);
         array_push($precio,$limpio);
        $cantidad++;
     }
    }
    $response["id"] = $id;
    $response["ciudad"] = $ciudad;
    $response["direccion"] = $direccion;
    $response["telefono"] = $telefono;
    $response["codigo_postal"] = $codigo_postal;
    $response["precio"] = $precio;
    $response["cantidad"] = $cantidad;
    echo json_encode($response);
  }

function  getPrecio($min,$max,$json){
    $cantidad = 0;
    $id = array();
    $direccion = array();
    $ciudad = array();
    $telefono = array();
    $codigo_postal = array();
    $tipo = array();
    $saldo = array();

    foreach($json as $precio){
       $simbolo =  str_replace("$","",$precio["Precio"]);
       $limpio = str_replace(",","",$simbolo);
        if( $limpio >= $min  &&  $limpio <= $max){
         array_push($id,$precio["Id"]);
         array_push($direccion,$precio["Direccion"]);
         array_push($ciudad,$precio["Ciudad"]);
         array_push($telefono,$precio["Telefono"]);
         array_push($codigo_postal,$precio["Codigo_Postal"]);
         array_push($tipo,$precio["Tipo"]); 
         array_push($saldo,$limpio);   
          $cantidad++;
        }
    }
    $response["id"] = $id;
    $response["ciudad"] = $ciudad;
    $response["direccion"] = $direccion;
    $response["telefono"] = $telefono;
    $response["codigo_postal"] = $codigo_postal;
    $response["tipo"] = $tipo;
    $response["precio"] = $saldo;
    $response["cantidad"] = $cantidad;
    echo json_encode($response);
}  

function getCiudadYTipo($city,$type,$json){

    $cantidad = 0;
    $id = array();
    $direccion = array();
    $telefono = array();
    $codigo_postal = array();
    $precio = array();

  foreach($json as $opcion2){
    $simbolo =  str_replace("$","",$opcion2["Precio"]);
    $limpio = str_replace(",","",$simbolo);
       if($city == $opcion2["Ciudad"] && $type == $opcion2["Tipo"]){
          $response["ciudad"] = $opcion2["Ciudad"];
          $response["tipo"] = $opcion2["Tipo"];
          array_push($id,$opcion2["Id"]);
          array_push($direccion,$opcion2["Direccion"]);
          array_push($telefono,$opcion2["Telefono"]);
          array_push($codigo_postal,$opcion2["Codigo_Postal"]);
          array_push($precio,$limpio);
          $cantidad++;
       }
  }
  $response["id"] = $id;
  $response["direccion"] = $direccion;
  $response["telefono"] = $telefono;
  $response["codigo_postal"] = $codigo_postal;
  $response["precio"] = $precio;
  $response["cantidad"] = $cantidad;
  echo json_encode($response);
}

function  getPrecioYCuidad($min,$max,$city,$json){

  $cantidad = 0;
  $id = array();
  $direccion = array();
  $telefono = array();
  $codigo_postal = array();
  $tipo = array();
  $precio = array();

 foreach($json as $opcion2){

    $simbolo =  str_replace("$","",$opcion2["Precio"]);
    $limpio = str_replace(",","",$simbolo);

      if($limpio >= $min && $limpio <= $max && $city == $opcion2["Ciudad"]){
        $response["ciudad"] = $opcion2["Ciudad"];
        array_push($id,$opcion2["Id"]);
        array_push($direccion,$opcion2["Direccion"]);
        array_push($telefono,$opcion2["Telefono"]);
        array_push($codigo_postal,$opcion2["Codigo_Postal"]);
        array_push($tipo,$opcion2["Tipo"]);
        array_push($precio,$limpio);
        $cantidad++;
      }
 }
    $response["id"] = $id;
    $response["direccion"] = $direccion;
    $response["telefono"] = $telefono;
    $response["codigo_postal"] = $codigo_postal;
    $response["tipo"] = $tipo;
    $response["precio"] = $precio;
    $response["cantidad"] = $cantidad;
    echo json_encode($response);
}

function getPrecioYtipo($min,$max,$type,$json){
  $cantidad = 0;
  $id = array();
  $direccion = array();
  $ciudad = array();
  $telefono = array();
  $codigo_postal = array();
  $precio = array();

  foreach($json as $opcion2){
    $simbolo =  str_replace("$","",$opcion2["Precio"]);
    $limpio = str_replace(",","",$simbolo);
    if($limpio >= $min && $limpio <= $max && $type == $opcion2["Tipo"]){
      $response["tipo"] = $opcion2["Tipo"];
      array_push($id,$opcion2["Id"]);
      array_push($direccion,$opcion2["Direccion"]);
      array_push($ciudad,$opcion2["Ciudad"]);
      array_push($telefono,$opcion2["Telefono"]);
      array_push($codigo_postal,$opcion2["Codigo_Postal"]);
      array_push($precio,$limpio);
      $cantidad++;
    }  
  }
    $response["id"] = $id;
    $response["direccion"] = $direccion;
    $response["ciudad"] = $ciudad;
    $response["telefono"] = $telefono;
    $response["codigo_postal"] = $codigo_postal;
    $response["precio"] = $precio;
    $response["cantidad"] = $cantidad;
  echo json_encode($response);
}

function getCamposFull($city,$type,$min,$max,$json){
    $cantidad = 0;
    $id = array();
    $direccion = array();
    $telefono = array();
    $codigo_postal = array();
    $precio = array();  

   foreach($json as $opcion3){
    $simbolo =  str_replace("$","",$opcion3["Precio"]);
    $limpio = str_replace(",","",$simbolo);

    if($city == $opcion3["Ciudad"] && $type == $opcion3["Tipo"] && $limpio >= $min && $limpio <= $max){
       $response["ciudad"] = $opcion3["Ciudad"];
       $response["tipo"] = $opcion3["Tipo"];
       array_push($id,$opcion3["Id"]);
       array_push($direccion,$opcion3["Direccion"]);
       array_push($telefono,$opcion3["Telefono"]);
       array_push($codigo_postal,$opcion3["Codigo_Postal"]);
       array_push($precio,$limpio);
       $cantidad++;
    }
   }
    $response["id"] = $id;
    $response["direccion"] = $direccion;
    $response["telefono"] = $telefono;
    $response["codigo_postal"] = $codigo_postal;
    $response["precio"] = $precio;
    $response["cantidad"] = $cantidad;
    echo json_encode($response);
}
?>
