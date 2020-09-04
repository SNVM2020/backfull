<?php 
//importacion de archivo
require("readFile.php");//archivo de lectura de la informacion de los inmuebles
require("library.php");// libreria que incluye las funciones de procesos

$minimo = $_POST["minimo"];
$maximo = $_POST["maximo"];
$tipo = $_POST["tipo"];

getPrecioYtipo($minimo,$maximo,$tipo,$data);//filtrar el precio  y tipo de datos 
?>