<?php

	$executionStartTime = microtime(true) / 1000;
	$url = 'api.openweathermap.org/data/2.5/weather?q=' . $_REQUEST['countryCapital'] . '&units=metric&&appid=785b1b33cb502a9b96154f61d3c0d2d9';
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);	
	$output['data'] = $decode;

	header('Content-Type: application/json; charset=UTF-8');
	echo json_encode($output); 

?>
