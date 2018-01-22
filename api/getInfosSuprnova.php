<?php

if (isset($_GET['key']) && !empty($_GET['key'])) {
  $apiKey = $_GET['key'];
}
else {
  $apiKey = '';
}

$response = file_get_contents('https://xvg-x17.suprnova.cc/index.php?page=api&action=getuserhashrate&api_key='.$apiKey);
$response = json_decode($response);
$hashrate = $response->getuserhashrate->data;

$response = file_get_contents('https://xvg-x17.suprnova.cc/index.php?page=api&action=getuserbalance&api_key='.$apiKey);
$response = json_decode($response);
$confirmed = $response->getuserbalance->data->confirmed;
$unconfirmed = $response->getuserbalance->data->unconfirmed;

$infos = array('hashrate' => $hashrate, 'balanceConfirmed' => $confirmed, 'balanceUnconfirmed' => $unconfirmed);

echo json_encode($infos);

?>
