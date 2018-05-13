<?php
$infos = array();

if (isset($_COOKIE["pool"])) {
  $infos['pool'] = $_COOKIE["pool"];
  $keyName = 'apiKey'.$_COOKIE["pool"];
  if (isset($_COOKIE[$keyName])) {
    $infos['apiKey'] = $_COOKIE[$keyName];
  } else {
    $infos['apiKey'] = 'NONE';
  }
} else {
  $infos['pool'] = 'NONE';
}
if (isset($_COOKIE["currency"])) {
  $infos['currency'] = $_COOKIE["currency"];
} else {
  $infos['currency'] = 'NONE';
}

echo json_encode($infos);

?>
