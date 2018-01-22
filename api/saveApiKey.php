<?php

if (isset($_GET['apiKey']) && !empty($_GET['apiKey'])) {
  setcookie('apiKeySuprnova',$_GET['apiKey'],time() + 60*24*3600);
  echo json_encode(array('status' => 'success'));
}
else {
  echo json_encode(array('status' => 'error'));
}

?>
