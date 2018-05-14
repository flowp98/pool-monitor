<?php
$infos = array();

if (isset($_GET['pool'])) {
  $keyName = 'apiKey'.$_GET['pool'];
  if (isset($_COOKIE[$keyName])) {
    $infos['apiKey'] = $_COOKIE[$keyName];
  } else {
    $infos['apiKey'] = 'NONE';
  }
} else {
  $infos['apiKey'] = 'NONE';
}

echo json_encode($infos);

?>
