<?php

    $fileName = "../files/random.txt";
    $openedFile = fopen($fileName, "r+") or die("Unable to open file!");
    $readFile = fread($openedFile,filesize($fileName));
    $aFile = gettype($fileName);
    echo "data: {$aFile}\n\n";

?>