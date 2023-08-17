<?php

$isOrder = $_POST['randomizeSelect'];
$isHidden = $_POST['visibilitySelect'];
echo $isOrder;
echo $isHidden;

$fileName = "../files/random.txt";
$myfile = fopen($fileName, "w") or die("Unable to open file!");
fwrite($myfile, "{\"behavior\":\"".$isOrder."\", "."\"visibility\":\"".$isHidden."\"}");
fclose($myfile);
 
exit;
?>