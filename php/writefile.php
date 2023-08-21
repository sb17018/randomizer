<?php

    $isOrder = $_POST['randomizeSelect'];
    $isHidden = $_POST['visibilitySelect'];
    $isPassageHidden = $_POST['passageVisibilitySelect'];
    echo $isOrder;
    echo $isHidden;
    echo $isPassageHidden;

    $fileName = "../files/random.txt";
    $myfile = fopen($fileName, "w") or die("Unable to open file!");
    fwrite($myfile, "{\"behavior\":\"".$isOrder."\", "."\"visibility\":\"".$isHidden."\", "."\"passageVisibility\":\"".$isPassageHidden."\"}");
    fclose($myfile);
 
    exit;
?>