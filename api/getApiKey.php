<?php

if (isset($_COOKIE["apiKeySuprnova"])) {
  echo json_encode(array('apiKey' => $_COOKIE["apiKeySuprnova"]));
}
else {
  echo json_encode(array('apiKey' => 'NONE'));
}

?>
