<?php 
//archivo de importacion 
require("readFile.php");//archivo de lectura de la informacion de los inmuebles
require("library.php");//libreria de las funcione de proceso

$minimo = $_POST["minimo"];
$maximo = $_POST["maximo"];
$ciudad = $_POST["ciudad"];

getPrecioYCuidad($minimo,$maximo,$ciudad,$data);//filtrar precio y ciudad

?>