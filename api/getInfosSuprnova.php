<?php

if (isset($_GET['key'],$_GET['currency'],$_GET['algo']) && !empty($_GET['key']) && !empty($_GET['currency']) && !empty($_GET['algo'])) {
  $apiKey = $_GET['key'];
  $currency = $_GET['currency'];

  if ($_GET['algo'] != 'nochoice') {
    $algo = $_GET['algo'];
    $urlApi = 'https://'.$currency.'-'.$algo.'.suprnova.cc';
  } else {
    $urlApi = 'https://'.$currency.'.suprnova.cc';
  }


  $response = file_get_contents($urlApi.'/index.php?page=api&action=getuserhashrate&api_key='.$apiKey);
  $response = json_decode($response);
  $hashrate = $response->getuserhashrate->data;

  $response = file_get_contents($urlApi.'/index.php?page=api&action=getuserbalance&api_key='.$apiKey);
  $response = json_decode($response);
  $confirmed = $response->getuserbalance->data->confirmed;
  $unconfirmed = $response->getuserbalance->data->unconfirmed;

  $response = file_get_contents($urlApi.'/index.php?page=api&action=getuserworkers&api_key='.$apiKey);
  $response = json_decode($response);

  $workers = array();

  if (!empty($response->getuserworkers->data)) {
    foreach ($response->getuserworkers->data as $key => $value) {
      $worker = array('id' => $value->id, 'username' => $value->username, 'hashrate' => $value->hashrate);
      array_push($workers,$worker);
    }
  }

  //echo $response->getuserworkers->data[0]->id;

  //print_r($response);

  $infos = array('hashrate' => $hashrate, 'balanceConfirmed' => $confirmed, 'balanceUnconfirmed' => $unconfirmed, 'workers' => $workers);

  echo json_encode($infos);
}
else {
  $infos = array('hashrate' => 0, 'balanceConfirmed' => 0, 'balanceUnconfirmed' => 0);

  echo json_encode($infos);
}

/*
stdClass Object (
  [getuserworkers] => stdClass Object (
    [version] => 1.0.0 [runtime] => 1.7571449279785 [data] => Array (
      [0] => stdClass Object ( [id] => 124215 [username] => flowp.ccloud0001 [password] => ccloudrig [monitor] => 0 [count_all] => 22 [shares] => 453127.10058594 [hashrate] => 164978.54 [difficulty] => 20596.69 )
      [1] => stdClass Object ( [id] => 124216 [username] => flowp.ccloud0002 [password] => ccloudrig [monitor] => 0 [count_all] => 27 [shares] => 325670.55224609 [hashrate] => 118573.03 [difficulty] => 12061.87 )
      [2] => stdClass Object ( [id] => 127967 [username] => flowp.damif0002 [password] => ccloudrig [monitor] => 0 [count_all] => 13 [shares] => 228894.55712891 [hashrate] => 83337.96 [difficulty] => 17607.27 )
      [3] => stdClass Object ( [id] => 127968 [username] => flowp.damif0001 [password] => ccloudrig [monitor] => 0 [count_all] => 14 [shares] => 306161.96679688 [hashrate] => 111470.17 [difficulty] => 21868.71 )
    )
  )
)
*/

?>
