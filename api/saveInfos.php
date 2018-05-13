<?php
$added = 0;

if (isset($_GET['apiKey'],$_GET['pool']) && !empty($_GET['apiKey']) && !empty($_GET['pool'])) {
  setcookie('apiKey'.$_GET['pool'],$_GET['apiKey'],time() + 60*24*3600);
  $added++;
}
if (isset($_GET['pool']) && !empty($_GET['pool'])) {
  setcookie('pool',$_GET['pool'],time() + 60*24*3600);
  $added++;
}
if (isset($_GET['currency']) && !empty($_GET['currency'])) {
  setcookie('currency',$_GET['currency'],time() + 60*24*3600);
  $added++;
}

if ($added>0) {
  echo json_encode(array('status' => 'success'));
} else {
  echo json_encode(array('status' => 'error'));
}

?>
