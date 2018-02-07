<?php

$currenciesName = array('xvg' => 'verge', 'bch' => 'bitcoin-cash', 'btg' => 'bitcoin-gold', 'etn' => 'electroneum', 'zec' => 'zcash', 'kmd' => 'komodo', 'dash' => 'dash', 'eth' => 'ethereum', 'mona' => 'monacoin', 'ltc' => 'litecoin', 'ubq' => 'ubiq');

if (isset($_GET['currency']) && !empty($_GET['currency'])) {
  if (array_key_exists($_GET['currency'],$currenciesName)) {
    $currency = $currenciesName[$_GET['currency']];
  }
  else {
    $currency = $_GET['currency'];
  }
}
else {
  $currency = '';
}

$response = file_get_contents('https://api.coinmarketcap.com/v1/ticker/'.$currency.'/');
$response = json_decode($response);
$dollarPrice = $response[0]->price_usd;
$bitcoinPrice = $response[0]->price_btc;

$infos = array('dollar' => $dollarPrice, 'bitcoin' => $bitcoinPrice);

echo json_encode($infos);

?>
