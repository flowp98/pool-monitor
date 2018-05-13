<?php

if (isset($_GET['wallet']) && !empty($_GET['wallet'])) {
  $wallet = $_GET['wallet'];

  $urlApi = 'http://api.yiimp.eu';

  echo "Before";

  //$response = file_get_contents($urlApi.'/api/wallet?address='.$wallet);
  $response = file_get_contents('https://www.zpool.ca/api/walletEx?address=DBCWcgj1tEbyA2UQrbrBT8cBNgTabZDhVP');
  //$response = json_decode($response);
  echo $response;
  echo "After";
  // $hashrate = $response->getuserhashrate->data;
  //
  // $response = file_get_contents($urlApi.'/index.php?page=api&action=getuserbalance&api_key='.$apiKey);
  // $response = json_decode($response);
  // $confirmed = $response->getuserbalance->data->confirmed;
  // $unconfirmed = $response->getuserbalance->data->unconfirmed;
  //
  // $infos = array('hashrate' => $hashrate, 'balanceConfirmed' => $confirmed, 'balanceUnconfirmed' => $unconfirmed);
  //
  // echo json_encode($infos);
}
else {
  $infos = array('hashrate' => 0, 'balanceConfirmed' => 0, 'balanceUnconfirmed' => 0);

  echo json_encode($infos);
}

?>
