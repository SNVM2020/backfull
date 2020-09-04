<?php 
$openFile = fopen("../data.json","r");
$data_read = fread($openFile,filesize("../data.json"));
$data  = json_decode($data_read,true);
fclose($openFile);

?>