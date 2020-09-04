<?php 
//archivos de importacion
require("readFile.php");// archivos de lectura de la informacion de los inmuebles
require("library.php");//libreria de  las funciones de procesos

$minimo = $_POST["minimo"];
$maximo = $_POST["maximo"];


getPrecio($minimo,$maximo,$data);//filtrar precio

?>