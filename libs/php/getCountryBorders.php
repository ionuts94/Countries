<?php

    $string = file_get_contents("../../countryBorders.geo.json");
    $jsonObj = json_decode($string, true);

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($jsonObj);

?>