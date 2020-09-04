<?php 
//importacion de archivos 
require("readFile.php");//archivo de lectura de informacion de inmuebles
require("library.php");//libre de funciones de proceso

$tipo = $_POST["tipo"];

getTipo($tipo,$data);//filtrar tipo de ciudad

?>