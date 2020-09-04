<?php 
//importacion de archivos
require("readFile.php");// importacion de archivo de lectura
require("library.php");// importacion de la libreria de las funciones de procesos

$tipo = $_POST["tipo"];
$ciudad = $_POST["ciudad"];

getCiudadYTipo($ciudad,$tipo,$data);//filtrar los datos de ciudad y tipo

?>