
<?php 
//importacion de archivos
require("readFile.php");//archivo de lectura de la informacion de los inmuebles
require("library.php");//libreria de funciones de procesos

$ciudad = $_POST["ciudad"];
$tipo = $_POST["tipo"];
$minimo = $_POST["minimo"];
$maximo = $_POST["maximo"];

getCamposFull($ciudad,$tipo,$minimo,$maximo,$data);//filtrar los  3 campos

?>