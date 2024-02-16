<?php
 $message = "
 Name						:	$_REQUEST[inputName]
 Email						:	$_REQUEST[inputEmail]
 Conatact					:	$_REQUEST[inputTel]
 Location					:	$_REQUEST[location]
 Pick-Up-Date				:	$_REQUEST[pick_up_date]
 Query						:	$_REQUEST[Query]
";


$to = "santoshmaurya87@gmail.com";
$bcc ="sales@venturetourandtravel.com";
$from = "Online Booking From VENTURE TRAVELS";
$subject = "Online Booking From VENTURE TRAVELS";
header("Location:http://www.venturetourandtravel.com/thanks.html");
mail($to,$subject,$message,$from);
?>