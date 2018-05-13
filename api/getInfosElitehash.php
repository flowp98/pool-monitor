<?php

if (isset($_GET['key'],$_GET['currency'],$_GET['algo']) && !empty($_GET['key']) && !empty($_GET['currency']) && !empty($_GET['algo'])) {
  $wallet = $_GET['key'];
  $currency = $_GET['currency'];

  if ($_GET['algo'] != 'nochoice') {
    $algo = $_GET['algo'];
    $urlApi = 'http://'.$currency.'-'.$algo.'.elitehash.net';
  } else {
    $urlApi = 'http://'.$currency.'.elitehash.net';
  }


  $response = file_get_contents($urlApi.'/stats-rpc.php?addr='.$wallet);
  $response = json_decode($response);

  $confirmed = $response->balance;
  $hashrate = $response->{'1h'}->hashrate;

  //echo $response->getuserworkers->data[0]->id;

  // print_r($response);

  $infos = array('hashrate' => $hashrate, 'balanceConfirmed' => $confirmed);

  echo json_encode($infos);
}
else {
  $infos = array('hashrate' => 0, 'balanceConfirmed' => 0);

  echo json_encode($infos);
}

?>
