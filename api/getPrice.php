<?php

$currenciesName = array('xvg' => 'verge', 'bch' => 'bitcoin-cash', 'btg' => 'bitcoin-gold', 'etn' => 'electroneum', 'zec' => 'zcash', 'kmd' => 'komodo', 'dash' => 'dash', 'eth' => 'ethereum', 'mona' => 'monacoin', 'ltc' => 'litecoin', 'ubq' => 'ubiq', 'rvn' => 'ravencoin', 'btx' => 'bitcore');

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
$change1h = $response[0]->percent_change_1h;
$change24h = $response[0]->percent_change_24h;
$change7d = $response[0]->percent_change_7d;

$infos = array('dollar' => $dollarPrice, 'bitcoin' => $bitcoinPrice, 'change1h' => $change1h, 'change24h' => $change24h, 'change7d' => $change7d);

echo json_encode($infos);

?>
