<?php 
//importacion de archivos
require("readFile.php");//importacion de archivo de lectura
require("library.php");//importacion de libreria de funciones de proceso

$ciudad = $_POST["ciudad"];

getCiudad($ciudad,$data);//filtrar los datos de la cuidad

?>