<?php

if (isset($_COOKIE["pool"])) {
  echo json_encode(array('pool' => 'pool'));
}
else {
  echo json_encode(array('pool' => 'NONE'));
}

?>
