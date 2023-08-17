<?php

 header('Cache-Control: no-cache');
 header("Access-Control-Allow-Origin: *");
 header("Content-Type: text/event-stream");


//  while(true){
    $fileName = "../files/random.txt";
    $openedFile = fopen($fileName, "r+") or die("Unable to open file!");
    $readFile = fread($openedFile,filesize($fileName));
    echo "data: {$readFile}\n\n";
  
    // Flush buffer (force sending data to client)
    flush();
  
?>